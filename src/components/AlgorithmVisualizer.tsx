import React from 'react';
import DPVisualizer from '@/components/visualizers/DPVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';
import { Algorithm } from '@/types/algorithm';

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
  
  // Generate steps on algorithm or input change
  React.useEffect(() => {
    const newSteps = generateSteps(input);
    setSteps(newSteps);
    setCurrentStep(0);
    setVisualState(newSteps[0]?.visualState || null);
  }, [algorithm, input, generateSteps]);
  
  // Play effect
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (playing && currentStep < totalSteps - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, delay);
    } else {
      setPlaying(false);
    }
    
    return () => clearTimeoutId;
  }, [playing, currentStep, totalSteps, delay]);
  
  // Update visual state on step change
  React.useEffect(() => {
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
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">{algorithm.name}</h2>
        <div className="flex items-center space-x-2">
          {Object.keys(defaultInput).map((key) => (
            <div key={key} className="flex items-center space-x-1">
              <label htmlFor={key} className="text-sm font-medium capitalize">{key}</label>
              {typeof defaultInput[key] === 'number' ? (
                <input
                  type="number"
                  id={key}
                  name={key}
                  className="w-20 px-2 py-1 border rounded-md text-sm bg-background"
                  value={input[key]}
                  onChange={handleInputChange}
                />
              ) : (
                // Add more input types here as needed
                <input
                  type="text"
                  id={key}
                  name={key}
                  className="w-20 px-2 py-1 border rounded-md text-sm bg-background"
                  value={input[key]}
                  onChange={(e) => handleObjectInputChange(key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-md border p-4 bg-muted/50">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
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
        
        <div className="text-center text-lg font-medium mb-2">
          {steps[currentStep]?.description}
        </div>
        
        {/* Algorithm Visualization */}
        {(() => {
          switch (type) {
            case 'dynamic-programming':
              return <DPVisualizer data={visualState} />;
            case 'graph':
              return <GraphVisualizer data={visualState} />;
            default:
              return <div className="text-muted-foreground">No visualization available for this algorithm type.</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
