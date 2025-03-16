
import React from 'react';
import { Algorithm } from '@/types/algorithm';

interface AlgorithmSelectorProps {
  algorithms: Algorithm[];
  selectedAlgorithm: Algorithm;
  onSelectAlgorithm: (algorithm: Algorithm) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm
}) => {
  // Group algorithms by type
  const algorithmsByType = algorithms.reduce((acc, algorithm) => {
    const { type } = algorithm;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(algorithm);
    return acc;
  }, {} as Record<string, Algorithm[]>);

  return (
    <div className="space-y-4">
      {Object.entries(algorithmsByType).map(([type, algos]) => (
        <div key={type} className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {type.replace('-', ' ')}
          </h3>
          <ul className="space-y-1">
            {algos.map(algorithm => (
              <li key={algorithm.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors ${
                    selectedAlgorithm.id === algorithm.id ? 'bg-primary/10 text-primary font-medium' : ''
                  }`}
                  onClick={() => onSelectAlgorithm(algorithm)}
                >
                  {algorithm.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmSelector;
