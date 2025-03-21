
import React from 'react';

interface DPVisualizerProps {
  data: {
    dp?: number[][] | number[];
    str1?: string;
    str2?: string;
    current?: [number, number];
    capacity?: number;
    weights?: number[];
    values?: number[];
    prices?: number[];
    length?: number;
    dimensions?: number[];
    coins?: number[];
    amount?: number;
    split?: number;
    cut?: number;
    coin?: number;
  };
}

const DPVisualizer: React.FC<DPVisualizerProps> = ({ data }) => {
  if (!data || (!data.dp && !data.str1 && !data.str2)) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  const { dp, str1, str2, current, capacity, weights, values, dimensions, coins, amount, prices, length, split, cut, coin } = data;
  
  const is2D = dp && Array.isArray(dp) && Array.isArray(dp[0]);
  
  if (is2D) {
    // 2D DP table visualization (e.g., edit distance, LCS)
    const dpTable = dp as number[][];
    
    return (
      <div className="w-full overflow-auto p-4 bg-card/50 rounded-md border border-border/50">
        <div className="flex justify-center mb-4">
          {/* String visualization */}
          {str1 && str2 && (
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div></div>
              <div className="flex">
                {str2.split('').map((char, i) => (
                  <div
                    key={`str2-${i}`}
                    className={`w-10 h-10 flex items-center justify-center border ${
                      current && current[1] - 1 === i ? 'bg-warning/20 border-warning' : 'border-border'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {str1.split('').map((char, i) => (
                  <div
                    key={`str1-${i}`}
                    className={`w-10 h-10 flex items-center justify-center border ${
                      current && current[0] - 1 === i ? 'bg-warning/20 border-warning' : 'border-border'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
              <div className="grid grid-flow-row grid-cols-repeat">
                {dpTable.map((row, i) => (
                  <React.Fragment key={`row-${i}`}>
                    {row.map((cell, j) => (
                      <div
                        key={`cell-${i}-${j}`}
                        className={`w-10 h-10 flex items-center justify-center border ${
                          current && current[0] === i && current[1] === j
                            ? 'bg-warning/20 border-warning'
                            : 'border-border'
                        } ${
                          typeof cell === 'number' && cell !== Infinity ? 'font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {cell === Infinity ? '∞' : cell}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          
          {/* Matrix Chain Multiplication visualization */}
          {dimensions && (
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {dimensions.map((dim, i) => (
                  <div
                    key={`dim-${i}`}
                    className="px-3 py-1 border rounded-md bg-primary/10"
                  >
                    {dim}
                  </div>
                ))}
              </div>
              <div className="grid grid-flow-row auto-cols-fr">
                {dpTable.map((row, i) => (
                  <div key={`row-${i}`} className="flex">
                    {row.map((cell, j) => (
                      <div
                        key={`cell-${i}-${j}`}
                        className={`w-12 h-12 flex items-center justify-center border ${
                          current && current[0] === i && current[1] === j
                            ? 'bg-warning/20 border-warning'
                            : split !== undefined && (i === split || j === split)
                              ? 'bg-primary/10 border-primary'
                              : 'border-border'
                        } ${
                          typeof cell === 'number' && cell !== Infinity ? 'font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {cell === Infinity ? '∞' : cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Knapsack Problem visualization */}
          {capacity !== undefined && weights && values && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Weights:</h3>
                  <div className="flex gap-2">
                    {weights.map((weight, i) => (
                      <div
                        key={`weight-${i}`}
                        className={`px-3 py-1 border rounded-md ${
                          current && current[0] - 1 === i ? 'bg-warning/20 border-warning' : 'bg-primary/10'
                        }`}
                      >
                        {weight}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Values:</h3>
                  <div className="flex gap-2">
                    {values.map((value, i) => (
                      <div
                        key={`value-${i}`}
                        className={`px-3 py-1 border rounded-md ${
                          current && current[0] - 1 === i ? 'bg-warning/20 border-warning' : 'bg-success/10'
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">DP Table:</h3>
                <div className="grid grid-flow-row auto-cols-fr overflow-auto">
                  <div className="flex">
                    <div className="w-12 h-12 flex items-center justify-center border border-border font-medium bg-muted/50">
                      i\w
                    </div>
                    {Array.from({ length: capacity + 1 }, (_, i) => (
                      <div
                        key={`header-${i}`}
                        className="w-12 h-12 flex items-center justify-center border border-border font-medium bg-muted/50"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  {dpTable.map((row, i) => (
                    <div key={`row-${i}`} className="flex">
                      <div className="w-12 h-12 flex items-center justify-center border border-border font-medium bg-muted/50">
                        {i}
                      </div>
                      {row.map((cell, j) => (
                        <div
                          key={`cell-${i}-${j}`}
                          className={`w-12 h-12 flex items-center justify-center border ${
                            current && current[0] === i && current[1] === j
                              ? 'bg-warning/20 border-warning'
                              : 'border-border'
                          }`}
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else if (dp) {
    // 1D DP table visualization (e.g., coin change, rod cutting)
    const dpArray = dp as number[];
    
    return (
      <div className="w-full overflow-auto p-4 bg-card/50 rounded-md border border-border/50">
        <div className="space-y-4">
          {/* Coin change visualization */}
          {coins && amount !== undefined && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Coins:</h3>
                <div className="flex gap-2">
                  {coins.map((coinValue, i) => (
                    <div
                      key={`coin-${i}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                        coin !== undefined && coin === coinValue ? 'bg-warning/20 border-warning' : 'bg-primary/10 border-primary'
                      }`}
                    >
                      {coinValue}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">DP Array (min coins needed for amount):</h3>
                <div className="flex flex-wrap">
                  {dpArray.map((cell, i) => (
                    <div key={`dp-${i}`} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 flex items-center justify-center border ${
                          current !== undefined && current[0] === i
                            ? 'bg-warning/20 border-warning'
                            : 'border-border'
                        } ${
                          cell === Infinity ? 'text-muted-foreground' : 'font-medium'
                        }`}
                      >
                        {cell === Infinity ? '∞' : cell}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Rod cutting visualization */}
          {prices && length !== undefined && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Prices for lengths:</h3>
                <div className="flex gap-2">
                  {prices.map((price, i) => (
                    <div
                      key={`price-${i}`}
                      className={`px-3 py-1 border rounded-md ${
                        cut !== undefined && cut === i + 1 ? 'bg-warning/20 border-warning' : 'bg-success/10'
                      }`}
                    >
                      <div className="text-xs text-muted-foreground">Length {i + 1}</div>
                      <div className="font-medium">${price}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">DP Array (max value for length):</h3>
                <div className="flex flex-wrap">
                  {dpArray.map((cell, i) => (
                    <div key={`dp-${i}`} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 flex items-center justify-center border ${
                          current !== undefined && current[0] === i
                            ? 'bg-warning/20 border-warning'
                            : 'border-border'
                        }`}
                      >
                        {cell}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Generic 1D DP visualization if none of the above */}
          {!coins && prices === undefined && (
            <div>
              <h3 className="text-sm font-medium mb-2">DP Array:</h3>
              <div className="flex flex-wrap">
                {dpArray.map((cell, i) => (
                  <div key={`dp-${i}`} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 flex items-center justify-center border ${
                        current !== undefined && current[0] === i
                          ? 'bg-warning/20 border-warning'
                          : 'border-border'
                      } ${
                        cell === Infinity ? 'text-muted-foreground' : 'font-medium'
                      }`}
                    >
                      {cell === Infinity ? '∞' : cell}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{i}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="text-muted-foreground">Visualization data is incomplete</div>
    </div>
  );
};

export default DPVisualizer;
