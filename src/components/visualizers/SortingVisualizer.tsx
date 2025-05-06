
import React from 'react';

interface SortingVisualizerProps {
  data: number[] | { 
    array: number[], 
    comparing?: [number, number] | number[],
    swapping?: [number, number] | number[], 
    sorted?: number[],
    current?: number | number[],
    highlighted?: number[],
    variables?: Record<string, any>
  };
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ data }) => {
  // Handle both raw array and object with metadata
  const array = Array.isArray(data) ? data : data.array;
  const comparing = Array.isArray(data) ? undefined : data.comparing;
  const swapping = Array.isArray(data) ? undefined : data.swapping;
  const sorted = Array.isArray(data) ? [] : data.sorted || [];
  const current = Array.isArray(data) ? undefined : data.current;
  const highlighted = Array.isArray(data) ? undefined : data.highlighted;
  const variables = Array.isArray(data) ? undefined : data.variables;
  
  // Early return with a message if array is undefined or empty
  if (!array || array.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  const maxValue = Math.max(...array.filter(val => typeof val === 'number' && !isNaN(val))) || 1;
  
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-grow flex items-end justify-center gap-1 p-4">
        {array.map((value, index) => {
          const height = (value / maxValue) * 100;
          const isComparing = comparing?.includes(index);
          const isSwapping = swapping?.includes(index);
          const isSorted = sorted?.includes(index);
          const isCurrent = current === index || (Array.isArray(current) && current.includes(index));
          const isHighlighted = highlighted?.includes(index);
          
          return (
            <div 
              key={index}
              className="w-full flex flex-col items-center"
            >
              <div
                className={`w-full transition-all duration-300 rounded-t-sm ${
                  isSwapping 
                    ? 'bg-destructive animate-pulse' 
                    : isComparing 
                      ? 'bg-warning' 
                      : isCurrent
                        ? 'bg-blue-500'
                        : isSorted 
                          ? 'bg-success' 
                          : isHighlighted
                            ? 'bg-purple-500'
                            : 'bg-primary'
                }`}
                style={{ height: `${height}%` }}
              />
              <div className={`text-xs mt-1 font-mono ${isCurrent ? 'font-bold text-blue-500' : ''}`}>
                {value}
              </div>
            </div>
          );
        })}
      </div>
      
      {variables && Object.keys(variables).length > 0 && (
        <div className="border-t pt-2 px-4">
          <h4 className="text-sm font-medium mb-1">Variables:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(variables).map(([key, value], idx) => (
              <div key={idx} className="text-xs bg-muted px-2 py-1 rounded-md font-mono">
                {key}: <span className="font-bold">{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;
