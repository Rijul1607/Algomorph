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
  const [geminiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY);
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
      await handleGeminiVisualization();
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
      
      // Generate test input based on code analysis and language
      const testInputPrompt = generateTestInput(code, language);
      
      // Call Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
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
              
              First, please analyze the code and create appropriate test inputs to run this algorithm. Then, execute the algorithm with these inputs and track its execution step by step.
              
              ${testInputPrompt}
              
              Generate a detailed JSON array of visualization steps in the following format:
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
              For tree algorithms, use appropriate tree representation.
              For dynamic programming, show the DP table state at each step.

              Also tell if there is any error in the code
              
              Additionally, provide the final output of the algorithm based on the test inputs.
              
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
          if (!step.visualState.array && detectArrayType(code)) {
            step.visualState.array = [];
          } else if (step.visualState.array && !Array.isArray(step.visualState.array)) {
            step.visualState.array = Array.isArray(step.visualState.array) ? step.visualState.array : [];
          }
          
          // Ensure variables is always an object
          if (!step.visualState.variables) {
            step.visualState.variables = {};
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

  const detectArrayType = (code: string): boolean => {
    // Check if the code likely uses arrays
    const arrayPatterns = [
      /\[\s*\d+\s*,\s*\d+/, // Array literals like [1, 2]
      /new Array/, // Array constructor
      /\.push\(/, // Array push method
      /\.pop\(/, // Array pop method
      /\.sort\(/, // Array sort method
      /\.length/, // Array length property
      /\[\s*\d+\s*\]/, // Array indexing
      /for\s*\(\s*\w+\s*=\s*\d+\s*;\s*\w+\s*<\s*\w+/, // For loops
    ];
    
    return arrayPatterns.some(pattern => pattern.test(code));
  };

  const generateTestInput = (code: string, language: string): string => {
    // Generate language-specific test input suggestions based on code analysis
    let prompt = "Based on the algorithm, here are some testing ideas:\n\n";
    
    // Check for algorithm patterns
    if (code.includes('sort') || /swap.*temp/.test(code)) {
      prompt += "For sorting algorithms, use an array like [5, 2, 9, 3, 6, 1, 8]. Track the comparisons and swaps made during each iteration.\n";
    } 
    else if (code.includes('search') || code.includes('find')) {
      prompt += "For searching algorithms, use a sorted array like [1, 2, 3, 5, 8, 13, 21] and search for both existing values (e.g., 8) and non-existing values (e.g., 7).\n";
    }
    else if (/fib/.test(code)) {
      prompt += "For Fibonacci calculation, compute the first 10 Fibonacci numbers and track how each number is built from the previous ones.\n";
    }
    else if (code.includes('knapsack') || (code.includes('weight') && code.includes('value'))) {
      prompt += "For the Knapsack problem, use items with weights [2, 3, 4, 5] and values [3, 4, 5, 6] with a capacity of 8.\n";
    }
    else if (/tree|node|left|right/.test(code)) {
      prompt += "For tree algorithms, use a binary tree with values [10, 5, 15, 3, 7, 12, 18] and track node traversals.\n";
    }
    else if (/graph|edge|vertex|adjacent/.test(code)) {
      prompt += "For graph algorithms, use a graph with edges between vertices [(0,1), (0,2), (1,2), (1,3), (2,3)] and track visited vertices.\n";
    }
    
    // Language-specific syntax
    if (language === 'js') {
      prompt += "\nFor JavaScript execution, ensure you track all variable states, array changes, and function calls.\n";
    } else if (language === 'py') {
      prompt += "\nFor Python execution, track variable states and use Python-specific features like list comprehensions if present.\n";
    } else if (language === 'cpp') {
      prompt += "\nFor C++ execution, track pointer values, memory allocation, and array indices carefully.\n";
    } else if (language === 'java') {
      prompt += "\nFor Java execution, track object states and method calls clearly.\n";
    }
    
    prompt += "\nAfter executing the algorithm with appropriate inputs, provide each step of execution with the corresponding state of variables and data structures.";
    
    return prompt;
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
          <h2 className="text-2xl font-medium flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            Custom Algorithm
          </h2>
          <p className="text-muted-foreground mt-1">
            Input your own algorithm code for AI-powered visualization
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
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Visualize with AI
              </>
            )}
          </Button>
        </div>
      </div>
      
      <CodeEditor 
        code={codeBlock} 
        onLanguageChange={handleLanguageChange}
        onChange={(newCode) => setCode(newCode)}
      />

      <div className="p-4 border rounded-md bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-amber-600" />
          <span className="font-medium text-amber-800 dark:text-amber-200">Gemini AI Enhanced Visualization</span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-amber-800 dark:text-amber-200">
            Algorithm Description (optional)
          </label>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe what your algorithm does to help Gemini generate better visualizations"
            className="w-full"
            rows={3}
          />
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            Adding a description helps Gemini understand your algorithm's purpose and generate more accurate visualizations
          </p>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium">AI-Enhanced Visualization Features:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li className="text-amber-700 dark:text-amber-300">Gemini AI analyzes your code and generates intelligent test inputs</li>
          <li className="text-amber-700 dark:text-amber-300">Detailed step-by-step execution with complete variable tracking</li>
          <li className="text-amber-700 dark:text-amber-300">Advanced algorithm pattern recognition for optimal visualization</li>
          <li className="text-amber-700 dark:text-amber-300">Dynamic programming table visualization for DP algorithms</li>
          <li className="text-amber-700 dark:text-amber-300">Tree traversal visualization for tree-based algorithms</li>
          <li>Use clear variable names and add comments for best results</li>
          <li>Ensure your code is syntactically correct</li>
          <li>Include sample data or test cases in your algorithm for better analysis</li>
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmCodeInput;