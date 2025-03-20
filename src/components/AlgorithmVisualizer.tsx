import React, { useState, useEffect, useRef } from 'react';
import { Algorithm, AlgorithmStep } from '@/types/algorithm';
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import SortingVisualizer from './visualizers/SortingVisualizer';
import SearchingVisualizer from './visualizers/SearchingVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import DPVisualizer from './visualizers/DPVisualizer';

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
  speed: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  algorithm,
  speed
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [input, setInput] = useState(algorithm.defaultInput);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Generate algorithm steps when algorithm or input changes
  useEffect(() => {
    const generatedSteps = algorithm.generateSteps(input);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    
    // Clean up any running interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [algorithm, input]);
  
  // Handle play/pause logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, steps.length, speed]);
  
  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      // If at the end, restart
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };
  
  const handleRegenerate = () => {
    // For sorting and searching, generate random input
    if (algorithm.type === 'sorting') {
      const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      setInput(randomArray);
    } else if (algorithm.type === 'searching') {
      const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
      const target = array[Math.floor(Math.random() * array.length)];
      setInput({ array, target });
    } else if (algorithm.type === 'tree') {
      // For tree algorithms, we have different options
      if (algorithm.id === 'binary-search-tree') {
        const values = [8, 10, 12, 15, 17, 20, 25];
        const randomTarget = values[Math.floor(Math.random() * values.length)];
        setInput({ ...input, value: randomTarget });
      } else if (algorithm.id === 'binary-tree-traversal') {
        const traversalTypes = ['inorder', 'preorder', 'postorder', 'levelorder'];
        const randomType = traversalTypes[Math.floor(Math.random() * traversalTypes.length)];
        setInput({ traversalType: randomType });
      } else if (algorithm.id === 'level-order-traversal') {
        setInput({ withLevels: Math.random() > 0.5 });
      } else if (algorithm.id === 'pre-order-traversal' || algorithm.id === 'post-order-traversal') {
        setInput({ iterative: Math.random() > 0.5 });
      }
    } else if (algorithm.type === 'dynamic-programming') {
      if (algorithm.id === 'fibonacci-dp') {
        const n = Math.floor(Math.random() * 15) + 5; // Random n between 5 and 20
        setInput({ n, optimized: Math.random() > 0.5 });
      } else if (algorithm.id === 'knapsack-problem') {
        // Keep the default values for knapsack
        setInput({ ...algorithm.defaultInput });
      } else if (algorithm.id === 'longest-common-subsequence') {
        // Keep the default values for LCS
        setInput({ ...algorithm.defaultInput });
      }
    }
  };
  
  const renderVisualizer = () => {
    const currentStep = steps[currentStepIndex] || null;
    
    switch (algorithm.type) {
      case 'sorting':
        return <SortingVisualizer data={currentStep?.visualState || input} />;
      case 'searching':
        return <SearchingVisualizer data={currentStep?.visualState || { array: input.array || [], target: input.target || 0 }} />;
      case 'tree':
        return <TreeVisualizer data={currentStep?.visualState || { tree: input.tree || [] }} />;
      case 'dynamic-programming':
        return <DPVisualizer data={currentStep?.visualState || input} />;
      default:
        return <div className="text-center py-10">Visualization not available for this algorithm type</div>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{algorithm.name}</h2>
          <p className="text-muted-foreground">{algorithm.type.replace('-', ' ')}</p>
        </div>
        <Button variant="outline" onClick={handleRegenerate} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          New Data
        </Button>
      </div>
      
      <div className="border rounded-md h-80 bg-muted/30 flex items-center justify-center relative">
        {steps.length > 0 ? (
          renderVisualizer()
        ) : (
          <div className="text-center text-muted-foreground">
            No visualization steps available
          </div>
        )}
      </div>
      
      {steps.length > 0 && (
        <>
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleReset} 
              disabled={currentStepIndex === 0}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleStepBackward} 
              disabled={currentStepIndex === 0}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handlePlayPause} 
              className="gap-2 w-24"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Play
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleStepForward} 
              disabled={currentStepIndex >= steps.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
              <span>{Math.round((currentStepIndex / (steps.length - 1)) * 100)}%</span>
            </div>
            <Slider
              value={[currentStepIndex]}
              min={0}
              max={steps.length - 1}
              step={1}
              onValueChange={(values) => setCurrentStepIndex(values[0])}
            />
          </div>
          
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-medium mb-2">Step Explanation:</h3>
            <p>{steps[currentStepIndex]?.description || "No explanation available"}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;
