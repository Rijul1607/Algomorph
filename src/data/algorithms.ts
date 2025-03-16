
import { Algorithm } from '@/types/algorithm';

// Bubble Sort
const bubbleSort: Algorithm = {
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
    const steps = [];
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

// Binary Search
const binarySearch: Algorithm = {
  id: 'binary-search',
  name: 'Binary Search',
  type: 'searching',
  description: 'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Check if target is present at mid
    if (arr[mid] === target) {
      return mid;
    }
    
    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    } 
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }
  
  // Target not found
  return -1;
}`,
  explanation: `<p>Binary search is an efficient algorithm for finding an item from a sorted list. It works by repeatedly dividing the search interval in half.</p>
  <p>Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating until the target value is found. If the search ends with the remaining half being empty, the target is not in the array.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Much faster than linear search for large datasets</li>
    <li>Requires the data to be sorted first</li>
    <li>Divide and conquer approach</li>
  </ul>`,
  generateSteps: (input: { array: number[], target: number }) => {
    const { array, target } = input;
    const steps = [];
    let left = 0;
    let right = array.length - 1;
    
    steps.push({
      id: 'init',
      description: `Start binary search for target ${target} in the sorted array`,
      highlightedLines: [1, 2, 3],
      visualState: { ...input, left, right }
    });
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        id: `calculate-mid-${mid}`,
        description: `Calculate midpoint: (${left} + ${right}) / 2 = ${mid}`,
        highlightedLines: [6],
        visualState: { ...input, left, right, current: mid }
      });
      
      steps.push({
        id: `compare-mid-${mid}`,
        description: `Compare midpoint value (${array[mid]}) with target (${target})`,
        highlightedLines: [9],
        visualState: { ...input, left, right, current: mid }
      });
      
      if (array[mid] === target) {
        steps.push({
          id: `found-${mid}`,
          description: `Target ${target} found at index ${mid}!`,
          highlightedLines: [10],
          visualState: { ...input, left, right, current: mid, found: true }
        });
        return steps;
      }
      
      if (array[mid] < target) {
        steps.push({
          id: `go-right-${mid}`,
          description: `${array[mid]} < ${target}, so target must be in the right half`,
          highlightedLines: [14, 15],
          visualState: { ...input, left, right, current: mid }
        });
        left = mid + 1;
        steps.push({
          id: `update-left-${left}`,
          description: `Update left boundary to ${left}`,
          highlightedLines: [15],
          visualState: { ...input, left, right }
        });
      } else {
        steps.push({
          id: `go-left-${mid}`,
          description: `${array[mid]} > ${target}, so target must be in the left half`,
          highlightedLines: [18, 19],
          visualState: { ...input, left, right, current: mid }
        });
        right = mid - 1;
        steps.push({
          id: `update-right-${right}`,
          description: `Update right boundary to ${right}`,
          highlightedLines: [19],
          visualState: { ...input, left, right }
        });
      }
    }
    
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array`,
      highlightedLines: [24],
      visualState: { ...input, left, right, found: false }
    });
    
    return steps;
  },
  defaultInput: { 
    array: [10, 20, 30, 40, 50, 60, 70, 80, 90], 
    target: 60 
  }
};

// Quick Sort
const quickSort: Algorithm = {
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

// Linear Search
const linearSearch: Algorithm = {
  id: 'linear-search',
  name: 'Linear Search',
  type: 'searching',
  description: 'A simple search algorithm that checks each element in the list sequentially until the target element is found or the list ends.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // Check if current element is target
    if (arr[i] === target) {
      return i;
    }
  }
  // Target not found
  return -1;
}`,
  explanation: `<p>Linear search is the simplest search algorithm. It works by checking each element of the list one by one, sequentially, until a match is found or the whole list has been searched.</p>
  <p>While linear search is not efficient for large lists compared to other algorithms like binary search, it has the advantage of working on unsorted lists and being very simple to implement.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Simple to understand and implement</li>
    <li>Works on unsorted data</li>
    <li>Inefficient for large datasets</li>
    <li>O(n) time complexity in the worst case</li>
  </ul>`,
  generateSteps: (input: { array: number[], target: number }) => {
    const { array, target } = input;
    const steps = [];
    
    steps.push({
      id: 'init',
      description: `Start linear search for target ${target} in the array`,
      highlightedLines: [1],
      visualState: { ...input }
    });
    
    for (let i = 0; i < array.length; i++) {
      steps.push({
        id: `check-${i}`,
        description: `Check if element at index ${i} (${array[i]}) equals target ${target}`,
        highlightedLines: [3, 4],
        visualState: { ...input, current: i }
      });
      
      if (array[i] === target) {
        steps.push({
          id: `found-${i}`,
          description: `Target ${target} found at index ${i}!`,
          highlightedLines: [4, 5],
          visualState: { ...input, current: i, found: true }
        });
        return steps;
      }
      
      steps.push({
        id: `not-match-${i}`,
        description: `Element ${array[i]} doesn't match target ${target}, continue searching`,
        highlightedLines: [2],
        visualState: { ...input, current: i }
      });
    }
    
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array after checking all elements`,
      highlightedLines: [8],
      visualState: { ...input, found: false }
    });
    
    return steps;
  },
  defaultInput: { 
    array: [24, 45, 65, 12, 78, 32, 98, 14, 54], 
    target: 78 
  }
};

export const algorithmData: Algorithm[] = [
  bubbleSort,
  quickSort,
  linearSearch,
  binarySearch
];
