
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import FileTree from './FileTree';
import { CodeBlock, FileTreeItem, sampleFileTree } from '@/utils/codeParser';
import SearchBar from './SearchBar';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, FileText, Play, Settings } from 'lucide-react';

interface CodeVisualizerProps {
  initialCode?: CodeBlock;
}

const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ initialCode }) => {
  const [selectedFile, setSelectedFile] = useState<FileTreeItem | null>(
    initialCode ? 
    { id: 'initial', name: initialCode.filename, type: 'file', language: initialCode.language, code: initialCode.code } : 
    null
  );
  
  const handleSelectFile = (file: FileTreeItem) => {
    if (file.type === 'file' && file.code) {
      setSelectedFile(file);
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
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a file from the sidebar to view its content
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="visual" className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-primary animate-pulse-subtle" />
                </div>
                <h2 className="text-2xl font-medium">Code Visualization</h2>
                <p className="text-muted-foreground">
                  Interactive visualization tools will appear here to help you understand code structure and relationships.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="run" className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Play className="h-8 w-8 text-primary animate-pulse-subtle" />
                </div>
                <h2 className="text-2xl font-medium">Code Execution</h2>
                <p className="text-muted-foreground">
                  Code execution and real-time preview will be displayed here.
                </p>
              </div>
            </div>
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

export default CodeVisualizer;
