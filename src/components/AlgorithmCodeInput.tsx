
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/utils/codeParser';
import CodeEditor from './CodeEditor';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { simulateCustomCodeExecution } from '@/utils/codeSimulator';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AlgorithmCodeInputProps {
  onCodeSubmit: (code: string, language: string, steps: any[]) => void;
}

const AlgorithmCodeInput: React.FC<AlgorithmCodeInputProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState<string>(`// Write your algorithm here\nfunction myAlgorithm(input) {\n  // Your code\n  return result;\n}`);
  const [language, setLanguage] = useState<string>('js');
  const [loading, setLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [isUsingGemini, setIsUsingGemini] = useState(false);
  const [description, setDescription] = useState('');
  const [geminiError, setGeminiError] = useState<string | null>(null);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    if (value === 'py' && code.includes('function')) {
      setCode(`# Write your algorithm here\ndef my_algorithm(input):\n  # Your code\n  return result`);
    } else if (value === 'js' && code.includes('def')) {
      setCode(`// Write your algorithm here\nfunction myAlgorithm(input) {\n  // Your code\n  return result;\n}`);
    } else if (value === 'cpp' && (code.includes('function') || code.includes('def'))) {
      setCode(`// Write your algorithm here\n#include <iostream>\n#include <vector>\n\nint myAlgorithm(std::vector<int> input) {\n  // Your code\n  return result;\n}`);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to visualize');
      return;
    }
    
    setLoading(true);
    setGeminiError(null);
    
    try {
      if (isUsingGemini && geminiKey) {
        // Use Gemini AI to generate steps
        await handleGeminiVisualization();
      } else {
        // Use built-in simulation
        const { steps, output } = simulateCustomCodeExecution(code, language);
        onCodeSubmit(code, language, steps);
        toast.success('Code visualization generated');
      }
    } catch (error) {
      console.error('Error executing code:', error);
      toast.error('Error visualizing the code. Please check your syntax.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeminiVisualization = async () => {
    try {
      // Call Gemini API
      setGeminiError(null);
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `I have a ${language === 'js' ? 'JavaScript' : language === 'py' ? 'Python' : 'C++'} algorithm that I want to visualize. 
              Please generate visualization steps for the following algorithm:
              
              ${code}
              
              ${description ? `Additional context about the algorithm: ${description}` : ''}
              
              Please generate a JSON array of visualization steps in this format:
              [
                {
                  "id": "step-1",
                  "description": "Description of what happens in this step",
                  "visualState": {
                    // State object with variables, data structures, etc. at this step
                  }
                },
                // More steps...
              ]
              
              Include detailed descriptions and visualState objects that can be used to render the algorithm step by step.
              ONLY RETURN VALID JSON with no additional text or explanations. I need to parse your response directly.`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 8192
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API Error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
        throw new Error('Unexpected response format from Gemini API');
      }
      
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from response (Gemini might wrap it in markdown code blocks)
      let jsonStr = responseText;
      if (responseText.includes('```json')) {
        jsonStr = responseText.split('```json')[1].split('```')[0].trim();
      } else if (responseText.includes('```')) {
        jsonStr = responseText.split('```')[1].split('```')[0].trim();
      }

      // Try to be very lenient in parsing JSON by cleanup
      jsonStr = jsonStr.trim();
      // Remove any leading/trailing comments or text before [ and after ]
      const startIndex = jsonStr.indexOf('[');
      const endIndex = jsonStr.lastIndexOf(']');
      if (startIndex !== -1 && endIndex !== -1) {
        jsonStr = jsonStr.substring(startIndex, endIndex + 1);
      }

      let steps;
      try {
        steps = JSON.parse(jsonStr);
        
        // Validate the steps format
        if (!Array.isArray(steps)) {
          throw new Error('Result is not an array');
        }
        
        // Basic validation of step structure
        steps.forEach((step, i) => {
          if (!step.id || !step.description || !step.visualState) {
            throw new Error(`Step ${i} is missing required fields (id, description, or visualState)`);
          }
        });
        
      } catch (e) {
        console.error("Failed to parse JSON from Gemini:", e);
        console.error("Response text:", responseText);
        console.error("Extracted JSON string:", jsonStr);
        setGeminiError("Failed to parse Gemini's response as JSON. Try simplifying your code or using non-Gemini mode.");
        throw e;
      }

      // Submit the steps
      onCodeSubmit(code, language, steps);
      toast.success('Visualization generated with Gemini AI');
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      setGeminiError(error.message || 'Error with Gemini AI visualization');
      toast.error('Error with Gemini AI visualization. Please check your API key and try again.');
      throw error;
    }
  };

  const codeBlock: CodeBlock = {
    language,
    filename: language === 'js' ? 'algorithm.js' : language === 'py' ? 'algorithm.py' : 'algorithm.cpp',
    code
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium">Custom Algorithm</h2>
          <p className="text-muted-foreground mt-1">
            Input your own algorithm code to visualize
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select 
            defaultValue={language} 
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="py">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Visualize Algorithm'
            )}
          </Button>
        </div>
      </div>
      
      <CodeEditor 
        code={codeBlock} 
        onLanguageChange={handleLanguageChange}
        onChange={(newCode) => setCode(newCode)}
      />

      <div className="p-4 border rounded-md bg-card">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="use-gemini"
            checked={isUsingGemini}
            onChange={() => setIsUsingGemini(!isUsingGemini)}
            className="mr-2"
          />
          <label htmlFor="use-gemini" className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-warning" />
            <span className="font-medium">Use Gemini AI for enhanced visualization</span>
          </label>
        </div>

        {isUsingGemini && (
          <div className="space-y-4 mt-4 p-4 bg-muted/30 rounded-md">
            <div>
              <label className="block text-sm font-medium mb-1">
                Gemini API Key:
              </label>
              <Input 
                type="password"
                value={geminiKey} 
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Algorithm Description (optional):
              </label>
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what your algorithm does to help Gemini generate better visualizations"
                className="w-full"
                rows={3}
              />
            </div>
            
            {geminiError && (
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Gemini API Error</AlertTitle>
                <AlertDescription>
                  {geminiError}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Tips:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Use clear variable names for better visualization</li>
          <li>Add comments to explain your algorithm</li>
          <li>Make sure your code is syntactically correct</li>
          <li>Keep the algorithm simple for better visualization results</li>
          <li>For tree algorithms, use 'node', 'left', and 'right' in your code</li>
          <li>For sorting, use 'sort' or 'swap' keywords</li>
          <li>For searching, use 'search' or 'find' keywords</li>
          {isUsingGemini && (
            <li className="text-primary">Gemini AI will generate enhanced visualizations based on your code's logic and structure</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmCodeInput;
