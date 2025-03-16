
import React from 'react';
import { highlightCode } from '@/utils/syntaxHighlighter';
import { CodeBlock } from '@/utils/codeParser';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeEditorProps {
  code: CodeBlock;
  onLanguageChange?: (language: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onLanguageChange }) => {
  const { tokens } = highlightCode(code.code, code.language);
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code.code);
    toast.success('Code copied to clipboard');
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden shadow-subtle bg-card">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-80"></div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">{code.filename}</span>
        </div>
        <div className="flex items-center gap-2">
          <Select 
            defaultValue={code.language} 
            onValueChange={onLanguageChange}
          >
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="py">Python</SelectItem>
              <SelectItem value="tsx">TypeScript</SelectItem>
              <SelectItem value="jsx">React</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
            </SelectContent>
          </Select>
          <button 
            className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            onClick={handleCopyClick}
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="overflow-auto p-4 max-h-[600px] font-mono text-sm leading-relaxed">
        <pre className="whitespace-pre">
          {tokens.map((token, index) => (
            <span 
              key={index} 
              className={cn(
                token.type === 'keyword' && 'text-code-keyword',
                token.type === 'string' && 'text-code-string',
                token.type === 'function' && 'text-code-function',
                token.type === 'comment' && 'text-code-comment italic',
                token.type === 'variable' && 'text-code-variable',
                token.type === 'number' && 'text-code-number',
                token.type === 'operator' && 'text-code-operator',
                token.type === 'tag' && 'text-code-tag'
              )}
            >
              {token.content}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
