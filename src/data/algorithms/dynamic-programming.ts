
// Fix several type errors related to arrays in this file
import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Fibonacci
export const fibonacci: Algorithm = {
  id: 'fibonacci',
  name: 'Fibonacci',
  type: 'dynamic-programming',
  description: 'Calculates the nth Fibonacci number using dynamic programming.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
function fibonacci(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
  explanation: `<p>The Fibonacci sequence is a sequence of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.</p>
  <p>This algorithm uses dynamic programming to calculate the nth Fibonacci number in linear time. It stores the previously calculated Fibonacci numbers in an array and uses them to calculate the next one.</p>`,
  generateSteps: (input: { n: number }) => {
    const { n } = input;
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: `Calculate the ${n}th Fibonacci number`,
      highlightedLines: [1, 2],
      visualState: {
        n,
        dp: [],
        currentIndex: null
      }
    });
    
    if (n <= 1) {
      steps.push({
        id: 'base-case',
        description: `Base case: F(${n}) = ${n}`,
        highlightedLines: [2],
        visualState: {
          n,
          dp: [n],
          currentIndex: null,
          result: n
        }
      });
      return steps;
    }
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    steps.push({
      id: 'initialize-dp',
      description: 'Initialize dp array with base cases',
      highlightedLines: [4, 5, 6],
      visualState: {
        n,
        dp: [...dp],
        currentIndex: null
      }
    });
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2];
      
      steps.push({
        id: `calculate-${i}`,
        description: `Calculate F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
        highlightedLines: [8, 9],
        visualState: {
          n,
          dp: [...dp],
          currentIndex: i,
          prev1: dp[i-1],
          prev2: dp[i-2],
          current: dp[i]
        }
      });
    }
    
    steps.push({
      id: 'result',
      description: `Result: F(${n}) = ${dp[n]}`,
      highlightedLines: [12],
      visualState: {
        n,
        dp: [...dp],
        currentIndex: null,
        result: dp[n]
      }
    });
    
    return steps;
  },
  defaultInput: { n: 7 }
};

// Longest Common Subsequence
export const longestCommonSubsequence: Algorithm = {
  id: 'longest-common-subsequence',
  name: 'Longest Common Subsequence',
  type: 'dynamic-programming',
  description: 'Finds the longest subsequence common to two sequences.',
  timeComplexity: 'O(m*n)',
  spaceComplexity: 'O(m*n)',
  code: `// JavaScript Implementation
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  
  // Create dp table
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Fill dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Return the length of LCS
  return dp[m][n];
}`,
  explanation: `<p>The Longest Common Subsequence (LCS) problem is to find the longest subsequence common to two sequences. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.</p>
  <p>This algorithm uses dynamic programming to solve the LCS problem. It creates a table where dp[i][j] represents the length of the LCS of the first i characters of text1 and the first j characters of text2.</p>`,
  generateSteps: (input: { text1: string, text2: string }) => {
    const { text1, text2 } = input;
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: 'Find the longest common subsequence',
      highlightedLines: [1, 2],
      visualState: {
        text1,
        text2,
        m: text1.length,
        n: text2.length,
        dp: [],
        i: null,
        j: null
      }
    });
    
    const m = text1.length;
    const n = text2.length;
    
    // Create dp table
    const dp: number[][] = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    steps.push({
      id: 'initialize-dp',
      description: 'Initialize dp table with zeros',
      highlightedLines: [6],
      visualState: {
        text1,
        text2,
        m,
        n,
        dp: JSON.parse(JSON.stringify(dp)),
        i: null,
        j: null
      }
    });
    
    // Fill dp table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          
          steps.push({
            id: `match-${i}-${j}`,
            description: `Characters match: ${text1[i-1]} = ${text2[j-1]}, dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`,
            highlightedLines: [10, 11],
            visualState: {
              text1,
              text2,
              m,
              n,
              dp: JSON.parse(JSON.stringify(dp)),
              i,
              j,
              char1: text1[i-1],
              char2: text2[j-1],
              match: true
            }
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          
          steps.push({
            id: `no-match-${i}-${j}`,
            description: `Characters don't match: ${text1[i-1]} ≠ ${text2[j-1]}, dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = max(${dp[i-1][j]}, ${dp[i][j-1]}) = ${dp[i][j]}`,
            highlightedLines: [13],
            visualState: {
              text1,
              text2,
              m,
              n,
              dp: JSON.parse(JSON.stringify(dp)),
              i,
              j,
              char1: text1[i-1],
              char2: text2[j-1],
              match: false,
              max1: dp[i-1][j],
              max2: dp[i][j-1]
            }
          });
        }
      }
    }
    
    steps.push({
      id: 'result',
      description: `Result: The length of the longest common subsequence is ${dp[m][n]}`,
      highlightedLines: [18],
      visualState: {
        text1,
        text2,
        m,
        n,
        dp: JSON.parse(JSON.stringify(dp)),
        i: null,
        j: null,
        result: dp[m][n]
      }
    });
    
    return steps;
  },
  defaultInput: { text1: 'abcde', text2: 'ace' }
};

// Coin Change
export const coinChange: Algorithm = {
  id: 'coin-change',
  name: 'Coin Change',
  type: 'dynamic-programming',
  description: 'Finds the minimum number of coins needed to make a given amount.',
  timeComplexity: 'O(amount * n)',
  spaceComplexity: 'O(amount)',
  code: `// JavaScript Implementation
function coinChange(coins, amount) {
  // Initialize dp array with max value
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  
  // Compute minimum coins for each amount
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  // Return the result or -1 if it's not possible
  return dp[amount] > amount ? -1 : dp[amount];
}`,
  explanation: `<p>The Coin Change problem is to find the minimum number of coins needed to make a given amount, given a set of coin denominations.</p>
  <p>This algorithm uses dynamic programming to solve the Coin Change problem. It creates an array where dp[i] represents the minimum number of coins needed to make amount i.</p>`,
  generateSteps: (input: { coins: number[], amount: number }) => {
    const { coins, amount } = input;
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: `Find the minimum number of coins needed to make ${amount}`,
      highlightedLines: [1, 2],
      visualState: {
        coins,
        amount,
        dp: [],
        i: null,
        coin: null
      }
    });
    
    // Initialize dp array
    const dp: number[] = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    steps.push({
      id: 'initialize-dp',
      description: 'Initialize dp array with max value and set dp[0] = 0',
      highlightedLines: [3, 4],
      visualState: {
        coins,
        amount,
        dp: [...dp],
        i: null,
        coin: null
      }
    });
    
    // Compute minimum coins for each amount
    for (let i = 1; i <= amount; i++) {
      steps.push({
        id: `amount-${i}`,
        description: `Computing minimum coins for amount ${i}`,
        highlightedLines: [7],
        visualState: {
          coins,
          amount,
          dp: [...dp],
          i,
          coin: null
        }
      });
      
      for (const coin of coins) {
        if (coin <= i) {
          const prevAmount = i - coin;
          const prevCoins = dp[prevAmount];
          const newCoins = prevCoins + 1;
          
          if (newCoins < dp[i]) {
            dp[i] = newCoins;
            
            steps.push({
              id: `update-${i}-${coin}`,
              description: `Using coin ${coin} for amount ${i}: dp[${i}] = dp[${i} - ${coin}] + 1 = dp[${prevAmount}] + 1 = ${prevCoins} + 1 = ${newCoins}`,
              highlightedLines: [9, 10],
              visualState: {
                coins,
                amount,
                dp: [...dp],
                i,
                coin,
                prevAmount,
                prevCoins,
                newCoins
              }
            });
          } else {
            steps.push({
              id: `no-update-${i}-${coin}`,
              description: `Using coin ${coin} for amount ${i} doesn't improve: dp[${i}] = ${dp[i]} < dp[${i} - ${coin}] + 1 = ${prevCoins} + 1 = ${newCoins}`,
              highlightedLines: [9, 10],
              visualState: {
                coins,
                amount,
                dp: [...dp],
                i,
                coin,
                prevAmount,
                prevCoins,
                newCoins,
                noImprovement: true
              }
            });
          }
        }
      }
    }
    
    const result = dp[amount] > amount ? -1 : dp[amount];
    const resultDescription = result === -1 ? 
      `Result: It's not possible to make amount ${amount} with the given coins` :
      `Result: Minimum number of coins needed to make amount ${amount} is ${result}`;
    
    steps.push({
      id: 'result',
      description: resultDescription,
      highlightedLines: [14],
      visualState: {
        coins,
        amount,
        dp: [...dp],
        i: null,
        coin: null,
        result
      }
    });
    
    return steps;
  },
  defaultInput: { coins: [1, 2, 5], amount: 11 }
};
