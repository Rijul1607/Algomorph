
import React from 'react';

interface SortingVisualizerProps {
  data: number[] | { 
    array: number[], 
    comparing?: [number, number],
    swapping?: [number, number], 
    sorted?: number[] 
  };
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ data }) => {
  // Handle both raw array and object with metadata
  const array = Array.isArray(data) ? data : data.array;
  const comparing = Array.isArray(data) ? undefined : data.comparing;
  const swapping = Array.isArray(data) ? undefined : data.swapping;
  const sorted = Array.isArray(data) ? [] : data.sorted || [];
  
  // Early return with a message if array is undefined or empty
  if (!array || array.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  const maxValue = Math.max(...array);
  
  return (
    <div className="w-full h-[300px] flex items-end justify-center gap-1 p-4 bg-card/50 rounded-md border border-border/50">
      {array.map((value, index) => {
        const height = (value / maxValue) * 100;
        const isComparing = comparing?.includes(index);
        const isSwapping = swapping?.includes(index);
        const isSorted = sorted.includes(index);
        
        return (
          <div 
            key={index}
            className="w-full flex flex-col items-center"
          >
            <div
              className={`w-full ${
                isSwapping 
                  ? 'bg-destructive animate-pulse' 
                  : isComparing 
                    ? 'bg-warning' 
                    : isSorted 
                      ? 'bg-success' 
                      : 'bg-primary'
              } transition-all duration-300 rounded-t-sm relative group`}
              style={{ height: `${height}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs pointer-events-none transition-opacity">
                {value}
              </div>
            </div>
            <div className="text-xs mt-1 font-mono text-muted-foreground">{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SortingVisualizer;
