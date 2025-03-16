
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

interface AlgorithmCodeInputProps {
  onCodeSubmit: (code: string, language: string, steps: any[]) => void;
}

const AlgorithmCodeInput: React.FC<AlgorithmCodeInputProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState<string>(`// Write your algorithm here\nfunction myAlgorithm(input) {\n  // Your code\n  return result;\n}`);
  const [language, setLanguage] = useState<string>('js');
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    if (value === 'py' && code.includes('function')) {
      setCode(`# Write your algorithm here\ndef my_algorithm(input):\n  # Your code\n  return result`);
    } else if (value === 'js' && code.includes('def')) {
      setCode(`// Write your algorithm here\nfunction myAlgorithm(input) {\n  // Your code\n  return result;\n}`);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to visualize');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate code execution to generate steps
      const { steps, output } = simulateCustomCodeExecution(code, language);
      onCodeSubmit(code, language, steps);
      toast.success('Code visualization generated');
    } catch (error) {
      console.error('Error executing code:', error);
      toast.error('Error visualizing the code. Please check your syntax.');
    } finally {
      setLoading(false);
    }
  };

  const codeBlock: CodeBlock = {
    language,
    filename: language === 'js' ? 'algorithm.js' : 'algorithm.py',
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
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Visualize Algorithm'}
          </Button>
        </div>
      </div>
      
      <CodeEditor 
        code={codeBlock} 
        onLanguageChange={handleLanguageChange}
      />
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Tips:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Use clear variable names for better visualization</li>
          <li>Add comments to explain your algorithm</li>
          <li>Make sure your code is syntactically correct</li>
          <li>Keep the algorithm simple for better visualization results</li>
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmCodeInput;
