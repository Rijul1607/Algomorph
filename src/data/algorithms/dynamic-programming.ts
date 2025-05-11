
import { Algorithm } from '@/types/algorithm';

// Define individual algorithms
export const fibonacciDP: Algorithm = {
  id: 'fibonacci',
  name: 'Fibonacci Sequence',
  type: 'dynamic-programming',
  description: 'Compute the nth Fibonacci number using dynamic programming.',
  explanation: `
    <p>The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.</p>
    <p>Dynamic programming can efficiently compute Fibonacci numbers by storing previously computed values in an array or table, avoiding redundant calculations.</p>
    <ol>
      <li><strong>Initialization:</strong> Create an array <code>fib</code> of size <code>n+1</code> to store Fibonacci numbers. Initialize <code>fib[0] = 0</code> and <code>fib[1] = 1</code>.</li>
      <li><strong>Iteration:</strong> Iterate from <code>i = 2</code> to <code>n</code>, computing <code>fib[i] = fib[i-1] + fib[i-2]</code>.</li>
      <li><strong>Result:</strong> The nth Fibonacci number is stored in <code>fib[n]</code>.</li>
    </ol>
    <p>This approach reduces the time complexity from exponential (in the recursive approach) to linear, O(n), making it much more efficient for larger values of n.</p>
  `,
  code: `function fibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}`,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  defaultInput: [10],
  generateSteps: (input: number[]) => {
    const n = input[0];
    const steps: any[] = [];
    const fib = [0, 1];

    steps.push({
      id: 'step-0',
      description: 'Initialize the Fibonacci sequence with base cases F(0) = 0 and F(1) = 1',
      visualState: {
        table: [0, 1],
        current: [1],
        array: [0, 1]
      }
    });

    for (let i = 2; i <= n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
      steps.push({
        id: `step-${i}`,
        description: `Compute F(${i}) = F(${i - 1}) + F(${i - 2}) = ${fib[i - 1]} + ${fib[i - 2]} = ${fib[i]}`,
        visualState: {
          table: [...fib],
          current: [i],
          comparing: [i - 1, i - 2],
          array: [...fib]
        }
      });
    }

    steps.push({
      id: 'step-final',
      description: `The ${n}th Fibonacci number is ${fib[n]}`,
      visualState: {
        table: [...fib],
        current: [n],
        array: [...fib]
      }
    });

    return steps;
  }
};

export const knapsackProblem: Algorithm = {
  id: 'knapsack',
  name: '0/1 Knapsack Problem',
  type: 'dynamic-programming',
  description: 'Solve the 0/1 Knapsack problem to maximize the value of items without exceeding the knapsack capacity.',
  explanation: `
    <p>The 0/1 Knapsack problem is a classic optimization problem where you are given a set of items, each with a weight and a value, and a knapsack with a maximum weight capacity.</p>
    <p>The goal is to determine the most valuable combination of items to include in the knapsack without exceeding its capacity. Each item can either be included entirely or excluded (hence 0/1).</p>
    <ol>
      <li><strong>Initialization:</strong> Create a 2D array <code>dp</code> where <code>dp[i][w]</code> represents the maximum value that can be obtained with the first <code>i</code> items and a maximum weight of <code>w</code>.</li>
      <li><strong>Iteration:</strong> Iterate through the items and weights, filling the <code>dp</code> array based on whether including the current item increases the value without exceeding the weight capacity.</li>
      <li><strong>Result:</strong> The maximum value that can be obtained is stored in <code>dp[n][W]</code>, where <code>n</code> is the number of items and <code>W</code> is the knapsack capacity.</li>
    </ol>
    <p>Dynamic programming ensures that each subproblem (i.e., the maximum value for a given number of items and weight) is solved only once, leading to an efficient solution.</p>
  `,
  code: `function knapsack(capacity, weights, values, n) {
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
  timeComplexity: 'O(nW)',
  spaceComplexity: 'O(nW)',
  defaultInput: [10, [5, 4, 6, 3], [10, 40, 30, 50], 4],
  generateSteps: (input: number[]) => {
    const capacity = input[0];
    const weights = input.slice(1, input.length / 2);
    const values = input.slice(input.length / 2, input.length - 1);
    const n = input[input.length - 1];
    const steps: any[] = [];
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    steps.push({
      id: 'step-0',
      description: 'Initialize the DP table with all values set to 0',
      visualState: {
        table: dp.map(row => [...row]),
        capacity: capacity,
        weights: [...weights],
        values: [...values],
        n: n
      }
    });

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
          steps.push({
            id: `step-${i}-${w}`,
            description: `Item ${i}: Weight = ${weights[i - 1]}, Value = ${values[i - 1]}. Capacity = ${w}.
                          Choose max of (include item: ${values[i - 1]} + dp[${i - 1}][${w - weights[i - 1]}] = ${values[i - 1] + dp[i - 1][w - weights[i - 1]]},
                          exclude item: dp[${i - 1}][${w}] = ${dp[i - 1][w]})`,
            visualState: {
              table: dp.map(row => [...row]),
              currentItem: i,
              currentWeight: w,
              weights: [...weights],
              values: [...values],
              capacity: capacity,
              comparing: [values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]]
            }
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          steps.push({
            id: `step-${i}-${w}`,
            description: `Item ${i}: Weight = ${weights[i - 1]}, Value = ${values[i - 1]}. Capacity = ${w}.
                          Item cannot be included because weight exceeds capacity. Value remains dp[${i - 1}][${w}] = ${dp[i - 1][w]}`,
            visualState: {
              table: dp.map(row => [...row]),
              currentItem: i,
              currentWeight: w,
              weights: [...weights],
              values: [...values],
              capacity: capacity
            }
          });
        }
      }
    }

    steps.push({
      id: 'step-final',
      description: `The maximum value that can be carried in the knapsack is ${dp[n][capacity]}`,
      visualState: {
        table: dp.map(row => [...row]),
        capacity: capacity,
        weights: [...weights],
        values: [...values],
        n: n
      }
    });

    return steps;
  }
};

export const longestCommonSubsequence: Algorithm = {
  id: 'longest-common-subsequence',
  name: 'Longest Common Subsequence',
  type: 'dynamic-programming',
  description: 'Find the length of the longest common subsequence of two strings using dynamic programming.',
  explanation: `
    <p>The Longest Common Subsequence (LCS) problem is to find the length of the longest subsequence common to two sequences. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.</p>
    <p>Dynamic programming can efficiently solve the LCS problem by building a table of solutions to subproblems.</p>
    <ol>
      <li><strong>Initialization:</strong> Create a 2D array <code>dp</code> where <code>dp[i][j]</code> represents the length of the LCS of the first <code>i</code> characters of string <code>a</code> and the first <code>j</code> characters of string <code>b</code>.</li>
      <li><strong>Iteration:</strong> Iterate through the strings, filling the <code>dp</code> array based on whether the characters at the current positions match.</li>
      <li><strong>Result:</strong> The length of the LCS is stored in <code>dp[n][m]</code>, where <code>n</code> is the length of string <code>a</code> and <code>m</code> is the length of string <code>b</code>.</li>
    </ol>
    <p>Dynamic programming ensures that each subproblem is solved only once, leading to an efficient solution with a time complexity of O(mn).</p>
  `,
  code: `function longestCommonSubsequence(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
}`,
  timeComplexity: 'O(mn)',
  spaceComplexity: 'O(mn)',
  defaultInput: ['ABCDGH', 'AEDFHR'],
  generateSteps: (input: string[]) => {
    const a = input[0];
    const b = input[1];
    const n = a.length;
    const m = b.length;
    const steps: any[] = [];
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    steps.push({
      id: 'step-0',
      description: 'Initialize the DP table with all values set to 0',
      visualState: {
        table: dp.map(row => [...row]),
        stringA: a,
        stringB: b,
        n: n,
        m: m
      }
    });

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          steps.push({
            id: `step-${i}-${j}`,
            description: `a[${i - 1}] = ${a[i - 1]} and b[${j - 1}] = ${b[j - 1]} match.
                          LCS length increases: dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i - 1][j - 1]} + 1 = ${dp[i][j]}`,
            visualState: {
              table: dp.map(row => [...row]),
              currentA: i,
              currentB: j,
              stringA: a,
              stringB: b,
              comparing: [a[i - 1], b[j - 1]]
            }
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          steps.push({
            id: `step-${i}-${j}`,
            description: `a[${i - 1}] = ${a[i - 1]} and b[${j - 1}] = ${b[j - 1]} do not match.
                          LCS length is max of (dp[${i - 1}][${j}] = ${dp[i - 1][j]}, dp[${i}][${j - 1}] = ${dp[i][j - 1]}) = ${dp[i][j]}`,
            visualState: {
              table: dp.map(row => [...row]),
              currentA: i,
              currentB: j,
              stringA: a,
              stringB: b,
              comparing: [a[i - 1], b[j - 1]]
            }
          });
        }
      }
    }

    steps.push({
      id: 'step-final',
      description: `The length of the longest common subsequence is ${dp[n][m]}`,
      visualState: {
        table: dp.map(row => [...row]),
        stringA: a,
        stringB: b,
        n: n,
        m: m
      }
    });

    return steps;
  }
};

export const editDistance: Algorithm = {
  id: 'edit-distance',
  name: 'Edit Distance',
  type: 'dynamic-programming',
  description: 'Compute the minimum edit distance between two strings using dynamic programming.',
  explanation: `
      <p>The Edit Distance problem is to find the minimum number of operations required to transform one string into another. Allowed operations are insertion, deletion, and substitution.</p>
      <p>Dynamic programming can efficiently solve this problem by building a table of solutions to subproblems.</p>
      <ol>
        <li><strong>Initialization:</strong> Create a 2D array <code>dp</code> where <code>dp[i][j]</code> represents the edit distance between the first <code>i</code> characters of string <code>a</code> and the first <code>j</code> characters of string <code>b</code>.</li>
        <li><strong>Iteration:</strong> Iterate through the strings, filling the <code>dp</code> array based on whether the characters at the current positions match.</li>
        <li><strong>Result:</strong> The minimum edit distance is stored in <code>dp[n][m]</code>, where <code>n</code> is the length of string <code>a</code> and <code>m</code> is the length of string <code>b</code>.</li>
      </ol>
      <p>Dynamic programming ensures that each subproblem is solved only once, leading to an efficient solution with a time complexity of O(mn).</p>
    `,
  code: `function editDistance(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

  for (let i = 0; i <= n; i++) {
      dp[i][0] = i;
  }
  for (let j = 0; j <= m; j++) {
      dp[0][j] = j;
  }

  for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
          if (a[i - 1] === b[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1];
          } else {
              dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          }
      }
  }
  return dp[n][m];
}`,
  timeComplexity: 'O(mn)',
  spaceComplexity: 'O(mn)',
  defaultInput: ['kitten', 'sitting'],
  generateSteps: (input: string[]) => {
    const a = input[0];
    const b = input[1];
    const n = a.length;
    const m = b.length;
    const steps: any[] = [];
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= n; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= m; j++) {
      dp[0][j] = j;
    }

    steps.push({
      id: 'step-init',
      description: 'Initialize the DP table with base cases',
      visualState: {
        table: dp.map(row => [...row]),
        stringA: a,
        stringB: b,
      }
    });

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push({
            id: `step-${i}-${j}`,
            description: `a[${i - 1}] = ${a[i - 1]} and b[${j - 1}] = ${b[j - 1]} match. No operation needed.
                          dp[${i}][${j}] = dp[${i - 1}][${j - 1}] = ${dp[i - 1][j - 1]}`,
            visualState: {
              table: dp.map(row => [...row]),
              currentA: i,
              currentB: j,
              stringA: a,
              stringB: b,
              comparing: [a[i - 1], b[j - 1]]
            }
          });
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          steps.push({
            id: `step-${i}-${j}`,
            description: `a[${i - 1}] = ${a[i - 1]} and b[${j - 1}] = ${b[j - 1]} do not match.
                          Minimum operation needed. dp[${i}][${j}] = 1 + min(dp[${i - 1}][${j}], dp[${i}][${j - 1}], dp[${i - 1}][${j - 1}])
                          = 1 + min(${dp[i - 1][j]}, ${dp[i][j - 1]}, ${dp[i - 1][j - 1]}) = ${dp[i][j]}`,
            visualState: {
              table: dp.map(row => [...row]),
              currentA: i,
              currentB: j,
              stringA: a,
              stringB: b,
              comparing: [a[i - 1], b[j - 1]]
            }
          });
        }
      }
    }

    steps.push({
      id: 'step-final',
      description: `The minimum edit distance is ${dp[n][m]}`,
      visualState: {
        table: dp.map(row => [...row]),
        stringA: a,
        stringB: b,
      }
    });

    return steps;
  }
};

// Export all algorithms as a collection
export const dynamicProgrammingAlgorithms: Algorithm[] = [
  fibonacciDP,
  knapsackProblem,
  longestCommonSubsequence,
  editDistance
];
