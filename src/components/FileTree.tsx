
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileTreeItem, languageToColor } from '@/utils/syntaxHighlighter';

interface FileTreeProps {
  items: FileTreeItem[];
  onSelectFile: (file: FileTreeItem) => void;
  selectedFileId: string | null;
}

const FileTreeNode: React.FC<{
  item: FileTreeItem;
  depth: number;
  onSelectFile: (file: FileTreeItem) => void;
  selectedFileId: string | null;
}> = ({ item, depth, onSelectFile, selectedFileId }) => {
  const [expanded, setExpanded] = useState(true);
  const isFolder = item.type === 'folder';
  const isSelected = selectedFileId === item.id;
  
  const handleClick = () => {
    if (isFolder) {
      setExpanded(!expanded);
    } else {
      onSelectFile(item);
    }
  };
  
  // Extract file extension
  const fileExtension = isFolder ? '' : item.name.split('.').pop() || '';
  
  return (
    <div className="animate-fade-in" style={{ animationDelay: `${depth * 50}ms` }}>
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer transition-default",
          isSelected ? "bg-primary/10 text-primary" : "hover:bg-background-muted/50"
        )}
        style={{ paddingLeft: `${(depth + 1) * 0.5}rem` }}
        onClick={handleClick}
      >
        <div className="mr-1 text-muted-foreground">
          {isFolder ? (
            expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="w-4 h-4 relative">
              <File className="h-4 w-4" />
              {fileExtension && (
                <div 
                  className="absolute -right-1 -bottom-1 rounded-full w-2 h-2" 
                  style={{ backgroundColor: languageToColor(fileExtension) }}
                />
              )}
            </div>
          )}
        </div>
        <span className="truncate text-sm">{item.name}</span>
      </div>
      
      {isFolder && expanded && item.children && (
        <div className="mt-1">
          {item.children.map((child) => (
            <FileTreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              onSelectFile={onSelectFile}
              selectedFileId={selectedFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree: React.FC<FileTreeProps> = ({ items, onSelectFile, selectedFileId }) => {
  return (
    <div className="py-2 overflow-auto h-full">
      {items.map((item) => (
        <FileTreeNode
          key={item.id}
          item={item}
          depth={0}
          onSelectFile={onSelectFile}
          selectedFileId={selectedFileId}
        />
      ))}
    </div>
  );
};

export default FileTree;
