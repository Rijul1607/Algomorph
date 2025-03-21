
import React from 'react';

interface SearchingVisualizerProps {
  data: { 
    array: number[], 
    target: number,
    current?: number,
    left?: number,
    right?: number,
    found?: boolean,
    checked?: number[]
  };
}

const SearchingVisualizer: React.FC<SearchingVisualizerProps> = ({ data }) => {
  const { array, target, current, left, right, found, checked } = data;
  
  // Early return with a message if array is undefined or empty
  if (!array || array.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-4">
      <div className="text-center">
        <span className="font-medium">Searching for: </span>
        <span className="font-mono bg-primary/20 px-2 py-1 rounded">{target}</span>
      </div>
      
      <div className="flex items-center justify-center gap-1 w-full">
        {array.map((value, index) => {
          const isCurrent = index === current;
          const isInRange = left !== undefined && right !== undefined && index >= left && index <= right;
          const isFound = isCurrent && found;
          const isChecked = checked ? checked.includes(index) : false;
          
          return (
            <div 
              key={index}
              className={`w-full aspect-square flex items-center justify-center text-lg border ${
                isFound
                  ? 'bg-success/20 border-success animate-pulse'
                  : isCurrent
                    ? 'bg-warning/20 border-warning'
                    : isInRange
                      ? 'bg-primary/10 border-primary'
                      : isChecked
                        ? 'bg-muted/50 border-muted-foreground'
                        : 'bg-muted border-border'
              } rounded-md transition-colors`}
            >
              {value}
            </div>
          );
        })}
      </div>
      
      {found !== undefined && (
        <div className={`text-center font-medium ${found ? 'text-success' : 'text-destructive'}`}>
          {found ? 'Target found!' : 'Target not found'}
        </div>
      )}
    </div>
  );
};

export default SearchingVisualizer;
