
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
import { Loader2, Sparkles } from 'lucide-react';

interface AlgorithmCodeInputProps {
  onCodeSubmit: (code: string, language: string, steps: any[]) => void;
}

const AlgorithmCodeInput: React.FC<AlgorithmCodeInputProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState<string>(`// Write your algorithm here\nfunction myAlgorithm(input) {\n  // Your code\n  return result;\n}`);
  const [language, setLanguage] = useState<string>('js');
  const [loading, setLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState('AIzaSyDKJ4NgAxT67OH03RRCvP8Nq9EQsMVfrk0');
  const [isUsingGemini, setIsUsingGemini] = useState(false);
  const [description, setDescription] = useState('');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    if (value === 'py' && code.includes('function')) {
      setCode(`# Write your algorithm here\ndef my_algorithm(input):\n  # Your code\n  return result`);
    } else if (value === 'js' && code.includes('def')) {
      setCode(`// Write your algorithm here\nfunction myAlgorithm(input) {\n  // Your code\n  return result;\n}`);
    } else if (value === 'cpp' && (code.includes('function') || code.includes('def'))) {
      setCode(`// Write your algorithm here\n#include <iostream>\n#include <vector>\n\nint myAlgorithm(std::vector<int> input) {\n  // Your code\n  return result;\n}`);
    } else if (value === 'java' && (code.includes('function') || code.includes('def'))) {
      setCode(`// Write your algorithm here\nimport java.util.*;\n\npublic class Algorithm {\n  public int myAlgorithm(int[] input) {\n    // Your code\n    return result;\n  }\n}`);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to visualize');
      return;
    }
    
    setLoading(true);
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
      console.log("Starting Gemini visualization with API key:", geminiKey?.substring(0, 5) + '...');
      // Call Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `I have a ${language === 'js' ? 'JavaScript' : language === 'py' ? 'Python' : language === 'java' ? 'Java' : 'C++'} algorithm that I want to visualize step-by-step. 
              Please generate detailed visualization steps for the following algorithm:
              
              ${code}
              
              ${description ? `Additional context about the algorithm: ${description}` : ''}
              
              Please generate a JSON array of visualization steps in the following format:
              [
                {
                  "id": "step-1",
                  "description": "Detailed explanation of what happens in this step",
                  "visualState": {
                    "array": [array state at this step],
                    "variables": {key-value pairs of all variables and their values},
                    "comparing": [indices being compared if any],
                    "swapping": [indices being swapped if any],
                    "sorted": [indices of sorted elements if any],
                    "current": [current index or position],
                    "highlighted": [indices to highlight]
                  }
                },
                // More steps...
              ]
              
              Include detailed descriptions and complete visualState objects for each step.
              If the algorithm sorts an array, make sure to properly track the 'comparing', 'swapping', and 'sorted' indices.
              If it's a search algorithm, track the 'current' and 'found' indices.
              ONLY RETURN VALID JSON with no additional text, comments or markdown formatting. The response must be parseable JSON.`
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
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      console.log("Gemini response received:", responseText.substring(0, 100) + '...');
      
      // Extract JSON from response (Gemini might wrap it in markdown code blocks)
      let jsonStr = responseText;
      if (responseText.includes('```json')) {
        jsonStr = responseText.split('```json')[1].split('```')[0].trim();
      } else if (responseText.includes('```')) {
        jsonStr = responseText.split('```')[1].split('```')[0].trim();
      }

      let steps = [];
      try {
        const parsedData = JSON.parse(jsonStr);
        console.log("Successfully parsed JSON data");
        
        // Check if parsedData is an array
        if (!Array.isArray(parsedData)) {
          console.error("Expected array but got:", typeof parsedData);
          throw new Error('Expected array of steps from Gemini API');
        }
        
        // Ensure all steps have the required fields and format
        steps = parsedData.map((step, index) => {
          // Make sure we have an ID
          if (!step.id) {
            step.id = `step-${index + 1}`;
          }
          
          // Ensure we have a description
          if (!step.description) {
            step.description = `Step ${index + 1}`;
          }
          
          // Initialize visualState if missing
          if (!step.visualState) {
            step.visualState = {};
          }
          
          // Ensure array is always an array
          if (!step.visualState.array) {
            step.visualState.array = [];
          } else if (!Array.isArray(step.visualState.array)) {
            step.visualState.array = Array.isArray(step.visualState.array) ? step.visualState.array : [];
          }
          
          // Ensure comparing is always an array
          if (step.visualState.comparing && !Array.isArray(step.visualState.comparing)) {
            step.visualState.comparing = [step.visualState.comparing];
          }
          
          // Ensure swapping is always an array
          if (step.visualState.swapping && !Array.isArray(step.visualState.swapping)) {
            step.visualState.swapping = [step.visualState.swapping];
          }
          
          // Ensure sorted is always an array
          if (step.visualState.sorted && !Array.isArray(step.visualState.sorted)) {
            step.visualState.sorted = [step.visualState.sorted];
          }
          
          // Ensure highlighted is always an array
          if (step.visualState.highlighted && !Array.isArray(step.visualState.highlighted)) {
            step.visualState.highlighted = [step.visualState.highlighted];
          }
          
          return step;
        });
        
      } catch (e) {
        console.error("Failed to parse JSON from Gemini:", e);
        console.error("JSON String received:", jsonStr);
        toast.error("Failed to parse Gemini's response as JSON. Falling back to built-in visualization.");
        
        // Fall back to built-in simulation
        const { steps: fallbackSteps, output } = simulateCustomCodeExecution(code, language);
        onCodeSubmit(code, language, fallbackSteps);
        return;
      }

      // Submit the steps
      onCodeSubmit(code, language, steps);
      toast.success('Enhanced visualization generated with Gemini AI');
    } catch (error) {
      console.error('Gemini API Error:', error);
      toast.error('Error with Gemini AI visualization. Falling back to built-in visualization.');
      
      // Fall back to built-in simulation
      const { steps: fallbackSteps, output } = simulateCustomCodeExecution(code, language);
      onCodeSubmit(code, language, fallbackSteps);
    }
  };

  const codeBlock: CodeBlock = {
    language,
    filename: language === 'js' ? 'algorithm.js' : 
              language === 'py' ? 'algorithm.py' : 
              language === 'java' ? 'Algorithm.java' : 
              'algorithm.cpp',
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
              <SelectItem value="java">Java</SelectItem>
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
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
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
          <div className="flex-grow text-xs text-muted-foreground">
            (Recommended for detailed step-by-step breakdowns)
          </div>
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
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Tips for better visualizations:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Use clear variable names for better visualization</li>
          <li>Add comments to explain your algorithm</li>
          <li>Make sure your code is syntactically correct</li>
          <li>Keep the algorithm simple for better visualization results</li>
          {isUsingGemini ? (
            <>
              <li className="text-primary">Gemini AI will analyze your code and generate detailed step-by-step visualizations</li>
              <li className="text-primary">Include sample data in your code for the best results</li>
              <li className="text-primary">For sorting algorithms, use array operations like swapping elements</li>
              <li className="text-primary">For searching, clearly mark the target value</li>
            </>
          ) : (
            <>
              <li>For tree algorithms, use 'node', 'left', and 'right' in your code</li>
              <li>For sorting, use 'sort' or 'swap' keywords</li>
              <li>For searching, use 'search' or 'find' keywords</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmCodeInput;
