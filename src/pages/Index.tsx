
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import { Algorithm } from '@/types/algorithm';
import { algorithmData } from '@/data/algorithms';

const Index = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithmData[0]);
  const [speed, setSpeed] = useState<number>(1);

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Algorithm Visualizer</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Speed:</span>
              <select 
                className="px-2 py-1 border rounded-md text-sm" 
                value={speed}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 flex gap-6">
        <div className="w-1/4 border rounded-lg p-4 bg-card">
          <h2 className="text-lg font-medium mb-4">Algorithms</h2>
          <AlgorithmSelector 
            algorithms={algorithmData} 
            selectedAlgorithm={selectedAlgorithm}
            onSelectAlgorithm={handleAlgorithmChange}
          />
        </div>
        
        <div className="w-3/4 border rounded-lg p-4 bg-card">
          <Tabs defaultValue="visualization">
            <TabsList className="mb-4">
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualization" className="space-y-4">
              <AlgorithmVisualizer 
                algorithm={selectedAlgorithm} 
                speed={speed}
              />
            </TabsContent>
            
            <TabsContent value="code">
              <div className="font-mono text-sm bg-muted p-4 rounded-md overflow-auto h-[500px]">
                <pre>{selectedAlgorithm.code}</pre>
              </div>
            </TabsContent>
            
            <TabsContent value="explanation">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-xl font-medium mb-2">{selectedAlgorithm.name}</h3>
                <p className="mb-4">{selectedAlgorithm.description}</p>
                
                <h4 className="text-lg font-medium mb-2">Time Complexity</h4>
                <p className="mb-4">
                  <span className="font-mono bg-muted px-1 rounded">
                    {selectedAlgorithm.timeComplexity}
                  </span>
                </p>
                
                <h4 className="text-lg font-medium mb-2">Space Complexity</h4>
                <p className="mb-4">
                  <span className="font-mono bg-muted px-1 rounded">
                    {selectedAlgorithm.spaceComplexity}
                  </span>
                </p>
                
                <h4 className="text-lg font-medium mb-2">How it works</h4>
                <div dangerouslySetInnerHTML={{ __html: selectedAlgorithm.explanation }} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
