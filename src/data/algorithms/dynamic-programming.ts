import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Fibonacci Sequence with Dynamic Programming
export const fibonacciDP: Algorithm = {
  id: 'fibonacci-dp',
  name: 'Fibonacci (DP)',
  type: 'dynamic-programming',
  description: 'Calculate the nth Fibonacci number using dynamic programming to avoid redundant calculations.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;
  
  // Initialize dp array
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  // Fill dp array
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Alternative approach with O(1) space
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  
  let prev = 0;
  let curr = 1;
  
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return curr;
}`,
  explanation: `<p>The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.</p>
  <p>The sequence starts: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...</p>
  <p>While a recursive solution is simple to write, it has exponential time complexity due to redundant calculations. Dynamic programming can optimize this:</p>
  <ul>
    <li><strong>Top-down approach (memoization):</strong> Use recursion but store computed results to avoid recalculation</li>
    <li><strong>Bottom-up approach (tabulation):</strong> Build up the solution iteratively, storing results in a table</li>
  </ul>
  <p>The bottom-up approach uses an array to store all Fibonacci numbers up to n, resulting in O(n) time complexity and O(n) space complexity.</p>
  <p>For even better space efficiency, we can use just two variables to track the previous two Fibonacci numbers, reducing space complexity to O(1).</p>`,
  generateSteps: (input: { n: number, optimized: boolean }) => {
    const { n = 5, optimized = false } = input;
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: `Calculate the ${n}th Fibonacci number using ${optimized ? 'optimized' : 'standard'} DP`,
      highlightedLines: optimized ? [18, 19] : [2, 3],
      visualState: { 
        n,
        optimized,
        dp: optimized ? [] : [0, 1], // Fix: Changed null to empty array
        prev: optimized ? 0 : null,
        curr: optimized ? 1 : null,
        result: null,
        currentStep: 0
      }
    });
    
    if (n <= 1) {
      steps.push({
        id: 'base-case',
        description: `Base case: n = ${n}, return ${n}`,
        highlightedLines: optimized ? 19 : 3,
        visualState: { 
          n,
          optimized,
          dp: optimized ? [] : [0, 1], // Fix: Changed null to empty array
          prev: optimized ? 0 : null,
          curr: optimized ? 1 : null,
          result: n,
          currentStep: 0
        }
      });
    } else {
      if (optimized) {
        // Optimized approach with O(1) space
        let prev = 0;
        let curr = 1;
        
        steps.push({
          id: 'init-vars',
          description: 'Initialize variables: prev = 0, curr = 1',
          highlightedLines: [21, 22],
          visualState: { 
            n,
            optimized,
            prev,
            curr,
            currentStep: 0
          }
        });
        
        for (let i = 2; i <= n; i++) {
          const next = prev + curr;
          
          steps.push({
            id: `calc-next-${i}`,
            description: `Calculate F(${i}) = F(${i-2}) + F(${i-1}) = ${prev} + ${curr} = ${next}`,
            highlightedLines: [25],
            visualState: { 
              n,
              optimized,
              prev,
              curr,
              next,
              currentStep: i,
              currentCalc: [prev, curr]
            }
          });
          
          prev = curr;
          curr = next;
          
          steps.push({
            id: `update-vars-${i}`,
            description: `Update variables: prev = ${prev}, curr = ${curr}`,
            highlightedLines: [26, 27],
            visualState: { 
              n,
              optimized,
              prev,
              curr,
              currentStep: i
            }
          });
        }
        
        steps.push({
          id: 'result',
          description: `Result: F(${n}) = ${curr}`,
          highlightedLines: [30],
          visualState: { 
            n,
            optimized,
            prev,
            curr,
            result: curr,
            currentStep: n
          }
        });
      } else {
        // Standard DP approach
        const dp = new Array(n + 1);
        dp[0] = 0;
        dp[1] = 1;
        
        steps.push({
          id: 'init-dp',
          description: 'Initialize DP array with base cases: dp[0] = 0, dp[1] = 1',
          highlightedLines: [6, 7, 8],
          visualState: { 
            n,
            optimized,
            dp: [...dp.slice(0, 2)],
            currentStep: 0
          }
        });
        
        for (let i = 2; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
          
          steps.push({
            id: `calc-dp-${i}`,
            description: `Calculate dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
            highlightedLines: [11],
            visualState: { 
              n,
              optimized,
              dp: [...dp.slice(0, i+1)],
              currentStep: i,
              currentCalc: [i-2, i-1]
            }
          });
        }
        
        steps.push({
          id: 'result',
          description: `Result: F(${n}) = dp[${n}] = ${dp[n]}`,
          highlightedLines: [14],
          visualState: { 
            n,
            optimized,
            dp,
            result: dp[n],
            currentStep: n
          }
        });
      }
    }
    
    return steps;
  },
  defaultInput: { n: 5, optimized: false }
};

// Knapsack Problem
export const knapsackProblem: Algorithm = {
  id: 'knapsack-problem',
  name: 'Knapsack Problem',
  type: 'dynamic-programming',
  description: 'Solve the 0/1 Knapsack problem: maximize value while keeping total weight within capacity.',
  timeComplexity: 'O(n*W) where n is the number of items and W is the capacity',
  spaceComplexity: 'O(n*W)',
  code: `// JavaScript Implementation
function knapsack(values, weights, capacity) {
  const n = values.length;
  
  // Create DP table
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // If current item weight is more than capacity, skip it
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      }
      // Otherwise, take maximum of including or excluding the item
      else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }
  
  // Backtrack to find the items included
  const result = {
    maxValue: dp[n][capacity],
    includedItems: []
  };
  
  let w = capacity;
  for (let i = n; i > 0; i--) {
    // If this item is included
    if (dp[i][w] !== dp[i - 1][w]) {
      result.includedItems.push(i - 1);
      w -= weights[i - 1];
    }
  }
  
  return result;
}`,
  explanation: `<p>The Knapsack Problem is a classic optimization problem: Given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit (capacity) and the total value is as large as possible.</p>
  <p>The 0/1 Knapsack Problem refers to the constraint that each item can either be taken (1) or left (0) - it cannot be divided.</p>
  <p>Dynamic programming approach:</p>
  <ol>
    <li>Create a 2D DP table where dp[i][w] represents the maximum value that can be obtained using the first i items with a maximum weight of w</li>
    <li>For each item, we have two choices: include it or exclude it</li>
    <li>If including the item exceeds the weight limit, we must exclude it</li>
    <li>Otherwise, we take the maximum value between including and excluding the item</li>
  </ol>
  <p>After filling the DP table, we can backtrack to determine which items were included in the optimal solution.</p>`,
  generateSteps: (input: { values: number[], weights: number[], capacity: number }) => {
    const values = input?.values || [60, 100, 120];
    const weights = input?.weights || [10, 20, 30];
    const capacity = input?.capacity !== undefined ? input.capacity : 50;
    
    const steps: AlgorithmStep[] = [];
    const n = values.length;
    
    steps.push({
      id: 'init',
      description: 'Initialize the knapsack problem',
      highlightedLines: [2, 3],
      visualState: { 
        values,
        weights,
        capacity,
        currentItem: null,
        currentWeight: null,
        dp: null
      }
    });
    
    // Create and initialize DP table
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    steps.push({
      id: 'init-dp',
      description: 'Create DP table initialized with zeros',
      highlightedLines: [5, 6],
      visualState: { 
        values,
        weights,
        capacity,
        dp: JSON.parse(JSON.stringify(dp))
      }
    });
    
    // Fill the DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        steps.push({
          id: `consider-${i}-${w}`,
          description: `Consider item ${i} (value: ${values[i-1]}, weight: ${weights[i-1]}) with remaining capacity ${w}`,
          highlightedLines: [9],
          visualState: { 
            values,
            weights,
            capacity,
            dp: JSON.parse(JSON.stringify(dp)),
            currentItem: i - 1,
            currentWeight: w
          }
        });
        
        if (weights[i - 1] > w) {
          // If current item is too heavy, skip it
          dp[i][w] = dp[i - 1][w];
          
          steps.push({
            id: `too-heavy-${i}-${w}`,
            description: `Item ${i} (weight: ${weights[i-1]}) is too heavy for capacity ${w}, skip it: dp[${i}][${w}] = dp[${i-1}][${w}] = ${dp[i][w]}`,
            highlightedLines: [11, 12],
            visualState: { 
              values,
              weights,
              capacity,
              dp: JSON.parse(JSON.stringify(dp)),
              currentItem: i - 1,
              currentWeight: w,
              tooHeavy: true
            }
          });
        } else {
          // Choose maximum of including or excluding the item
          const includeValue = dp[i - 1][w - weights[i - 1]] + values[i - 1];
          const excludeValue = dp[i - 1][w];
          dp[i][w] = Math.max(includeValue, excludeValue);
          
          steps.push({
            id: `choose-${i}-${w}`,
            description: `Choose max between including (${includeValue}) or excluding (${excludeValue}) item ${i}: dp[${i}][${w}] = ${dp[i][w]}`,
            highlightedLines: [15, 16, 17],
            visualState: { 
              values,
              weights,
              capacity,
              dp: JSON.parse(JSON.stringify(dp)),
              currentItem: i - 1,
              currentWeight: w,
              includeValue,
              excludeValue
            }
          });
        }
      }
    }
    
    // Get the maximum value
    const maxValue = dp[n][capacity];
    
    steps.push({
      id: 'max-value',
      description: `Maximum value: ${maxValue}`,
      highlightedLines: [23, 24],
      visualState: { 
        values,
        weights,
        capacity,
        dp: JSON.parse(JSON.stringify(dp)),
        maxValue
      }
    });
    
    // Backtrack to find included items
    const includedItems: number[] = [];
    let w = capacity;
    
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        includedItems.push(i - 1);
        w -= weights[i - 1];
        
        steps.push({
          id: `backtrack-${i}`,
          description: `Include item ${i} (value: ${values[i-1]}, weight: ${weights[i-1]}) in the solution`,
          highlightedLines: [30, 31, 32],
          visualState: { 
            values,
            weights,
            capacity,
            dp: JSON.parse(JSON.stringify(dp)),
            maxValue,
            includedItems: [...includedItems],
            backtrackItem: i - 1
          }
        });
      } else {
        steps.push({
          id: `skip-${i}`,
          description: `Skip item ${i} (not part of optimal solution)`,
          highlightedLines: [29],
          visualState: { 
            values,
            weights,
            capacity,
            dp: JSON.parse(JSON.stringify(dp)),
            maxValue,
            includedItems: [...includedItems],
            backtrackItem: null
          }
        });
      }
    }
    
    steps.push({
      id: 'result',
      description: `Final result: max value = ${maxValue}, included items = [${includedItems.map(i => i+1).join(', ')}]`,
      highlightedLines: [36],
      visualState: { 
        values,
        weights,
        capacity,
        dp: JSON.parse(JSON.stringify(dp)),
        maxValue,
        includedItems,
        complete: true
      }
    });
    
    return steps;
  },
  defaultInput: { 
    values: [60, 100, 120],
    weights: [10, 20, 30],
    capacity: 50
  }
};

// Longest Common Subsequence
export const longestCommonSubsequence: Algorithm = {
  id: 'longest-common-subsequence',
  name: 'Longest Common Subsequence',
  type: 'dynamic-programming',
  description: 'Find the longest subsequence common to two sequences.',
  timeComplexity: 'O(m*n) where m and n are the lengths of the two sequences',
  spaceComplexity: 'O(m*n)',
  code: `// JavaScript Implementation
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  
  // Create DP table
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Length of LCS
  const lcsLength = dp[m][n];
  
  // Backtrack to find the actual LCS
  let lcs = '';
  let i = m, j = n;
  
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      lcs = text1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return { length: lcsLength, sequence: lcs };
}`,
  explanation: `<p>The Longest Common Subsequence (LCS) problem is to find the longest subsequence common to two sequences. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.</p>
  <p>For example, the LCS of "ABCBDAB" and "BDCABA" is "BCBA" with length 4.</p>
  <p>Dynamic programming approach:</p>
  <ol>
    <li>Create a 2D DP table where dp[i][j] represents the length of the LCS of the first i characters of text1 and the first j characters of text2</li>
    <li>If the current characters match, increment the LCS length</li>
    <li>If not, take the maximum of the LCS without the current character from either text1 or text2</li>
    <li>After filling the table, dp[m][n] gives the length of the LCS</li>
    <li>We can backtrack through the table to find the actual subsequence</li>
  </ol>
  <p>The LCS problem has applications in file comparison, DNA sequence analysis, and version control systems.</p>`,
  generateSteps: (input: { text1: string, text2: string }) => {
    const text1 = input?.text1 || 'ABCBDAB';
    const text2 = input?.text2 || 'BDCABA';
    
    const steps: AlgorithmStep[] = [];
    const m = text1.length;
    const n = text2.length;
    
    steps.push({
      id: 'init',
      description: `Find longest common subsequence of "${text1}" and "${text2}"`,
      highlightedLines: [2, 3, 4],
      visualState: { 
        text1,
        text2,
        dp: null
      }
    });
    
    // Create and initialize DP table
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    steps.push({
      id: 'init-dp',
      description: 'Create DP table initialized with zeros',
      highlightedLines: [6, 7],
      visualState: { 
        text1,
        text2,
        dp: JSON.parse(JSON.stringify(dp))
      }
    });
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        steps.push({
          id: `compare-${i}-${j}`,
          description: `Compare characters: ${text1[i-1]} and ${text2[j-1]}`,
          highlightedLines: [10],
          visualState: { 
            text1,
            text2,
            dp: JSON.parse(JSON.stringify(dp)),
            charIndex1: i - 1,
            charIndex2: j - 1
          }
        });
        
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          
          steps.push({
            id: `match-${i}-${j}`,
            description: `Characters match: dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`,
            highlightedLines: [11],
            visualState: { 
              text1,
              text2,
              dp: JSON.parse(JSON.stringify(dp)),
              charIndex1: i - 1,
              charIndex2: j - 1,
              match: true
            }
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          
          steps.push({
            id: `no-match-${i}-${j}`,
            description: `Characters don't match: dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = ${dp[i][j]}`,
            highlightedLines: [13],
            visualState: { 
              text1,
              text2,
              dp: JSON.parse(JSON.stringify(dp)),
              charIndex1: i - 1,
              charIndex2: j - 1,
              match: false
            }
          });
        }
      }
    }
    
    // Length of LCS
    const lcsLength = dp[m][n];
    
    steps.push({
      id: 'lcs-length',
      description: `Length of longest common subsequence: ${lcsLength}`,
      highlightedLines: [18],
      visualState: { 
        text1,
        text2,
        dp: JSON.parse(JSON.stringify(dp)),
        lcsLength
      }
    });
    
    // Backtrack to find the actual LCS
    let lcs = '';
    let i = m, j = n;
    let backtrackSteps: string[] = [];
    
    steps.push({
      id: 'backtrack-start',
      description: 'Backtrack to find the actual subsequence',
      highlightedLines: [21, 22],
      visualState: { 
        text1,
        text2,
        dp: JSON.parse(JSON.stringify(dp)),
        lcsLength,
        backtrackI: i,
        backtrackJ: j,
        lcs
      }
    });
    
    while (i > 0 && j > 0) {
      if (text1[i - 1] === text2[j - 1]) {
        lcs = text1[i - 1] + lcs;
        backtrackSteps.push(`Characters match: Add "${text1[i - 1]}" to LCS`);
        
        steps.push({
          id: `backtrack-match-${i}-${j}`,
          description: `Characters match: Add "${text1[i-1]}" to LCS, now "${lcs}"`,
          highlightedLines: [24, 25, 26],
          visualState: { 
            text1,
            text2,
            dp: JSON.parse(JSON.stringify(dp)),
            lcsLength,
            backtrackI: i,
            backtrackJ: j,
            lcs,
            match: true
          }
        });
        
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        backtrackSteps.push(`Move up: dp[${i-1}][${j}] > dp[${i}][${j-1}]`);
        
        steps.push({
          id: `backtrack-up-${i}-${j}`,
          description: `Move up: dp[${i-1}][${j}] > dp[${i}][${j-1}]`,
          highlightedLines: [27, 28],
          visualState: { 
            text1,
            text2,
            dp: JSON.parse(JSON.stringify(dp)),
            lcsLength,
            backtrackI: i,
            backtrackJ: j,
            lcs,
            moveDirection: 'up'
          }
        });
        
        i--;
      } else {
        backtrackSteps.push(`Move left: dp[${i-1}][${j}] <= dp[${i}][${j-1}]`);
        
        steps.push({
          id: `backtrack-left-${i}-${j}`,
          description: `Move left: dp[${i-1}][${j}] <= dp[${i}][${j-1}]`,
          highlightedLines: [29, 30],
          visualState: { 
            text1,
            text2,
            dp: JSON.parse(JSON.stringify(dp)),
            lcsLength,
            backtrackI: i,
            backtrackJ: j,
            lcs,
            moveDirection: 'left'
          }
        });
        
        j--;
      }
    }
    
    steps.push({
      id: 'result',
      description: `Final result: LCS = "${lcs}" with length ${lcsLength}`,
      highlightedLines: [34],
      visualState: { 
        text1,
        text2,
        dp: JSON.parse(JSON.stringify(dp)),
        lcsLength,
        lcs,
        complete: true
      }
    });
    
    return steps;
  },
  defaultInput: { 
    text1: 'ABCBDAB',
    text2: 'BDCABA'
  }
};
