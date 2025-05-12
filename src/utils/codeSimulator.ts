import { toast } from 'sonner';

// This is a placeholder function to simulate executing custom code
// In a real implementation, you would use a more sophisticated approach like WebAssembly or a backend service
export const simulateCustomCodeExecution = (code: string, language: string) => {
  const steps: any[] = [];
  let output = '';
  
  // Very basic code analysis to generate visualization steps
  const lowerCode = code.toLowerCase();
  const keywords = {
    sorting: ['sort', 'swap', 'bubble', 'merge', 'quick', 'heap', 'insertion', 'selection'],
    searching: ['search', 'find', 'binary', 'linear', 'locate'],
    tree: ['tree', 'node', 'leaf', 'root', 'inorder', 'preorder', 'postorder', 'bst', 'bfs', 'dfs'],
    dp: ['dynamic', 'memoization', 'tabulation', 'fibonacci', 'knapsack', 'lcs']
  };
  
  // Create a sample array for visualization
  const sampleArray = Array.from({ length: 8 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  
  // Determine the type of algorithm from the code
  const algorithmType = Object.entries(keywords).find(([type, words]) => {
    return words.some(word => lowerCode.includes(word));
  })?.[0] || 'unknown';
  
  try {
    // Generate steps based on the detected algorithm type
    switch (algorithmType) {
      case 'sorting':
        steps.push(...generateSortingSteps(sampleArray));
        output = `Sorted array: ${[...sampleArray].sort((a, b) => a - b).join(', ')}`;
        break;
        
      case 'searching':
        const searchTarget = sampleArray[Math.floor(Math.random() * sampleArray.length)];
        steps.push(...generateSearchingSteps(sampleArray, searchTarget));
        output = `Found ${searchTarget} in the array`;
        break;
        
      case 'tree':
        steps.push(...generateTreeSteps());
        output = 'Tree operations completed';
        break;
        
      case 'dp':
        if (lowerCode.includes('fibonacci')) {
          steps.push(...generateDPSteps('fibonacci'));
        } else if (lowerCode.includes('knapsack')) {
          steps.push(...generateDPSteps('knapsack'));
        } else if (lowerCode.includes('lcs') || lowerCode.includes('subsequence')) {
          steps.push(...generateDPSteps('lcs'));
        } else {
          steps.push(...generateDPSteps());
        }
        output = 'Dynamic programming algorithm executed';
        break;
        
      default:
        // Generate generic steps for unknown algorithm types
        for (let i = 0; i < 3; i++) {
          steps.push({
            id: `step-${i+1}`,
            description: `Step ${i+1} of algorithm execution`,
            visualState: {
              array: sampleArray,
              current: i,
              variables: { i },
              highlighted: [i]
            }
          });
        }
        output = 'Algorithm executed';
    }
  } catch (error) {
    console.error('Error simulating code execution:', error);
    toast.error('Error analyzing algorithm. Using generic visualization.');
    
    // Fallback to basic steps
    steps.push({
      id: 'step-1',
      description: 'Algorithm execution',
      visualState: { array: sampleArray }
    });
    output = 'Algorithm executed with errors';
  }
  
  // Add language-specific examples for C++, Java, and Python
  if (language === 'cpp' && steps.length <= 1) {
    // C++ specific example (binary search)
    const sortedArray = [...sampleArray].sort((a, b) => a - b);
    const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
    steps.push(...generateBinarySearchSteps(sortedArray, target));
    output = `C++ Binary Search for ${target}: Found at index ${sortedArray.indexOf(target)}`;
  }
  else if (language === 'java' && steps.length <= 1) {
    // Java specific example (quick sort)
    steps.push(...generateQuickSortSteps([...sampleArray]));
    output = `Java QuickSort: ${[...sampleArray].sort((a, b) => a - b).join(', ')}`;
  }
  else if (language === 'py' && steps.length <= 1) {
    // Python specific example (merge sort)
    steps.push(...generateMergeSortSteps([...sampleArray]));
    output = `Python MergeSort: ${[...sampleArray].sort((a, b) => a - b).join(', ')}`;
  }
  
  return { steps, output };
};

// Helper functions to generate visualization steps

function generateSortingSteps(array: number[]) {
  const steps: any[] = [];
  const arrayCopy = [...array];
  
  // Initialize
  steps.push({
    id: 'step-1',
    description: 'Initial array before sorting',
    visualState: {
      array: [...arrayCopy],
      current: null,
      comparing: [],
      swapping: [],
      sorted: []
    }
  });
  
  // Simulate bubble sort steps
  for (let i = 0; i < arrayCopy.length; i++) {
    for (let j = 0; j < arrayCopy.length - i - 1; j++) {
      // Comparing step
      steps.push({
        id: `step-comparing-${i}-${j}`,
        description: `Comparing elements at indices ${j} and ${j+1}`,
        visualState: {
          array: [...arrayCopy],
          current: j,
          comparing: [j, j+1],
          sorted: Array.from({ length: i }, (_, index) => arrayCopy.length - 1 - index)
        }
      });
      
      // Swap if needed
      if (arrayCopy[j] > arrayCopy[j+1]) {
        [arrayCopy[j], arrayCopy[j+1]] = [arrayCopy[j+1], arrayCopy[j]];
        
        steps.push({
          id: `step-swapping-${i}-${j}`,
          description: `Swapping elements at indices ${j} and ${j+1}`,
          visualState: {
            array: [...arrayCopy],
            current: j,
            swapping: [j, j+1],
            sorted: Array.from({ length: i }, (_, index) => arrayCopy.length - 1 - index)
          }
        });
      }
    }
  }
  
  // Final sorted array
  steps.push({
    id: 'step-final',
    description: 'Final sorted array',
    visualState: {
      array: arrayCopy,
      current: null,
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arrayCopy.length }, (_, i) => i)
    }
  });
  
  return steps;
}

function generateSearchingSteps(array: number[], target: number) {
  const steps: any[] = [];
  const arrayCopy = [...array].sort((a, b) => a - b); // Binary search requires sorted array
  
  // Add the target to the array if it's not there
  if (!arrayCopy.includes(target)) {
    arrayCopy[Math.floor(Math.random() * arrayCopy.length)] = target;
    arrayCopy.sort((a, b) => a - b);
  }
  
  // Initial state
  steps.push({
    id: 'step-1',
    description: `Starting binary search for target value ${target}`,
    visualState: {
      array: arrayCopy,
      target: target,
      checked: []
    }
  });
  
  let left = 0;
  let right = arrayCopy.length - 1;
  let found = false;
  const checked: number[] = [];
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    checked.push(mid);
    
    steps.push({
      id: `step-${steps.length+1}`,
      description: `Checking middle element at index ${mid} with value ${arrayCopy[mid]}`,
      visualState: {
        array: arrayCopy,
        target: target,
        current: mid,
        left: left,
        right: right,
        checked: [...checked]
      }
    });
    
    if (arrayCopy[mid] === target) {
      steps.push({
        id: `step-${steps.length+1}`,
        description: `Found target ${target} at index ${mid}`,
        visualState: {
          array: arrayCopy,
          target: target,
          current: mid,
          left: left,
          right: right,
          found: true,
          checked: [...checked]
        }
      });
      found = true;
      break;
    } else if (arrayCopy[mid] < target) {
      left = mid + 1;
      steps.push({
        id: `step-${steps.length+1}`,
        description: `Target ${target} is greater than middle element ${arrayCopy[mid]}, search in right half`,
        visualState: {
          array: arrayCopy,
          target: target,
          current: null,
          left: left,
          right: right,
          checked: [...checked]
        }
      });
    } else {
      right = mid - 1;
      steps.push({
        id: `step-${steps.length+1}`,
        description: `Target ${target} is less than middle element ${arrayCopy[mid]}, search in left half`,
        visualState: {
          array: arrayCopy,
          target: target,
          current: null,
          left: left,
          right: right,
          checked: [...checked]
        }
      });
    }
  }
  
  if (!found) {
    steps.push({
      id: `step-${steps.length+1}`,
      description: `Target ${target} not found in the array`,
      visualState: {
        array: arrayCopy,
        target: target,
        current: null,
        found: false,
        checked: [...checked]
      }
    });
  }
  
  return steps;
}

function generateTreeSteps() {
  // Sample tree visualization steps
  return [
    {
      id: 'step-1',
      description: 'Initial binary search tree',
      visualState: {
        tree: {
          value: 50,
          left: { value: 30, left: { value: 20 }, right: { value: 40 } },
          right: { value: 70, left: { value: 60 }, right: { value: 80 } }
        },
        current: null
      }
    },
    {
      id: 'step-2',
      description: 'Searching tree node with value 40',
      visualState: {
        tree: {
          value: 50,
          left: { value: 30, left: { value: 20 }, right: { value: 40 } },
          right: { value: 70, left: { value: 60 }, right: { value: 80 } }
        },
        current: 50
      }
    },
    {
      id: 'step-3',
      description: 'Traversing to left subtree',
      visualState: {
        tree: {
          value: 50,
          left: { value: 30, left: { value: 20 }, right: { value: 40 } },
          right: { value: 70, left: { value: 60 }, right: { value: 80 } }
        },
        current: 30,
        path: [50]
      }
    },
    {
      id: 'step-4',
      description: 'Found node with value 40',
      visualState: {
        tree: {
          value: 50,
          left: { value: 30, left: { value: 20 }, right: { value: 40 } },
          right: { value: 70, left: { value: 60 }, right: { value: 80 } }
        },
        current: 40,
        path: [50, 30],
        found: true
      }
    }
  ];
}

// Update the generateDPSteps function to handle different algorithm types
function generateDPSteps(algorithm = 'fibonacci') {
  // Sample dynamic programming visualization steps
  switch (algorithm) {
    case 'fibonacci':
      return [
        {
          id: 'step-1',
          description: 'Initializing Fibonacci calculation with base cases',
          visualState: {
            table: [1, 1],
            current: 1,
            array: [1, 1]
          }
        },
        {
          id: 'step-2',
          description: 'Computing F(2) = F(1) + F(0)',
          visualState: {
            table: [1, 1, 2],
            current: 2,
            comparing: [0, 1],
            array: [1, 1, 2]
          }
        },
        {
          id: 'step-3',
          description: 'Computing F(3) = F(2) + F(1)',
          visualState: {
            table: [1, 1, 2, 3],
            current: 3,
            comparing: [1, 2],
            array: [1, 1, 2, 3]
          }
        },
        {
          id: 'step-4',
          description: 'Computing F(4) = F(3) + F(2)',
          visualState: {
            table: [1, 1, 2, 3, 5],
            current: 4,
            comparing: [2, 3],
            array: [1, 1, 2, 3, 5]
          }
        },
        {
          id: 'step-5',
          description: 'Final Fibonacci sequence up to F(4)',
          visualState: {
            table: [1, 1, 2, 3, 5],
            current: null,
            array: [1, 1, 2, 3, 5]
          }
        }
      ];
    
    case 'knapsack':
      return [
        {
          id: 'step-1',
          description: 'Initializing Knapsack DP table',
          visualState: {
            table: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
            capacity: 4,
            weights: [1, 2, 3],
            values: [10, 15, 40]
          }
        },
        {
          id: 'step-2',
          description: 'Processing item 1 (value=10, weight=1)',
          visualState: {
            table: [[0, 0, 0, 0, 0], [0, 10, 10, 10, 10], [0, 0, 0, 0, 0]],
            currentItem: 1,
            capacity: 4,
            weights: [1, 2, 3],
            values: [10, 15, 40]
          }
        },
        {
          id: 'step-3',
          description: 'Processing item 2 (value=15, weight=2)',
          visualState: {
            table: [[0, 0, 0, 0, 0], [0, 10, 10, 10, 10], [0, 10, 15, 25, 25]],
            currentItem: 2,
            capacity: 4,
            weights: [1, 2, 3],
            values: [10, 15, 40]
          }
        },
        {
          id: 'step-4',
          description: 'Final Knapsack table with optimal value 25',
          visualState: {
            table: [[0, 0, 0, 0, 0], [0, 10, 10, 10, 10], [0, 10, 15, 25, 25]],
            capacity: 4,
            weights: [1, 2, 3],
            values: [10, 15, 40],
            maxValue: 25
          }
        }
      ];
      
    case 'lcs':
      return [
        {
          id: 'step-1',
          description: 'Initializing LCS calculation',
          visualState: {
            table: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            stringA: "ABC",
            stringB: "AC"
          }
        },
        {
          id: 'step-2',
          description: 'Comparing A[0]=A with B[0]=A',
          visualState: {
            table: [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
            stringA: "ABC",
            stringB: "AC",
            currentA: 0,
            currentB: 0,
            comparing: ["A", "A"]
          }
        },
        {
          id: 'step-3',
          description: 'Comparing A[1]=B with B[0]=A (no match)',
          visualState: {
            table: [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
            stringA: "ABC",
            stringB: "AC",
            currentA: 1,
            currentB: 0,
            comparing: ["B", "A"]
          }
        },
        {
          id: 'step-4',
          description: 'Final LCS table with result 2',
          visualState: {
            table: [[0, 0, 0, 0], [0, 1, 0, 1], [0, 1, 0, 1], [0, 1, 0, 2]],
            stringA: "ABC",
            stringB: "AC",
            lcsLength: 2,
            lcs: "AC"
          }
        }
      ];

    default:
      return [
        {
          id: 'step-1',
          description: 'Initializing dynamic programming calculation',
          visualState: {
            table: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            current: [0, 0]
          }
        },
        {
          id: 'step-2',
          description: 'Filling in the DP table',
          visualState: {
            table: [[0, 1, 1], [1, 1, 2], [1, 2, 3]],
            current: [1, 1]
          }
        },
        {
          id: 'step-3',
          description: 'Dynamic programming calculation complete',
          visualState: {
            table: [[0, 1, 1], [1, 1, 2], [1, 2, 3]],
            current: null,
            result: 3
          }
        }
      ];
  }
}

// Additional algorithm visualizations for different languages

function generateBinarySearchSteps(array: number[], target: number) {
  // Similar to generateSearchingSteps but with C++ specific descriptions
  const steps = generateSearchingSteps(array, target);
  
  // Update descriptions to reference C++
  for (let i = 0; i < steps.length; i++) {
    steps[i].description = `C++ Binary Search: ${steps[i].description}`;
  }
  
  return steps;
}

function generateQuickSortSteps(array: number[]) {
  const steps: any[] = [];
  const arrayCopy = [...array];
  
  // Initial
  steps.push({
    id: 'step-1',
    description: 'Java QuickSort: Initial array',
    visualState: {
      array: [...arrayCopy],
      current: null,
      comparing: [],
      swapping: [],
      sorted: []
    }
  });
  
  // Choosing pivot
  const pivotIndex = arrayCopy.length - 1;
  const pivot = arrayCopy[pivotIndex];
  
  steps.push({
    id: 'step-2',
    description: `Java QuickSort: Selecting pivot element ${pivot} at index ${pivotIndex}`,
    visualState: {
      array: [...arrayCopy],
      current: pivotIndex,
      highlighted: [pivotIndex]
    }
  });
  
  // Partition steps
  let i = -1;
  for (let j = 0; j < arrayCopy.length - 1; j++) {
    steps.push({
      id: `step-3-${j}`,
      description: `Java QuickSort: Comparing element ${arrayCopy[j]} with pivot ${pivot}`,
      visualState: {
        array: [...arrayCopy],
        current: j,
        comparing: [j, pivotIndex],
        highlighted: [pivotIndex]
      }
    });
    
    if (arrayCopy[j] <= pivot) {
      i++;
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
      
      if (i !== j) {
        steps.push({
          id: `step-4-${j}`,
          description: `Java QuickSort: Swapping ${arrayCopy[i]} and ${arrayCopy[j]}`,
          visualState: {
            array: [...arrayCopy],
            swapping: [i, j],
            highlighted: [pivotIndex]
          }
        });
      }
    }
  }
  
  // Move pivot to its correct position
  [arrayCopy[i+1], arrayCopy[pivotIndex]] = [arrayCopy[pivotIndex], arrayCopy[i+1]];
  
  steps.push({
    id: 'step-5',
    description: `Java QuickSort: Moving pivot to its correct position at index ${i+1}`,
    visualState: {
      array: [...arrayCopy],
      swapping: [i+1, pivotIndex],
      sorted: [i+1]
    }
  });
  
  // Final
  arrayCopy.sort((a, b) => a - b); // Simplification for visualization
  steps.push({
    id: 'step-final',
    description: 'Java QuickSort: Final sorted array',
    visualState: {
      array: arrayCopy,
      sorted: Array.from({ length: arrayCopy.length }, (_, i) => i)
    }
  });
  
  return steps;
}

function generateMergeSortSteps(array: number[]) {
  const steps: any[] = [];
  const arrayCopy = [...array];
  
  // Initial
  steps.push({
    id: 'step-1',
    description: 'Python MergeSort: Initial array',
    visualState: {
      array: [...arrayCopy],
      comparing: [],
      sorted: []
    }
  });
  
  // Splitting array
  const mid = Math.floor(arrayCopy.length / 2);
  const left = arrayCopy.slice(0, mid);
  const right = arrayCopy.slice(mid);
  
  steps.push({
    id: 'step-2',
    description: `Python MergeSort: Splitting array into two subarrays`,
    visualState: {
      array: [...arrayCopy],
      comparing: [],
      highlighted: Array.from({ length: mid }, (_, i) => i)
    }
  });
  
  steps.push({
    id: 'step-3',
    description: `Python MergeSort: Left subarray: [${left.join(', ')}], Right subarray: [${right.join(', ')}]`,
    visualState: {
      array: [...arrayCopy],
      highlighted: Array.from({ length: mid }, (_, i) => i),
      comparing: Array.from({ length: arrayCopy.length - mid }, (_, i) => i + mid)
    }
  });
  
  // Merging (simplified)
  let i = 0, j = 0, k = 0;
  const result = [...arrayCopy];
  
  while (i < left.length && j < right.length) {
    steps.push({
      id: `step-4-${i}-${j}`,
      description: `Python MergeSort: Comparing ${left[i]} and ${right[j]}`,
      visualState: {
        array: [...result],
        comparing: [i, j + mid]
      }
    });
    
    if (left[i] <= right[j]) {
      result[k] = left[i];
      i++;
    } else {
      result[k] = right[j];
      j++;
    }
    k++;
  }
  
  // Final sorted array (for simplicity)
  const sorted = [...arrayCopy].sort((a, b) => a - b);
  
  steps.push({
    id: 'step-final',
    description: 'Python MergeSort: Final sorted array',
    visualState: {
      array: sorted,
      sorted: Array.from({ length: sorted.length }, (_, i) => i)
    }
  });
  
  return steps;
}
