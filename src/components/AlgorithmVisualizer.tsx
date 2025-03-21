
import React, { useEffect, useRef } from 'react';
import DPVisualizer from '@/components/visualizers/DPVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';
import SortingVisualizer from '@/components/visualizers/SortingVisualizer';
import SearchingVisualizer from '@/components/visualizers/SearchingVisualizer';
import TreeVisualizer from '@/components/visualizers/TreeVisualizer';
import { Algorithm } from '@/types/algorithm';
import { Badge } from '@/components/ui/badge';

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
  speed: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ algorithm, speed }) => {
  const { generateSteps, defaultInput, type } = algorithm;
  const [currentStep, setCurrentStep] = React.useState(0);
  const [steps, setSteps] = React.useState<any[]>([]);
  const [visualState, setVisualState] = React.useState<any>(null);
  const [playing, setPlaying] = React.useState(false);
  const [input, setInput] = React.useState<any>(defaultInput);
  
  const totalSteps = steps.length;
  const delay = 1000 / speed;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Generate steps on algorithm or input change
  useEffect(() => {
    const newSteps = generateSteps(input);
    setSteps(newSteps);
    setCurrentStep(0);
    setVisualState(newSteps[0]?.visualState || null);
  }, [algorithm, input, generateSteps]);
  
  // Play effect
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (playing && currentStep < totalSteps - 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, delay);
    } else if (currentStep >= totalSteps - 1) {
      setPlaying(false);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [playing, currentStep, totalSteps, delay]);
  
  // Update visual state on step change
  useEffect(() => {
    setVisualState(steps[currentStep]?.visualState || null);
  }, [currentStep, steps]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: Number(e.target.value)
    });
  };
  
  const handleObjectInputChange = (name: string, value: any) => {
    setInput({
      ...input,
      [name]: value
    });
  };
  
  const handleArrayInputChange = (name: string, index: number, value: any) => {
    const newArray = [...input[name]];
    newArray[index] = Number(value);
    handleObjectInputChange(name, newArray);
  };
  
  const handlePlay = () => {
    setPlaying(true);
  };
  
  const handlePause = () => {
    setPlaying(false);
  };
  
  const handleStepBackward = () => {
    setPlaying(false);
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };
  
  const handleStepForward = () => {
    setPlaying(false);
    setCurrentStep((prevStep) => Math.min(totalSteps - 1, prevStep + 1));
  };
  
  const handleReset = () => {
    setPlaying(false);
    setCurrentStep(0);
  };
  
  // Render input controls based on input type
  const renderInputControls = () => {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(defaultInput).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key} className="space-y-2">
                <div className="text-sm font-medium capitalize">{key}</div>
                <div className="flex flex-wrap gap-2">
                  {input[key].map((item: any, index: number) => (
                    <input
                      key={`${key}-${index}`}
                      type="number"
                      className="w-16 px-2 py-1 border rounded-md text-sm bg-background"
                      value={item}
                      onChange={(e) => handleArrayInputChange(key, index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            );
          } else if (typeof value === 'number') {
            return (
              <div key={key} className="flex flex-col space-y-1">
                <label htmlFor={key} className="text-sm font-medium capitalize">{key}</label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  className="w-full px-2 py-1 border rounded-md text-sm bg-background"
                  value={input[key]}
                  onChange={handleInputChange}
                />
              </div>
            );
          } else if (typeof value === 'string') {
            return (
              <div key={key} className="flex flex-col space-y-1">
                <label htmlFor={key} className="text-sm font-medium capitalize">{key}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  className="w-full px-2 py-1 border rounded-md text-sm bg-background"
                  value={input[key]}
                  onChange={(e) => handleObjectInputChange(key, e.target.value)}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium flex items-center gap-2">
            {algorithm.name}
            <Badge variant="outline" className="ml-2">
              {algorithm.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          </h2>
          <p className="text-muted-foreground">{algorithm.description}</p>
        </div>
        <div className="flex items-center gap-2 self-end">
          <span className="text-sm font-medium">Speed:</span>
          <select 
            className="px-2 py-1 border rounded-md text-sm bg-background" 
            value={speed}
            onChange={(e) => e.target.value}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
        </div>
      </div>
      
      <div className="rounded-md border bg-card/50">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium mb-3">Algorithm Inputs</h3>
          {renderInputControls()}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleStepBackward}
                disabled={currentStep === 0}
                className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rewind"><polygon points="11 19 2 12 11 5"></polygon><polygon points="22 19 13 12 22 5"></polygon></svg>
              </button>
              <button
                onClick={playing ? handlePause : handlePlay}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                {playing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21"></polygon></svg>
                )}
              </button>
              <button
                onClick={handleStepForward}
                disabled={currentStep === totalSteps - 1}
                className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fast-forward"><polygon points="13 19 22 12 13 5"></polygon><polygon points="2 19 11 12 2 5"></polygon></svg>
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw"><path d="M8 3a5 5 0 0 0-4 5H3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a5 5 0 0 0 4 5v-1.5"></path><path d="M16 5.15A7 7 0 1 0 7.5 16.58"></path><polyline points="21 12 16 12 16 7"></polyline></svg>
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
          
          <div className="text-center text-lg font-medium mb-4 min-h-[2rem]">
            {steps[currentStep]?.description}
          </div>
          
          {/* Algorithm Visualization */}
          <div className="min-h-[300px]">
            {(() => {
              switch (type) {
                case 'dynamic-programming':
                  return <DPVisualizer data={visualState} />;
                case 'graph':
                  return <GraphVisualizer data={visualState} />;
                case 'sorting':
                  return <SortingVisualizer data={visualState} />;
                case 'searching':
                  return <SearchingVisualizer data={visualState} />;
                case 'tree':
                  return <TreeVisualizer data={visualState} />;
                default:
                  return <div className="text-muted-foreground">No visualization available for this algorithm type.</div>;
              }
            })()}
          </div>
          
          {/* Code highlighting */}
          {steps[currentStep]?.highlightedLines && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Code Execution:</h3>
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-xs leading-relaxed">
                  {algorithm.code.split('\n').map((line, idx) => (
                    <div 
                      key={idx} 
                      className={`${steps[currentStep]?.highlightedLines?.includes(idx + 1) ? 'bg-primary/20 -mx-4 px-4' : ''}`}
                    >
                      <span className="text-muted-foreground mr-2">{idx + 1}</span>
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
