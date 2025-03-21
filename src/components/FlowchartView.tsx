
import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowchartViewProps {
  code: string;
  language: string;
  executionSteps: any[];
}

const FlowchartView: React.FC<FlowchartViewProps> = ({
  code,
  language,
  executionSteps
}) => {
  const codeLines = useMemo(() => code.split('\n'), [code]);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">Code Visualization</h2>
        <p className="text-muted-foreground mt-1">
          Visual representation of code execution flow
        </p>
      </div>
      
      {executionSteps.length > 0 ? (
        <div className="flex justify-center py-8">
          <div className="flex flex-col items-center gap-2 max-w-xl w-full">
            {executionSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className={cn(
                  "w-full p-4 rounded-lg border flex items-start gap-4",
                  getNodeColorByType(step.type)
                )}>
                  <div className="shrink-0 rounded-full w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{getStepTypeLabel(step.type)}</div>
                      <Badge variant="outline">Line {step.line}</Badge>
                    </div>
                    <div className="mt-2 text-muted-foreground">
                      {step.content || getStepContent(step)}
                    </div>
                    
                    {step.line && step.line <= codeLines.length && (
                      <div className="mt-3 p-2 rounded bg-secondary/30 font-mono text-sm">
                        {codeLines[step.line - 1]}
                      </div>
                    )}
                  </div>
                </div>
                
                {index < executionSteps.length - 1 && (
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-16">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ArrowDown className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium">Run your code first</h2>
            <p className="text-muted-foreground">
              Go to the Run tab and execute your code to see the visualization
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function getNodeColorByType(type: string): string {
  switch (type) {
    case 'loop-start':
    case 'loop-iteration':
    case 'loop-end':
      return 'bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
    case 'condition':
      return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'variable':
      return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    case 'function-declaration':
    case 'function-call':
    case 'function-execution':
    case 'return':
      return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'async-start':
    case 'await':
    case 'async-resume':
      return 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    default:
      return 'bg-card';
  }
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

export default FlowchartView;
