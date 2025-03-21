
import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Bubble Sort
export const bubbleSort: Algorithm = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  type: 'sorting',
  description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in the wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
  explanation: `<p>Bubble sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they're in the wrong order. The pass through the list is repeated until no swaps are needed, which means the list is sorted.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Simple to understand and implement</li>
    <li>Not suitable for large data sets</li>
    <li>In-place algorithm (requires O(1) extra space)</li>
    <li>Stable sort (does not change the relative order of equal elements)</li>
  </ul>`,
  generateSteps: (input: number[]) => {
    const arr = [...input];
    const steps: AlgorithmStep[] = [];
    const n = arr.length;
    
    steps.push({
      id: 'init',
      description: 'Start with the unsorted array',
      highlightedLines: [1],
      visualState: [...arr]
    });
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          id: `compare-${i}-${j}`,
          description: `Compare elements at positions ${j} (${arr[j]}) and ${j+1} (${arr[j+1]})`,
          highlightedLines: [5],
          visualState: { 
            array: [...arr], 
            comparing: [j, j+1],
            sorted: [...Array(i).keys()].map(x => n - 1 - x)
          }
        });
        
        if (arr[j] > arr[j + 1]) {
          steps.push({
            id: `swap-${i}-${j}`,
            description: `Swap elements because ${arr[j]} > ${arr[j+1]}`,
            highlightedLines: [7],
            visualState: { 
              array: [...arr], 
              swapping: [j, j+1],
              sorted: [...Array(i).keys()].map(x => n - 1 - x)
            }
          });
          
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          steps.push({
            id: `after-swap-${i}-${j}`,
            description: `After swapping: ${arr[j]} and ${arr[j+1]}`,
            highlightedLines: [7],
            visualState: { 
              array: [...arr], 
              comparing: [j, j+1],
              sorted: [...Array(i).keys()].map(x => n - 1 - x)
            }
          });
        }
      }
      
      steps.push({
        id: `outer-loop-${i}`,
        description: `Completed pass ${i+1}. The largest ${i+1} element${i > 0 ? 's are' : ' is'} now in the correct position${i > 0 ? 's' : ''}.`,
        highlightedLines: [3],
        visualState: { 
          array: [...arr], 
          sorted: [...Array(i+1).keys()].map(x => n - 1 - x)
        }
      });
    }
    
    steps.push({
      id: 'complete',
      description: 'Sorting complete. The array is now sorted in ascending order.',
      highlightedLines: [12],
      visualState: { 
        array: [...arr], 
        sorted: Array.from({ length: n }, (_, i) => i)
      }
    });
    
    return steps;
  },
  defaultInput: [64, 34, 25, 12, 22, 11, 90]
};

// Quick Sort
export const quickSort: Algorithm = {
  id: 'quick-sort',
  name: 'Quick Sort',
  type: 'sorting',
  description: 'An efficient divide-and-conquer sorting algorithm that works by selecting a "pivot" element and partitioning the array around the pivot.',
  timeComplexity: 'Average: O(n log n), Worst: O(n²)',
  spaceComplexity: 'O(log n)',
  code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the subarrays
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  // Choose the rightmost element as pivot
  const pivot = arr[high];
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Swap pivot to its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  return i + 1;
}`,
  explanation: `<p>Quick sort is a divide-and-conquer algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.</p>
  <p>The main steps are:</p>
  <ol>
    <li>Choose a pivot element from the array</li>
    <li>Reorder the array so that all elements less than the pivot come before it, and all elements greater than the pivot come after it (this is called the partition operation)</li>
    <li>Recursively apply the above steps to the sub-arrays</li>
  </ol>
  <p>Key characteristics:</p>
  <ul>
    <li>Often faster in practice than other O(n log n) algorithms like merge sort</li>
    <li>Not stable (may change the relative order of equal elements)</li>
    <li>In-place partitioning (requires only O(log n) additional space)</li>
  </ul>`,
  generateSteps: (input: number[]) => {
    const arr = [...input];
    const steps: AlgorithmStep[] = [];
    const sorted: number[] = [];
    
    steps.push({
      id: 'init',
      description: 'Start with the unsorted array',
      highlightedLines: [1],
      visualState: [...arr]
    });
    
    // Simplified quicksort visualization with fewer steps
    const quickSortSteps = (array: number[], low: number, high: number, depth = 0) => {
      if (low < high) {
        steps.push({
          id: `partition-start-${depth}-${low}-${high}`,
          description: `Partition the subarray from index ${low} to ${high}`,
          highlightedLines: [3],
          visualState: { 
            array: [...array], 
            comparing: [low, high]
          }
        });
        
        // Choose pivot (last element)
        const pivot = array[high];
        steps.push({
          id: `choose-pivot-${depth}-${high}`,
          description: `Choose pivot: ${pivot} (at index ${high})`,
          highlightedLines: [13],
          visualState: { 
            array: [...array], 
            comparing: [high]
          }
        });
        
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
          steps.push({
            id: `compare-${depth}-${j}`,
            description: `Compare element at index ${j} (${array[j]}) with pivot ${pivot}`,
            highlightedLines: [19],
            visualState: { 
              array: [...array], 
              comparing: [j, high]
            }
          });
          
          if (array[j] < pivot) {
            i++;
            steps.push({
              id: `swap-${depth}-${i}-${j}`,
              description: `Swap elements at indices ${i} (${array[i]}) and ${j} (${array[j]})`,
              highlightedLines: [22],
              visualState: { 
                array: [...array], 
                swapping: [i, j]
              }
            });
            
            [array[i], array[j]] = [array[j], array[i]];
            
            steps.push({
              id: `after-swap-${depth}-${i}-${j}`,
              description: `After swapping: ${array[i]} and ${array[j]}`,
              highlightedLines: [22],
              visualState: { array: [...array] }
            });
          }
        }
        
        // Move pivot to its final position
        steps.push({
          id: `place-pivot-${depth}-${i+1}-${high}`,
          description: `Place pivot (${array[high]}) at its correct position (index ${i+1})`,
          highlightedLines: [26],
          visualState: { 
            array: [...array], 
            swapping: [i+1, high]
          }
        });
        
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        
        const pivotIndex = i + 1;
        
        steps.push({
          id: `pivot-placed-${depth}-${pivotIndex}`,
          description: `Pivot ${array[pivotIndex]} is now at its correct position (index ${pivotIndex})`,
          highlightedLines: [28],
          visualState: { 
            array: [...array], 
            sorted: [...sorted, pivotIndex]
          }
        });
        
        sorted.push(pivotIndex);
        
        // Recursively sort left and right of pivot
        quickSortSteps(array, low, pivotIndex - 1, depth + 1);
        quickSortSteps(array, pivotIndex + 1, high, depth + 1);
      } else if (low === high) {
        // Single element is already sorted
        sorted.push(low);
        steps.push({
          id: `single-element-${depth}-${low}`,
          description: `Single element at index ${low} (${array[low]}) is already in the correct position`,
          highlightedLines: [2],
          visualState: { 
            array: [...array], 
            sorted: [...sorted]
          }
        });
      }
    };
    
    quickSortSteps(arr, 0, arr.length - 1);
    
    steps.push({
      id: 'complete',
      description: 'Sorting complete. The array is now sorted in ascending order.',
      highlightedLines: [9],
      visualState: { 
        array: [...arr], 
        sorted: Array.from({ length: arr.length }, (_, i) => i)
      }
    });
    
    return steps;
  },
  defaultInput: [38, 27, 43, 3, 9, 82, 10]
};

// Selection Sort
export const selectionSort: Algorithm = {
  id: 'selection-sort',
  name: 'Selection Sort',
  type: 'sorting',
  description: 'A simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion and putting it at the beginning.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  code: `// JavaScript Implementation
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the unsorted array
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the element at index i
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

/* C++ Implementation
#include <vector>

std::vector<int> selectionSort(std::vector<int> arr) {
  int n = arr.size();
  
  for (int i = 0; i < n - 1; i++) {
    // Find the minimum element in the unsorted array
    int minIndex = i;
    
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the element at index i
    if (minIndex != i) {
      std::swap(arr[i], arr[minIndex]);
    }
  }
  
  return arr;
}
*/

# Python Implementation
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        # Find the minimum element in the unsorted array
        min_index = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap the found minimum element with the element at index i
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr`,
  explanation: `<p>Selection sort is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Simple to implement</li>
    <li>Performs well on small lists</li>
    <li>Inefficient on large lists</li>
    <li>In-place algorithm with O(1) extra space</li>
    <li>Not stable (might change the relative order of equal elements)</li>
  </ul>
  <p>Step-by-step algorithm:</p>
  <ol>
    <li>Set the first position as the minimum</li>
    <li>Search the minimum element in the rest of the array</li>
    <li>Swap the minimum element with the element at the first position</li>
    <li>Increment the position and repeat steps 2-3 until the array is sorted</li>
  </ol>`,
  generateSteps: (input: number[]) => {
    const arr = [...input];
    const steps: AlgorithmStep[] = [];
    const n = arr.length;
    
    steps.push({
      id: 'init',
      description: 'Start with the unsorted array',
      highlightedLines: [1],
      visualState: [...arr]
    });
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      steps.push({
        id: `outer-loop-${i}`,
        description: `Starting pass ${i+1}: find minimum element in the unsorted portion`,
        highlightedLines: [4, 6],
        visualState: { 
          array: [...arr], 
          current: i,
          sorted: [...Array(i).keys()]
        }
      });
      
      for (let j = i + 1; j < n; j++) {
        steps.push({
          id: `compare-${i}-${j}`,
          description: `Compare current minimum (${arr[minIndex]}) with element at index ${j} (${arr[j]})`,
          highlightedLines: [8, 9],
          visualState: { 
            array: [...arr], 
            comparing: [minIndex, j],
            sorted: [...Array(i).keys()]
          }
        });
        
        if (arr[j] < arr[minIndex]) {
          steps.push({
            id: `new-min-${i}-${j}`,
            description: `Found new minimum: ${arr[j]} at index ${j}`,
            highlightedLines: [9, 10],
            visualState: { 
              array: [...arr], 
              minFound: j,
              sorted: [...Array(i).keys()]
            }
          });
          
          minIndex = j;
        }
      }
      
      if (minIndex !== i) {
        steps.push({
          id: `swap-${i}-${minIndex}`,
          description: `Swap minimum element (${arr[minIndex]}) with first unsorted element (${arr[i]})`,
          highlightedLines: [15],
          visualState: { 
            array: [...arr], 
            swapping: [i, minIndex],
            sorted: [...Array(i).keys()]
          }
        });
        
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        
        steps.push({
          id: `after-swap-${i}`,
          description: `After swap: Element ${arr[i]} is now in its correct position`,
          highlightedLines: [15],
          visualState: { 
            array: [...arr], 
            sorted: [...Array(i+1).keys()]
          }
        });
      } else {
        steps.push({
          id: `already-sorted-${i}`,
          description: `Element ${arr[i]} is already in its correct position`,
          highlightedLines: [14],
          visualState: { 
            array: [...arr], 
            sorted: [...Array(i+1).keys()]
          }
        });
      }
    }
    
    steps.push({
      id: 'complete',
      description: 'Sorting complete. The array is now sorted in ascending order.',
      highlightedLines: [20],
      visualState: { 
        array: [...arr], 
        sorted: Array.from({ length: n }, (_, i) => i)
      }
    });
    
    return steps;
  },
  defaultInput: [29, 15, 56, 8, 32, 44, 61, 19, 72]
};
