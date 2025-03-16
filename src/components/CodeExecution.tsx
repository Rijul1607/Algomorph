
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface CodeExecutionProps {
  code: string;
  language: string;
  onExecute: () => void;
  executionResult: { steps: any[], output: string } | null;
  isExecuting: boolean;
}

const CodeExecution: React.FC<CodeExecutionProps> = ({
  code,
  language,
  onExecute,
  executionResult,
  isExecuting
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium">Code Execution</h2>
          <p className="text-muted-foreground mt-1">
            Run your {getLanguageDisplayName(language)} code and see the execution results
          </p>
        </div>
        <Button 
          onClick={onExecute} 
          className="gap-2" 
          disabled={isExecuting}
        >
          <Play className="h-4 w-4" />
          {isExecuting ? 'Running...' : 'Run Code'}
        </Button>
      </div>
      
      {isExecuting && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {executionResult && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-2">Execution Steps</h3>
            <div className="space-y-2">
              {executionResult.steps.map((step, index) => (
                <div key={index} className="p-3 rounded-md bg-secondary/50 flex items-start gap-3">
                  <Badge variant="outline" className="mt-1 shrink-0">
                    Line {step.line}
                  </Badge>
                  <div>
                    <div className="font-medium">{getStepTypeLabel(step.type)}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {step.content || getStepContent(step)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Alert>
            <AlertTitle>Output</AlertTitle>
            <AlertDescription>
              <pre className="mt-2 p-3 bg-secondary/30 rounded-md whitespace-pre-wrap">
                {executionResult.output}
              </pre>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

function getLanguageDisplayName(langCode: string): string {
  const languages: Record<string, string> = {
    'js': 'JavaScript',
    'jsx': 'React',
    'tsx': 'TypeScript React',
    'ts': 'TypeScript',
    'py': 'Python',
    'html': 'HTML',
    'css': 'CSS'
  };
  
  return languages[langCode] || langCode.toUpperCase();
}

function getStepTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'loop-start': 'Loop Start',
    'loop-iteration': 'Loop Iteration',
    'loop-end': 'Loop End',
    'condition': 'Condition',
    'execution': 'Execution',
    'variable': 'Variable Assignment',
    'function-declaration': 'Function Declaration',
    'function-call': 'Function Call',
    'function-execution': 'Function Execution',
    'return': 'Return Statement',
    'async-start': 'Async Function Start',
    'await': 'Await Expression',
    'async-resume': 'Async Resume'
  };
  
  return labels[type] || type;
}

function getStepContent(step: any): string {
  switch (step.type) {
    case 'variable':
      return `${step.name} = ${step.value}`;
    case 'loop-iteration':
      return `Iteration ${step.iteration}`;
    case 'condition':
      return `Evaluated to ${step.result ? 'true' : 'false'}`;
    case 'return':
      return `Returned: ${step.value}`;
    case 'function-declaration':
      return `Function ${step.name} declared`;
    case 'function-call':
      return `Called function ${step.name}`;
    default:
      return step.content || '';
  }
}

export default CodeExecution;
