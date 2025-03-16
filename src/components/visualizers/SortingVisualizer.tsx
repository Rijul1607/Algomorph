
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
  
  const maxValue = Math.max(...array);
  
  return (
    <div className="w-full h-full flex items-end justify-center gap-1 p-4">
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
              } transition-height duration-300`}
              style={{ height: `${height}%` }}
            />
            <div className="text-xs mt-1">{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SortingVisualizer;
