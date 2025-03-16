
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FileTreeItem, flattenFileTree } from '@/utils/codeParser';

interface SearchBarProps {
  fileTree: FileTreeItem[];
  onSelectFile: (file: FileTreeItem) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ fileTree, onSelectFile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const allFiles = flattenFileTree(fileTree).filter(item => item.type === 'file');
  
  const filteredFiles = allFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (file.code && file.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setIsSearching(true);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };
  
  const handleSelectFile = (file: FileTreeItem) => {
    onSelectFile(file);
    clearSearch();
  };
  
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search files..."
          className="pl-9 pr-8 h-9 bg-background/70 backdrop-blur-sm"
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={() => setIsSearching(true)}
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={clearSearch}
          >
            <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>
      
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-card/95 backdrop-blur-sm border border-border rounded-md shadow-elevation z-10 max-h-64 overflow-auto">
          {filteredFiles.length > 0 ? (
            <div className="space-y-1">
              {filteredFiles.map(file => (
                <button
                  key={file.id}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors text-sm"
                  onClick={() => handleSelectFile(file)}
                >
                  {file.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              {searchQuery ? "No files found" : "Type to search files"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
