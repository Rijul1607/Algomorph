
import React from 'react';
import { DPTable, DPTableCell, DPTableHeaderCell } from "@/components/ui/table";

interface DPVisualizerProps {
  data: {
    // Fibonacci data
    n?: number;
    dp?: number[];
    prev?: number;
    curr?: number;
    next?: number;
    result?: number;
    currentStep?: number;
    currentCalc?: number[];
    optimized?: boolean;
    
    // Knapsack data
    values?: number[];
    weights?: number[];
    capacity?: number;
    currentItem?: number;
    currentWeight?: number;
    maxValue?: number;
    includedItems?: number[];
    backtrackItem?: number;
    tooHeavy?: boolean;
    includeValue?: number;
    excludeValue?: number;
    
    // LCS data
    text1?: string;
    text2?: string;
    charIndex1?: number;
    charIndex2?: number;
    match?: boolean;
    lcsLength?: number;
    lcs?: string;
    backtrackI?: number;
    backtrackJ?: number;
    moveDirection?: 'up' | 'left';
    
    complete?: boolean;
  };
}

const DPVisualizer: React.FC<DPVisualizerProps> = ({ data }) => {
  // Early return with a message if data is undefined or empty
  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  // Choose the appropriate visualization based on available data
  if (data.n !== undefined) {
    return <FibonacciVisualizer data={data} />;
  } else if (data.values && data.weights) {
    return <KnapsackVisualizer data={data} />;
  } else if (data.text1 && data.text2) {
    return <LCSVisualizer data={data} />;
  }
  
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="text-muted-foreground">Unknown dynamic programming algorithm</div>
    </div>
  );
};

// Fibonacci Visualization
const FibonacciVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { 
    n, dp = [], prev, curr, next, result, currentStep = 0,
    currentCalc = [], optimized, complete 
  } = data;
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="mb-4 text-center">
        <span className="font-medium">Calculating Fibonacci({n})</span>
        {optimized && <span className="ml-2 text-sm text-muted-foreground">(optimized)</span>}
      </div>
      
      <div className="w-full max-w-3xl">
        {optimized ? (
          // Optimized Fibonacci (using variables)
          <div className="space-y-6">
            <div className="flex justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium mb-1">prev</div>
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 ${
                  currentCalc?.includes(0) ? 'bg-warning/20 border-warning' : 'bg-muted border-border'
                }`}>
                  {prev !== null ? prev : '-'}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium mb-1">curr</div>
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 ${
                  currentCalc?.includes(1) ? 'bg-warning/20 border-warning' : 'bg-muted border-border'
                }`}>
                  {curr !== null ? curr : '-'}
                </div>
              </div>
              
              {next !== undefined && (
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium mb-1">next</div>
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg border-2 bg-success/20 border-success">
                    {next}
                  </div>
                </div>
              )}
            </div>
            
            {/* Progress indicator */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Start</span>
                <span>Progress</span>
                <span>F({n})</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all" 
                  style={{ width: `${(currentStep / n) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          // Standard Fibonacci (using array)
          <div className="space-y-6">
            <div className="grid grid-cols-11 gap-1">
              {Array.from({ length: Math.min(n + 1, 11) }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-xs font-medium mb-1">F({i})</div>
                  <div
                    className={`w-10 h-10 flex items-center justify-center border-2 rounded ${
                      i === currentStep
                        ? 'bg-warning/20 border-warning'
                        : dp && i < dp.length && dp[i] !== undefined
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600'
                          : 'bg-muted border-border'
                    } ${currentCalc?.includes(i) ? 'ring-2 ring-purple-400' : ''}`}
                  >
                    {dp && i < dp.length && dp[i] !== undefined ? dp[i] : '-'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* For larger n values, show a progress bar instead of all squares */}
            {n > 10 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>F(0)</span>
                  <span>F({currentStep})</span>
                  <span>F({n})</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all" 
                    style={{ width: `${(currentStep / n) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {result !== null && result !== undefined && (
        <div className="mt-8 text-center">
          <div className="font-medium">Result:</div>
          <div className="text-2xl font-bold mt-2">
            F({n}) = {result}
          </div>
        </div>
      )}
      
      {complete && (
        <div className="mt-4 text-center font-medium text-success">
          Calculation complete!
        </div>
      )}
    </div>
  );
};

// Knapsack Visualization
const KnapsackVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { 
    values = [], weights = [], capacity = 0, dp = [],
    currentItem, currentWeight, maxValue,
    includedItems = [], backtrackItem, tooHeavy,
    includeValue, excludeValue, complete 
  } = data;
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 overflow-auto">
      <div className="mb-6 text-center">
        <span className="font-medium">0/1 Knapsack Problem</span>
        <div className="text-sm text-muted-foreground mt-1">
          Capacity: {capacity}, Items: {values.length}
        </div>
      </div>
      
      {/* Items display */}
      <div className="bg-muted/30 p-4 rounded-md mb-6 w-full max-w-3xl">
        <h3 className="font-medium mb-3">Items:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((value, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-md border-2 ${
                backtrackItem === idx
                  ? 'bg-success/20 border-success'
                  : currentItem === idx
                    ? 'bg-warning/20 border-warning'
                    : includedItems?.includes(idx)
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600'
                      : 'bg-muted border-border'
              }`}
            >
              <div className="text-xs font-medium mb-1">Item {idx + 1}</div>
              <div className="flex justify-between text-sm">
                <span>Value: <strong>{value}</strong></span>
                <span>Weight: <strong>{weights[idx]}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* DP Table visualization (improved with our new components) */}
      {dp && dp.length > 0 && (
        <div className="w-full max-w-3xl overflow-x-auto mb-6">
          <h3 className="font-medium mb-3">DP Table:</h3>
          <DPTable className="border">
            <thead>
              <tr>
                <DPTableHeaderCell>i \ w</DPTableHeaderCell>
                {Array.from({ length: Math.min(capacity + 1, 12) }).map((_, w) => (
                  <DPTableHeaderCell key={w} active={currentWeight === w}>
                    {w}
                  </DPTableHeaderCell>
                ))}
                {capacity > 11 && <DPTableHeaderCell>...</DPTableHeaderCell>}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(dp.length, 6) }).map((_, i) => (
                <tr key={i}>
                  <DPTableHeaderCell active={currentItem === i - 1}>
                    {i}
                  </DPTableHeaderCell>
                  {Array.from({ length: Math.min(capacity + 1, 12) }).map((_, w) => (
                    <DPTableCell 
                      key={w}
                      active={currentItem === i - 1 && currentWeight === w}
                      error={currentItem === i - 1 && currentWeight === w && tooHeavy}
                      success={i === dp.length - 1 && w === capacity}
                    >
                      {dp[i] && dp[i][w] !== undefined ? dp[i][w] : '-'}
                    </DPTableCell>
                  ))}
                  {capacity > 11 && <DPTableCell>...</DPTableCell>}
                </tr>
              ))}
              {dp.length > 6 && (
                <tr>
                  <DPTableHeaderCell>...</DPTableHeaderCell>
                  {Array.from({ length: Math.min(capacity + 1, 12) }).map((_, w) => (
                    <DPTableCell key={w}>...</DPTableCell>
                  ))}
                  {capacity > 11 && <DPTableCell>...</DPTableCell>}
                </tr>
              )}
            </tbody>
          </DPTable>
        </div>
      )}
      
      {/* Decision making visualization */}
      {includeValue !== undefined && excludeValue !== undefined && (
        <div className="mt-6 p-4 bg-muted/30 rounded-md w-full max-w-md">
          <h3 className="font-medium mb-2">Decision:</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-sm">Exclude Item {(currentItem ?? 0) + 1}</div>
              <div className={`mt-1 p-2 rounded-md ${
                excludeValue >= includeValue ? 'bg-success/20' : 'bg-muted'
              }`}>
                Value: {excludeValue}
              </div>
            </div>
            <div className="text-xl">vs</div>
            <div className="text-center">
              <div className="text-sm">Include Item {(currentItem ?? 0) + 1}</div>
              <div className={`mt-1 p-2 rounded-md ${
                includeValue > excludeValue ? 'bg-success/20' : 'bg-muted'
              }`}>
                Value: {includeValue}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results */}
      {maxValue !== undefined && (
        <div className="mt-6 text-center">
          <div className="font-medium">Maximum Value:</div>
          <div className="text-2xl font-bold mt-2">{maxValue}</div>
          
          {includedItems && includedItems.length > 0 && (
            <div className="mt-4">
              <div className="font-medium">Items to include:</div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {includedItems.map((idx) => (
                  <div 
                    key={idx}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-600 rounded-full"
                  >
                    Item {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {complete && (
        <div className="mt-4 text-center font-medium text-success">
          Calculation complete!
        </div>
      )}
    </div>
  );
};

// Longest Common Subsequence Visualization
const LCSVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { 
    text1 = "", text2 = "", dp = [], charIndex1, charIndex2, match,
    lcsLength, lcs, backtrackI, backtrackJ, moveDirection, complete 
  } = data;
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 overflow-auto">
      <div className="mb-6 text-center">
        <span className="font-medium">Longest Common Subsequence</span>
      </div>
      
      {/* Strings visualization */}
      <div className="bg-muted/30 p-4 rounded-md mb-6 w-full max-w-3xl">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-medium mb-2">String 1:</h3>
            <div className="flex flex-wrap">
              {text1.split('').map((char, idx) => (
                <div 
                  key={idx}
                  className={`w-10 h-10 flex items-center justify-center rounded-md mx-1 border-2 ${
                    idx === charIndex1
                      ? match
                        ? 'bg-success/20 border-success'
                        : 'bg-warning/20 border-warning'
                      : 'bg-muted border-border'
                  } ${backtrackI === idx + 1 ? 'ring-2 ring-purple-400' : ''}`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">String 2:</h3>
            <div className="flex flex-wrap">
              {text2.split('').map((char, idx) => (
                <div 
                  key={idx}
                  className={`w-10 h-10 flex items-center justify-center rounded-md mx-1 border-2 ${
                    idx === charIndex2
                      ? match
                        ? 'bg-success/20 border-success'
                        : 'bg-warning/20 border-warning'
                      : 'bg-muted border-border'
                  } ${backtrackJ === idx + 1 ? 'ring-2 ring-purple-400' : ''}`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* DP Table visualization (improved) */}
      {dp && dp.length > 0 && (
        <div className="w-full max-w-3xl overflow-x-auto mb-6">
          <h3 className="font-medium mb-3">DP Table:</h3>
          <DPTable>
            <thead>
              <tr>
                <DPTableHeaderCell>i \ j</DPTableHeaderCell>
                <DPTableHeaderCell>-</DPTableHeaderCell>
                {text2.slice(0, 8).split('').map((char, j) => (
                  <DPTableHeaderCell 
                    key={j}
                    active={charIndex2 === j}
                  >
                    {char}
                  </DPTableHeaderCell>
                ))}
                {text2.length > 8 && <DPTableHeaderCell>...</DPTableHeaderCell>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <DPTableHeaderCell>-</DPTableHeaderCell>
                {Array.from({ length: Math.min(text2.length + 1, 9) }).map((_, j) => (
                  <DPTableCell key={j}>
                    {dp[0] && j < dp[0].length ? dp[0][j] : '0'}
                  </DPTableCell>
                ))}
                {text2.length > 8 && <DPTableCell>...</DPTableCell>}
              </tr>
              
              {text1.slice(0, 6).split('').map((char, i) => (
                <tr key={i}>
                  <DPTableHeaderCell active={charIndex1 === i}>{char}</DPTableHeaderCell>
                  {Array.from({ length: Math.min(text2.length + 1, 9) }).map((_, j) => (
                    <DPTableCell 
                      key={j}
                      active={charIndex1 === i && charIndex2 === j - 1}
                      success={charIndex1 === i && charIndex2 === j - 1 && match}
                      highlight={backtrackI === i + 1 && backtrackJ === j}
                    >
                      {dp[i + 1] && j < dp[i + 1].length ? dp[i + 1][j] : '-'}
                    </DPTableCell>
                  ))}
                  {text2.length > 8 && <DPTableCell>...</DPTableCell>}
                </tr>
              ))}
              
              {text1.length > 6 && (
                <tr>
                  <DPTableHeaderCell>...</DPTableHeaderCell>
                  {Array.from({ length: Math.min(text2.length + 1, 9) }).map((_, j) => (
                    <DPTableCell key={j}>...</DPTableCell>
                  ))}
                  {text2.length > 8 && <DPTableCell>...</DPTableCell>}
                </tr>
              )}
            </tbody>
          </DPTable>
        </div>
      )}
      
      {/* Results */}
      {lcsLength !== undefined && (
        <div className="mt-4 text-center">
          {lcs && (
            <div>
              <div className="font-medium">Longest Common Subsequence:</div>
              <div className="text-2xl font-bold mt-2 font-mono bg-primary/20 px-3 py-1 rounded">{lcs || '-'}</div>
            </div>
          )}
          
          <div className="mt-4">
            <div className="font-medium">Length:</div>
            <div className="text-xl font-bold mt-1">{lcsLength}</div>
          </div>
        </div>
      )}
      
      {complete && (
        <div className="mt-4 text-center font-medium text-success">
          Calculation complete!
        </div>
      )}
    </div>
  );
};

export default DPVisualizer;
