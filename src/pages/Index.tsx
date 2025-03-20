
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import AlgorithmCodeInput from '@/components/AlgorithmCodeInput';
import { Algorithm } from '@/types/algorithm';
import { algorithmData } from '@/data/algorithms';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithmData[0]);
  const [speed, setSpeed] = useState<number>(1);
  const [customCode, setCustomCode] = useState<string>("");
  const [customLanguage, setCustomLanguage] = useState<string>("js");
  const [customSteps, setCustomSteps] = useState<any[]>([]);
  const [isCustomAlgorithm, setIsCustomAlgorithm] = useState<boolean>(false);

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsCustomAlgorithm(false);
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
  };

  const handleCustomCodeSubmit = (code: string, language: string, steps: any[]) => {
    setCustomCode(code);
    setCustomLanguage(language);
    setCustomSteps(steps);
    setIsCustomAlgorithm(true);
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
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-6">
        <Tabs defaultValue="built-in" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="built-in">Built-in Algorithms</TabsTrigger>
            <TabsTrigger value="custom">Custom Algorithm</TabsTrigger>
          </TabsList>
          
          <TabsContent value="built-in" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4 border rounded-lg p-4 bg-card">
                <h2 className="text-lg font-medium mb-4">Algorithms</h2>
                <AlgorithmSelector 
                  algorithms={algorithmData} 
                  selectedAlgorithm={selectedAlgorithm}
                  onSelectAlgorithm={handleAlgorithmChange}
                />
              </div>
              
              <div className="w-full md:w-3/4 border rounded-lg p-4 bg-card">
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
                    <div className="prose prose-sm max-w-none dark:prose-invert">
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
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <div className="border rounded-lg p-4 bg-card">
              <AlgorithmCodeInput onCodeSubmit={handleCustomCodeSubmit} />
            </div>
            
            {isCustomAlgorithm && (
              <div className="border rounded-lg p-4 bg-card">
                <Tabs defaultValue="visualization">
                  <TabsList className="mb-4">
                    <TabsTrigger value="visualization">Visualization</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visualization" className="space-y-4">
                    <AlgorithmVisualizer 
                      algorithm={{
                        id: 'custom',
                        name: 'Custom Algorithm',
                        type: 'custom',
                        description: 'User-defined algorithm',
                        code: customCode,
                        timeComplexity: 'N/A',
                        spaceComplexity: 'N/A',
                        explanation: 'User-defined algorithm visualization',
                        generateSteps: () => customSteps,
                        defaultInput: []
                      }} 
                      speed={speed}
                    />
                  </TabsContent>
                  
                  <TabsContent value="code">
                    <div className="font-mono text-sm bg-muted p-4 rounded-md overflow-auto h-[500px]">
                      <pre>{customCode}</pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
