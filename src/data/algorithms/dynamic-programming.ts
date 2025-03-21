
import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Edit Distance
export const editDistance: Algorithm = {
  id: 'edit-distance',
  name: 'Edit Distance',
  type: 'dynamic-programming',
  description: 'Calculates the minimum number of operations required to transform one string into another.',
  timeComplexity: 'O(m*n)',
  spaceComplexity: 'O(m*n)',
  code: `function editDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // Create a DP table to store results of subproblems
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  // If str1 is empty, the only option is to insert all characters of str2
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  // If str2 is empty, the only option is to remove all characters of str1
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If the last characters are the same, no operation is needed
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // If the last characters are different, consider all possibilities and find the minimum
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],    // Remove
          dp[i][j - 1],    // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }

  // Return the edit distance between str1 and str2
  return dp[m][n];
}`,
  explanation: `<p>The edit distance between two strings is the minimum number of operations (insertions, deletions, or substitutions) needed to transform one string into the other.</p>
  <p>This algorithm uses dynamic programming to efficiently compute the edit distance. The key idea is to build a table where each cell (i, j) represents the edit distance between the first i characters of string1 and the first j characters of string2.</p>
  <p>The algorithm fills the table in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>If the characters at the current positions in both strings are the same, no operation is needed, and the edit distance is the same as the edit distance between the prefixes without these characters.</li>
    <li>If the characters are different, we consider all three possible operations (insert, delete, replace) and choose the one that results in the minimum edit distance.</li>
  </ul>`,
  generateSteps: (input: { str1: string, str2: string }) => {
    const str1 = input?.str1 || "kitten";
    const str2 = input?.str2 || "sitting";
    const m = str1.length;
    const n = str2.length;
    const steps: AlgorithmStep[] = [];

    // Initialize DP table
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    steps.push({
      id: 'init',
      description: 'Initialize DP table',
      highlightedLines: [2, 3],
      visualState: { str1, str2, dp: dp.map(row => [...row]) }
    });

    // Initialize first row and column
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    steps.push({
      id: 'init-first-row-col',
      description: 'Initialize first row and column of DP table',
      highlightedLines: [6, 11],
      visualState: { str1, str2, dp: dp.map(row => [...row]) }
    });

    // Fill DP table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        steps.push({
          id: `compare-${i}-${j}`,
          description: `Comparing str1[${i - 1}]='${str1[i - 1]}' and str2[${j - 1}]='${str2[j - 1]}'`,
          highlightedLines: [16],
          visualState: { str1, str2, dp: dp.map(row => [...row]), current: [i, j] }
        });

        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push({
            id: `same-${i}-${j}`,
            description: `Characters are the same, no operation needed. dp[${i}][${j}] = dp[${i - 1}][${j - 1}] = ${dp[i][j]}`,
            highlightedLines: [17, 18],
            visualState: { str1, str2, dp: dp.map(row => [...row]), current: [i, j] }
          });
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j],    // Remove
            dp[i][j - 1],    // Insert
            dp[i - 1][j - 1]  // Replace
          );
          steps.push({
            id: `diff-${i}-${j}`,
            description: `Characters differ, take minimum of insert, delete, replace. dp[${i}][${j}] = ${dp[i][j]}`,
            highlightedLines: [20, 25],
            visualState: { str1, str2, dp: dp.map(row => [...row]), current: [i, j] }
          });
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `Edit distance between '${str1}' and '${str2}' is ${dp[m][n]}`,
      highlightedLines: [29],
      visualState: { str1, str2, dp: dp.map(row => [...row]) }
    });

    return steps;
  },
  defaultInput: { str1: "kitten", str2: "sitting" }
};

// Knapsack Problem
export const knapsackProblem: Algorithm = {
  id: 'knapsack-problem',
  name: 'Knapsack Problem',
  type: 'dynamic-programming',
  description: 'Find the most valuable combination of items to fit into a knapsack with a limited weight capacity.',
  timeComplexity: 'O(n*W)',
  spaceComplexity: 'O(n*W)',
  code: `function knapsack(capacity, weights, values, n) {
  // dp[i][w] will store the maximum value that can be obtained with items up to i-th item
  // and with knapsack capacity w
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  // Build table dp[][] in bottom up manner
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        // Check if the i-th item can be included in the knapsack
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include item
          dp[i - 1][w]                                    // Exclude item
        );
      } else {
        // If the i-th item's weight is more than the knapsack capacity, cannot include this item
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Return the maximum value that can be obtained
  return dp[n][capacity];
}`,
  explanation: `<p>The knapsack problem is a classic optimization problem where you have a knapsack with a limited weight capacity and a set of items, each with a weight and a value. The goal is to determine the most valuable combination of items to include in the knapsack without exceeding its capacity.</p>
  <p>This algorithm uses dynamic programming to solve the knapsack problem. The key idea is to build a table where each cell (i, w) represents the maximum value that can be obtained with items up to the i-th item and with a knapsack capacity of w.</p>
  <p>The algorithm fills the table in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>If the weight of the current item is less than or equal to the current capacity, we have two choices: either include the item in the knapsack or exclude it. We choose the option that gives us the maximum value.</li>
    <li>If the weight of the current item is greater than the current capacity, we cannot include the item in the knapsack, so the maximum value is the same as the maximum value without this item.</li>
  </ul>`,
  generateSteps: (input: { capacity: number, weights: number[], values: number[] }) => {
    const capacity = input?.capacity || 10;
    const weights = input?.weights || [5, 4, 6, 3];
    const values = input?.values || [10, 40, 30, 50];
    const n = weights.length;
    const steps: AlgorithmStep[] = [];

    // Initialize DP table
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    steps.push({
      id: 'init',
      description: 'Initialize DP table',
      highlightedLines: [2, 3],
      visualState: { capacity, weights, values, dp: dp.map(row => [...row]) }
    });

    // Build DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        steps.push({
          id: `item-${i}-capacity-${w}`,
          description: `Checking item ${i} with weight ${weights[i - 1]} and value ${values[i - 1]} for capacity ${w}`,
          highlightedLines: [6],
          visualState: { capacity, weights, values, dp: dp.map(row => [...row]), current: [i, w] }
        });

        if (weights[i - 1] <= w) {
          // Can include item
          dp[i][w] = Math.max(
            values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include item
            dp[i - 1][w]                                    // Exclude item
          );
          steps.push({
            id: `include-exclude-${i}-${w}`,
            description: `Can include item. Choose max of including (value: ${values[i - 1]}, remaining capacity: ${w - weights[i - 1]}) or excluding. dp[${i}][${w}] = ${dp[i][w]}`,
            highlightedLines: [8, 11],
            visualState: { capacity, weights, values, dp: dp.map(row => [...row]), current: [i, w] }
          });
        } else {
          // Cannot include item
          dp[i][w] = dp[i - 1][w];
          steps.push({
            id: `exclude-${i}-${w}`,
            description: `Cannot include item. dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dp[i][w]}`,
            highlightedLines: [13, 14],
            visualState: { capacity, weights, values, dp: dp.map(row => [...row]), current: [i, w] }
          });
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `Maximum value that can be carried in the knapsack is ${dp[n][capacity]}`,
      highlightedLines: [18],
      visualState: { capacity, weights, values, dp: dp.map(row => [...row]) }
    });

    return steps;
  },
  defaultInput: { capacity: 10, weights: [5, 4, 6, 3], values: [10, 40, 30, 50] }
};

// Longest Common Subsequence
export const longestCommonSubsequence: Algorithm = {
  id: 'longest-common-subsequence',
  name: 'Longest Common Subsequence',
  type: 'dynamic-programming',
  description: 'Find the length of the longest subsequence common to two strings.',
  timeComplexity: 'O(m*n)',
  spaceComplexity: 'O(m*n)',
  code: `function longestCommonSubsequence(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // Initialize a DP table to store lengths of LCS for subproblems
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  // Build the DP table in bottom-up manner
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        // If the current characters match, increment the LCS length
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // If the current characters do not match, take the maximum LCS length from the adjacent cells
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // The length of the LCS is stored in dp[m][n]
  return dp[m][n];
}`,
  explanation: `<p>The longest common subsequence (LCS) of two strings is the longest subsequence common to both strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.</p>
  <p>This algorithm uses dynamic programming to efficiently compute the length of the LCS. The key idea is to build a table where each cell (i, j) represents the length of the LCS between the first i characters of string1 and the first j characters of string2.</p>
  <p>The algorithm fills the table in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>If the characters at the current positions in both strings are the same, the length of the LCS is the length of the LCS between the prefixes without these characters, plus 1.</li>
    <li>If the characters are different, the length of the LCS is the maximum of the lengths of the LCS between the prefix of string1 without the current character and the prefix of string2, and the prefix of string1 and the prefix of string2 without the current character.</li>
  </ul>`,
  generateSteps: (input: { str1: string, str2: string }) => {
    const str1 = input?.str1 || "AGGTAB";
    const str2 = input?.str2 || "GXTXAYB";
    const m = str1.length;
    const n = str2.length;
    const steps: AlgorithmStep[] = [];

    // Initialize DP table
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    steps.push({
      id: 'init',
      description: 'Initialize DP table',
      highlightedLines: [2, 3],
      visualState: { str1, str2, dp: dp.map(row => [...row]) }
    });

    // Build DP table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        steps.push({
          id: `compare-${i}-${j}`,
          description: `Comparing str1[${i - 1}]='${str1[i - 1]}' and str2[${j - 1}]='${str2[j - 1]}'`,
          highlightedLines: [6],
          visualState: { str1, str2, dp: dp.map(row => [...row]), current: [i, j] }
        });

        if (str1[i - 1] === str2[j - 1]) {
          // Characters match
          dp[i][j] = dp[i - 1][j - 1] + 1;
          steps.push({
            id: `match-${i}-${j}`,
            description: `Characters match. dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
            highlightedLines: [8, 9],
            visualState: { str1, str2, dp: dp.map(row => [...row]), current: [i, j] }
          });
        } else {
          // Characters do not match
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          steps.push({
            id: `no-match-${i}-${j}`,
            description: `Characters do not match. dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${dp[i][j]}`,
            highlightedLines: [11, 12],
            visualState: { str1, str2, dp: dp.map(row => [...row]), current: [i, j] }
          });
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `Length of the longest common subsequence is ${dp[m][n]}`,
      highlightedLines: [16],
      visualState: { str1, str2, dp: dp.map(row => [...row]) }
    });

    return steps;
  },
  defaultInput: { str1: "AGGTAB", str2: "GXTXAYB" }
};

// Matrix Chain Multiplication
export const matrixChainMultiplication: Algorithm = {
  id: 'matrix-chain-multiplication',
  name: 'Matrix Chain Multiplication',
  type: 'dynamic-programming',
  description: 'Find the most efficient way to multiply a given sequence of matrices.',
  timeComplexity: 'O(n^3)',
  spaceComplexity: 'O(n^2)',
  code: `function matrixChainOrder(p, n) {
  // m[i,j] = Minimum number of scalar multiplications needed to compute the matrix A_iA_{i+1}...A_j
  // m[i,i] = 0 since a single matrix doesn't need any scalar multiplications.

  const m = Array(n).fill(null).map(() => Array(n).fill(0));

  // cost is zero when multiplying one matrix.
  for (let i = 1; i < n; i++) {
    m[i][i] = 0;
  }

  // L is chain length.  Chain of length 1 is already minimized in the above loop.
  for (let L = 2; L < n; L++) {
    for (let i = 1; i < n - L + 1; i++) {
      const j = i + L - 1;
      m[i][j] = Infinity;
      for (let k = i; k <= j - 1; k++) {
        // q = cost/scalar multiplications
        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (q < m[i][j]) {
          m[i][j] = q;
        }
      }
    }
  }

  return m[1][n - 1];
}
`,
  explanation: `<p>Given a sequence of matrices, find the most efficient way to multiply these matrices together. The problem is not actually to perform the multiplications, but merely to decide the sequence of the matrix multiplications involved.</p>
  <p>This algorithm uses dynamic programming to solve the matrix chain multiplication problem. The key idea is to build a table where each cell (i, j) represents the minimum number of scalar multiplications needed to compute the matrix A_iA_{i+1}...A_j.</p>
  <p>The algorithm fills the table in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>m[i,i] = 0 since a single matrix doesn't need any scalar multiplications.</li>
    <li>For each chain length L, we iterate through all possible starting positions i and calculate the cost of multiplying the subchains.</li>
    <li>We choose the value of k that minimizes the cost of multiplying the subchains.</li>
  </ul>`,
  generateSteps: (input: { dimensions: number[] }) => {
    const dimensions = input?.dimensions || [40, 20, 30, 10, 30];
    const n = dimensions.length;
    const steps: AlgorithmStep[] = [];

    // Initialize DP table
    const m = Array(n).fill(null).map(() => Array(n).fill(0));

    steps.push({
      id: 'init',
      description: 'Initialize DP table',
      highlightedLines: [2, 5],
      visualState: { dimensions, m: m.map(row => [...row]) }
    });

    // cost is zero when multiplying one matrix.
    for (let i = 1; i < n; i++) {
      m[i][i] = 0;
    }

    steps.push({
      id: 'init-diagonal',
      description: 'Initialize diagonal of DP table to 0',
      highlightedLines: [8, 11],
      visualState: { dimensions, m: m.map(row => [...row]) }
    });

    // L is chain length.  Chain of length 1 is already minimized in the above loop.
    for (let L = 2; L < n; L++) {
      for (let i = 1; i < n - L + 1; i++) {
        const j = i + L - 1;
        m[i][j] = Infinity;
        steps.push({
          id: `chain-${i}-${j}`,
          description: `Calculating cost for chain from matrix ${i} to ${j}`,
          highlightedLines: [14, 16],
          visualState: { dimensions, m: m.map(row => [...row]), current: [i, j] }
        });
        for (let k = i; k <= j - 1; k++) {
          // q = cost/scalar multiplications
          const q = m[i][k] + m[k + 1][j] + dimensions[i - 1] * dimensions[k] * dimensions[j];
          steps.push({
            id: `split-${i}-${j}-${k}`,
            description: `Trying split at matrix ${k}. Cost = ${m[i][k]} + ${m[k + 1][j]} + ${dimensions[i - 1]} * ${dimensions[k]} * ${dimensions[j]} = ${q}`,
            highlightedLines: [18, 20],
            visualState: { dimensions, m: m.map(row => [...row]), current: [i, j], split: k }
          });
          if (q < m[i][j]) {
            m[i][j] = q;
            steps.push({
              id: `update-${i}-${j}-${k}`,
              description: `Found lower cost at split ${k}. Updating m[${i}][${j}] to ${q}`,
              highlightedLines: [21, 22],
              visualState: { dimensions, m: m.map(row => [...row]), current: [i, j] }
            });
          }
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `Minimum number of scalar multiplications is ${m[1][n - 1]}`,
      highlightedLines: [27],
      visualState: { dimensions, m: m.map(row => [...row]) }
    });

    return steps;
  },
  defaultInput: { dimensions: [40, 20, 30, 10, 30] }
};

// Coin Change Problem (Minimum Coins)
export const coinChangeMinimumCoins: Algorithm = {
  id: 'coin-change-minimum-coins',
  name: 'Coin Change (Minimum Coins)',
  type: 'dynamic-programming',
  description: 'Find the minimum number of coins that make a given value.',
  timeComplexity: 'O(amount * coins.length)',
  spaceComplexity: 'O(amount)',
  code: `function coinChange(coins, amount) {
  // Initialize DP array with Infinity, dp[i] represents the minimum number of coins needed to make amount i
  const dp = Array(amount + 1).fill(Infinity);

  // Base case: 0 coins needed to make amount 0
  dp[0] = 0;

  // Compute minimum coins needed for each amount from 1 to amount
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  // If dp[amount] is still Infinity, it means no solution was found
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
  explanation: `<p>Given a set of coin denominations and a target amount, find the minimum number of coins needed to make up that amount.</p>
  <p>This algorithm uses dynamic programming to solve the coin change problem. The key idea is to build an array where each element dp[i] represents the minimum number of coins needed to make up the amount i.</p>
  <p>The algorithm fills the array in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>Initialize the array with Infinity, except for dp[0] which is 0 (no coins needed to make amount 0).</li>
    <li>For each amount i from 1 to the target amount, iterate through each coin denomination.</li>
    <li>If the coin denomination is less than or equal to the current amount, update dp[i] with the minimum between its current value and dp[i - coin] + 1 (using the coin).</li>
    <li>If dp[amount] is still Infinity after the iterations, it means no solution was found, and we return -1.</li>
  </ul>`,
  generateSteps: (input: { coins: number[], amount: number }) => {
    const coins = input?.coins || [1, 2, 5];
    const amount = input?.amount || 11;
    const steps: AlgorithmStep[] = [];

    // Initialize DP array
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    steps.push({
      id: 'init',
      description: 'Initialize DP array with Infinity, dp[0] = 0',
      highlightedLines: [2, 5],
      visualState: { coins, amount, dp: [...dp] }
    });

    // Compute minimum coins needed for each amount from 1 to amount
    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        steps.push({
          id: `amount-${i}-coin-${coin}`,
          description: `Checking coin ${coin} for amount ${i}`,
          highlightedLines: [8],
          visualState: { coins, amount, dp: [...dp], current: i, coin }
        });
        if (i - coin >= 0) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
          steps.push({
            id: `update-${i}-coin-${coin}`,
            description: `Using coin ${coin}, dp[${i}] = min(dp[${i}], dp[${i - coin}] + 1) = ${dp[i]}`,
            highlightedLines: [9],
            visualState: { coins, amount, dp: [...dp], current: i, coin }
          });
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `Minimum number of coins needed to make amount ${amount} is ${dp[amount] === Infinity ? 'not possible' : dp[amount]}`,
      highlightedLines: [13],
      visualState: { coins, amount, dp: [...dp] }
    });

    return steps;
  },
  defaultInput: { coins: [1, 2, 5], amount: 11 }
};

// Rod Cutting Problem
export const rodCuttingProblem: Algorithm = {
  id: 'rod-cutting-problem',
  name: 'Rod Cutting Problem',
  type: 'dynamic-programming',
  description: 'Determine the maximum obtainable value by cutting up a rod and selling the pieces.',
  timeComplexity: 'O(n^2)',
  spaceComplexity: 'O(n)',
  code: `function rodCutting(prices, n) {
  // dp[i] will store the maximum value that can be obtained for a rod of length i
  const dp = Array(n + 1).fill(0);

  // Build the dp[] table in bottom up manner
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] = Math.max(dp[i], prices[j - 1] + dp[i - j]);
    }
  }

  return dp[n];
}`,
  explanation: `<p>Given a rod of length n and a table of prices p_i for i = 1, 2, ..., n, determine the maximum revenue obtainable by cutting up the rod and selling the pieces.</p>
  <p>This algorithm uses dynamic programming to solve the rod cutting problem. The key idea is to build an array where each element dp[i] represents the maximum value that can be obtained for a rod of length i.</p>
  <p>The algorithm fills the array in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>Initialize the array with 0.</li>
    <li>For each length i from 1 to n, iterate through each possible cut length j from 1 to i.</li>
    <li>Update dp[i] with the maximum between its current value and prices[j - 1] + dp[i - j] (selling a piece of length j and the remaining rod of length i - j).</li>
  </ul>`,
  generateSteps: (input: { prices: number[], length: number }) => {
    const prices = input?.prices || [1, 5, 8, 9, 10, 17, 17, 20];
    const n = input?.length || prices.length;
    const steps: AlgorithmStep[] = [];

    // Initialize DP array
    const dp = Array(n + 1).fill(0);

    steps.push({
      id: 'init',
      description: 'Initialize DP array with 0',
      highlightedLines: [2, 3],
      visualState: { prices, length: n, dp: [...dp] }
    });

    // Build DP table
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= i; j++) {
        steps.push({
          id: `length-${i}-cut-${j}`,
          description: `Checking cut of length ${j} for rod of length ${i}`,
          highlightedLines: [6],
          visualState: { prices, length: n, dp: [...dp], current: i, cut: j }
        });
        dp[i] = Math.max(dp[i], prices[j - 1] + dp[i - j]);
        steps.push({
          id: `update-${i}-cut-${j}`,
          description: `Cutting rod of length ${j}, dp[${i}] = max(dp[${i}], prices[${j - 1}] + dp[${i - j}]) = ${dp[i]}`,
          highlightedLines: [7],
          visualState: { prices, length: n, dp: [...dp], current: i, cut: j }
        });
      }
    }

    steps.push({
      id: 'complete',
      description: `Maximum value that can be obtained for a rod of length ${n} is ${dp[n]}`,
      highlightedLines: [11],
      visualState: { prices, length: n, dp: [...dp] }
    });

    return steps;
  },
  defaultInput: { prices: [1, 5, 8, 9, 10, 17, 17, 20], length: 8 }
};

// Word Break Problem
export const wordBreakProblem: Algorithm = {
  id: 'word-break-problem',
  name: 'Word Break Problem',
  type: 'dynamic-programming',
  description: 'Determine if a string can be segmented into a space-separated sequence of one or more dictionary words.',
  timeComplexity: 'O(n^3)',
  spaceComplexity: 'O(n)',
  code: `function wordBreak(s, wordDict) {
  const n = s.length;
  const dp = Array(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}`,
  explanation: `<p>The word break problem asks whether a given string can be segmented into a space-separated sequence of one or more dictionary words.</p>
  <p>This algorithm uses dynamic programming to solve the problem. The key idea is to build an array dp where dp[i] is true if the substring s[0...i-1] can be segmented into dictionary words.</p>
  <p>The algorithm fills the array in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>Initialize dp[0] as true, representing an empty string which is always valid.</li>
    <li>For each position i in the string, check all previous positions j. If dp[j] is true and the substring s[j...i-1] is in the dictionary, then dp[i] is true.</li>
    <li>At the end, dp[n] indicates whether the entire string can be segmented.</li>
  </ul>`,
  generateSteps: (input: { s: string, wordDict: string[] }) => {
    const s = input?.s || "leetcode";
    const wordDict = input?.wordDict || ["leet", "code"];
    const n = s.length;
    const steps: AlgorithmStep[] = [];

    // Initialize DP array
    const dp = Array(n + 1).fill(false);
    dp[0] = true;

    steps.push({
      id: 'init',
      description: 'Initialize DP array with false, dp[0] = true (empty string is always valid)',
      highlightedLines: [2, 3],
      visualState: { s, wordDict, dp: [...dp] }
    });

    // Fill DP array
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        steps.push({
          id: `check-${i}-${j}`,
          description: `Checking if dp[${j}] is true and substring "${s.substring(j, i)}" is in the dictionary`,
          highlightedLines: [6, 7],
          visualState: { s, wordDict, dp: [...dp], start: j, end: i }
        });

        if (dp[j] && wordDict.includes(s.substring(j, i))) {
          dp[i] = true;
          steps.push({
            id: `update-${i}-${j}`,
            description: `Found valid segmentation: dp[${j}] is true and "${s.substring(j, i)}" is in the dictionary. Setting dp[${i}] = true`,
            highlightedLines: [8, 9],
            visualState: { s, wordDict, dp: [...dp], start: j, end: i }
          });
          break;
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `The string "${s}" ${dp[n] ? 'can' : 'cannot'} be segmented into dictionary words`,
      highlightedLines: [14],
      visualState: { s, wordDict, dp: [...dp] }
    });

    return steps;
  },
  defaultInput: { s: "leetcode", wordDict: ["leet", "code"] }
};

// Fibonacci using Dynamic Programming
export const fibonacciDP: Algorithm = {
  id: 'fibonacci-dp',
  name: 'Fibonacci (DP)',
  type: 'dynamic-programming',
  description: 'Calculate the nth Fibonacci number using dynamic programming.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `function fibonacci(n) {
  // Create an array to store Fibonacci numbers
  const f = Array(n + 1).fill(0);
  
  // Base cases
  f[0] = 0;
  f[1] = 1;
  
  // Fill the array in bottom-up manner
  for (let i = 2; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  
  return f[n];
}`,
  explanation: `<p>The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.</p>
  <p>This algorithm uses dynamic programming to efficiently compute the nth Fibonacci number. The key idea is to build an array where each element f[i] represents the ith Fibonacci number.</p>
  <p>The algorithm fills the array in a bottom-up manner, using the following rules:</p>
  <ul>
    <li>Initialize f[0] = 0 and f[1] = 1 (base cases).</li>
    <li>For each i from 2 to n, calculate f[i] = f[i-1] + f[i-2].</li>
    <li>Return f[n] as the nth Fibonacci number.</li>
  </ul>`,
  generateSteps: (input: { n: number }) => {
    const n = input?.n || 10;
    const steps: AlgorithmStep[] = [];

    // Initialize DP array
    const f = Array(n + 1).fill(0);
    f[0] = 0;
    f[1] = 1;

    steps.push({
      id: 'init',
      description: 'Initialize DP array with base cases: f[0] = 0, f[1] = 1',
      highlightedLines: [2, 5, 6],
      visualState: { n, f: [...f] }
    });

    // Fill DP array
    for (let i = 2; i <= n; i++) {
      steps.push({
        id: `before-${i}`,
        description: `Computing f[${i}] = f[${i-1}] + f[${i-2}] = ${f[i-1]} + ${f[i-2]}`,
        highlightedLines: [9],
        visualState: { n, f: [...f], current: i }
      });

      f[i] = f[i - 1] + f[i - 2];

      steps.push({
        id: `after-${i}`,
        description: `Computed f[${i}] = ${f[i]}`,
        highlightedLines: [9],
        visualState: { n, f: [...f], current: i }
      });
    }

    steps.push({
      id: 'complete',
      description: `The ${n}th Fibonacci number is ${f[n]}`,
      highlightedLines: [12],
      visualState: { n, f: [...f] }
    });

    return steps;
  },
  defaultInput: { n: 10 }
};
