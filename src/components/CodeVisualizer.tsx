
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import FileTree from './FileTree';
import { CodeBlock, FileTreeItem, sampleFileTree } from '@/utils/codeParser';
import SearchBar from './SearchBar';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, FileText, Play, Settings } from 'lucide-react';
import CodeExecution from './CodeExecution';
import FlowchartView from './FlowchartView';

interface CodeVisualizerProps {
  initialCode?: CodeBlock;
}

const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ initialCode }) => {
  const [selectedFile, setSelectedFile] = useState<FileTreeItem | null>(
    initialCode ? 
    { id: 'initial', name: initialCode.filename, type: 'file', language: initialCode.language, code: initialCode.code } : 
    null
  );
  
  const [executionResult, setExecutionResult] = useState<{steps: any[], output: string} | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const handleSelectFile = (file: FileTreeItem) => {
    if (file.type === 'file' && file.code) {
      setSelectedFile(file);
      setExecutionResult(null);
    }
  };
  
  const handleLanguageChange = (language: string) => {
    if (selectedFile) {
      setSelectedFile({
        ...selectedFile,
        language
      });
    }
  };
  
  const handleExecuteCode = async () => {
    if (!selectedFile || !selectedFile.code) return;
    
    setIsExecuting(true);
    setExecutionResult(null);
    
    try {
      // This is where you would integrate with an execution API
      // For now, we'll simulate execution with a timeout
      setTimeout(() => {
        const fakeExecutionResult = simulateCodeExecution(selectedFile.code, selectedFile.language || 'js');
        setExecutionResult(fakeExecutionResult);
        setIsExecuting(false);
      }, 1500);
    } catch (error) {
      console.error('Execution error:', error);
      setIsExecuting(false);
    }
  };
  
  return (
    <div className="flex h-[calc(100vh-4rem)] relative overflow-hidden">
      <Sidebar>
        <SidebarHeader className="border-b p-4">
          <SearchBar fileTree={sampleFileTree} onSelectFile={handleSelectFile} />
        </SidebarHeader>
        <SidebarContent>
          <FileTree 
            items={sampleFileTree} 
            onSelectFile={handleSelectFile} 
            selectedFileId={selectedFile?.id || null}
          />
        </SidebarContent>
      </Sidebar>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs defaultValue="code" className="flex-1 flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-16">
              <TabsTrigger value="code" className="gap-2">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="gap-2">
                <FileText className="h-4 w-4" />
                <span>Visualize</span>
              </TabsTrigger>
              <TabsTrigger value="run" className="gap-2">
                <Play className="h-4 w-4" />
                <span>Run</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="code" className="flex-1 p-6 overflow-auto">
            {selectedFile && selectedFile.code ? (
              <div className="animate-scale-in">
                <CodeEditor 
                  code={{ 
                    language: selectedFile.language || 'txt', 
                    filename: selectedFile.name, 
                    code: selectedFile.code 
                  }} 
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a file from the sidebar to view its content
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="visual" className="flex-1 p-6 overflow-auto">
            {selectedFile && selectedFile.code ? (
              <FlowchartView 
                code={selectedFile.code} 
                language={selectedFile.language || 'js'} 
                executionSteps={executionResult?.steps || []} 
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="h-8 w-8 text-primary animate-pulse-subtle" />
                  </div>
                  <h2 className="text-2xl font-medium">Code Visualization</h2>
                  <p className="text-muted-foreground">
                    Select a file and run the code to visualize its execution flow.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="run" className="flex-1 p-6 overflow-auto">
            {selectedFile && selectedFile.code ? (
              <CodeExecution 
                code={selectedFile.code}
                language={selectedFile.language || 'js'}
                onExecute={handleExecuteCode}
                executionResult={executionResult}
                isExecuting={isExecuting}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 text-primary animate-pulse-subtle" />
                  </div>
                  <h2 className="text-2xl font-medium">Code Execution</h2>
                  <p className="text-muted-foreground">
                    Select a file to run its code and see the execution results.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Settings className="h-8 w-8 text-primary animate-pulse-subtle" />
                </div>
                <h2 className="text-2xl font-medium">Code Visualizer Settings</h2>
                <p className="text-muted-foreground">
                  Customize visualization options, themes, and other settings.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Temporary function to simulate code execution
function simulateCodeExecution(code: string, language: string) {
  let steps = [];
  let output = '';
  
  if (language === 'js' || language === 'jsx' || language === 'tsx') {
    if (code.includes('for') || code.includes('while')) {
      steps = [
        { type: 'loop-start', line: 3, content: 'Loop initialized' },
        { type: 'variable', line: 4, name: 'i', value: 0 },
        { type: 'loop-iteration', line: 3, iteration: 1 },
        { type: 'variable', line: 4, name: 'i', value: 1 },
        { type: 'loop-iteration', line: 3, iteration: 2 },
        { type: 'variable', line: 4, name: 'i', value: 2 },
        { type: 'loop-end', line: 5, content: 'Loop completed' }
      ];
      output = 'Loop executed 3 times';
    } else if (code.includes('if') || code.includes('else')) {
      steps = [
        { type: 'condition', line: 2, content: 'if condition evaluated', result: true },
        { type: 'execution', line: 3, content: 'if block executed' }
      ];
      output = 'Condition evaluated to true';
    } else if (code.includes('function')) {
      steps = [
        { type: 'function-declaration', line: 1, name: 'myFunction' },
        { type: 'function-call', line: 5, name: 'myFunction' },
        { type: 'function-execution', line: 2, content: 'Inside function' },
        { type: 'return', line: 3, value: 'result' }
      ];
      output = 'Function executed and returned "result"';
    } else if (code.includes('async') || code.includes('await')) {
      steps = [
        { type: 'async-start', line: 1, content: 'Async function started' },
        { type: 'await', line: 3, content: 'Waiting for promise' },
        { type: 'async-resume', line: 4, content: 'Async operation completed' },
        { type: 'return', line: 5, value: 'data' }
      ];
      output = 'Async operation completed with data';
    } else {
      steps = [
        { type: 'execution', line: 1, content: 'Code execution started' },
        { type: 'variable', line: 2, name: 'result', value: 'some value' },
        { type: 'execution', line: 3, content: 'Code execution completed' }
      ];
      output = 'Executed successfully';
    }
  } else if (language === 'py') {
    if (code.includes('for') || code.includes('while')) {
      steps = [
        { type: 'loop-start', line: 2, content: 'Loop initialized' },
        { type: 'variable', line: 3, name: 'i', value: 0 },
        { type: 'loop-iteration', line: 2, iteration: 1 },
        { type: 'variable', line: 3, name: 'i', value: 1 },
        { type: 'loop-iteration', line: 2, iteration: 2 },
        { type: 'variable', line: 3, name: 'i', value: 2 },
        { type: 'loop-end', line: 4, content: 'Loop completed' }
      ];
      output = 'Loop executed 3 times';
    } else if (code.includes('if') || code.includes('else')) {
      steps = [
        { type: 'condition', line: 1, content: 'if condition evaluated', result: true },
        { type: 'execution', line: 2, content: 'if block executed' }
      ];
      output = 'Condition evaluated to true';
    } else if (code.includes('def')) {
      steps = [
        { type: 'function-declaration', line: 1, name: 'my_function' },
        { type: 'function-call', line: 4, name: 'my_function' },
        { type: 'function-execution', line: 2, content: 'Inside function' },
        { type: 'return', line: 3, value: 'result' }
      ];
      output = 'Function executed and returned "result"';
    } else {
      steps = [
        { type: 'execution', line: 1, content: 'Code execution started' },
        { type: 'variable', line: 2, name: 'result', value: 'some value' },
        { type: 'execution', line: 3, content: 'Code execution completed' }
      ];
      output = 'Executed successfully';
    }
  }
  
  return { steps, output };
}

export default CodeVisualizer;
