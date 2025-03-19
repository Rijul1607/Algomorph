
import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Binary Search
export const binarySearch: Algorithm = {
  id: 'binary-search',
  name: 'Binary Search',
  type: 'searching',
  description: 'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  code: `// JavaScript Implementation
function binarySearch(arr, target) {
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
}

/* C++ Implementation
#include <vector>

int binarySearch(std::vector<int> arr, int target) {
  int left = 0;
  int right = arr.size() - 1;
  
  while (left <= right) {
    int mid = left + (right - left) / 2;
    
    // Check if target is present at mid
    if (arr[mid] == target) {
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
}
*/

# Python Implementation
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Check if target is present at mid
        if arr[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        if arr[mid] < target:
            left = mid + 1
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    # Target not found
    return -1`,
  explanation: `<p>Binary search is an efficient algorithm for finding an item from a sorted list. It works by repeatedly dividing the search interval in half.</p>
  <p>Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating until the target value is found. If the search ends with the remaining half being empty, the target is not in the array.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Much faster than linear search for large datasets</li>
    <li>Requires the data to be sorted first</li>
    <li>Divide and conquer approach</li>
    <li>Time complexity of O(log n) makes it very efficient for large arrays</li>
  </ul>
  <p>Step-by-step algorithm:</p>
  <ol>
    <li>Set the left bound to the first element and right bound to the last element</li>
    <li>Find the middle element of the current interval</li>
    <li>If the target equals the middle element, return the middle index</li>
    <li>If the target is less than the middle element, search the left half by setting right to middle-1</li>
    <li>If the target is greater than the middle element, search the right half by setting left to middle+1</li>
    <li>Repeat steps 2-5 until the element is found or the interval is empty (left > right)</li>
  </ol>`,
  generateSteps: (input: { array: number[], target: number }) => {
    // Ensure input is properly defined with default values if necessary
    const array = input?.array || [10, 20, 30, 40, 50, 60, 70, 80, 90];
    const target = input?.target !== undefined ? input.target : 60;
    
    const steps: AlgorithmStep[] = [];
    let left = 0;
    let right = array.length - 1;
    
    steps.push({
      id: 'init',
      description: `Start binary search for target ${target} in the sorted array`,
      highlightedLines: [1, 2, 3],
      visualState: { array, target, left, right }
    });
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        id: `calculate-mid-${mid}`,
        description: `Calculate midpoint: (${left} + ${right}) / 2 = ${mid}`,
        highlightedLines: [6],
        visualState: { array, target, left, right, current: mid }
      });
      
      steps.push({
        id: `compare-mid-${mid}`,
        description: `Compare midpoint value (${array[mid]}) with target (${target})`,
        highlightedLines: [9],
        visualState: { array, target, left, right, current: mid }
      });
      
      if (array[mid] === target) {
        steps.push({
          id: `found-${mid}`,
          description: `Target ${target} found at index ${mid}!`,
          highlightedLines: [10],
          visualState: { array, target, left, right, current: mid, found: true }
        });
        return steps;
      }
      
      if (array[mid] < target) {
        steps.push({
          id: `go-right-${mid}`,
          description: `${array[mid]} < ${target}, so target must be in the right half`,
          highlightedLines: [14, 15],
          visualState: { array, target, left, right, current: mid }
        });
        left = mid + 1;
        steps.push({
          id: `update-left-${left}`,
          description: `Update left boundary to ${left}`,
          highlightedLines: [15],
          visualState: { array, target, left, right }
        });
      } else {
        steps.push({
          id: `go-left-${mid}`,
          description: `${array[mid]} > ${target}, so target must be in the left half`,
          highlightedLines: [18, 19],
          visualState: { array, target, left, right, current: mid }
        });
        right = mid - 1;
        steps.push({
          id: `update-right-${right}`,
          description: `Update right boundary to ${right}`,
          highlightedLines: [19],
          visualState: { array, target, left, right }
        });
      }
    }
    
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array`,
      highlightedLines: [24],
      visualState: { array, target, left, right, found: false }
    });
    
    return steps;
  },
  defaultInput: { 
    array: [10, 20, 30, 40, 50, 60, 70, 80, 90], 
    target: 60 
  }
};

// Linear Search
export const linearSearch: Algorithm = {
  id: 'linear-search',
  name: 'Linear Search',
  type: 'searching',
  description: 'A simple search algorithm that checks each element in the list sequentially until the target element is found or the list ends.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  code: `// JavaScript Implementation
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // Check if current element is target
    if (arr[i] === target) {
      return i; // Return the index where target is found
    }
  }
  // Target not found
  return -1;
}

/* C++ Implementation
#include <vector>

int linearSearch(std::vector<int> arr, int target) {
  for (int i = 0; i < arr.size(); i++) {
    // Check if current element is target
    if (arr[i] == target) {
      return i; // Return the index where target is found
    }
  }
  // Target not found
  return -1;
}
*/

# Python Implementation
def linear_search(arr, target):
    for i in range(len(arr)):
        # Check if current element is target
        if arr[i] == target:
            return i  # Return the index where target is found
    # Target not found
    return -1`,
  explanation: `<p>Linear search is the simplest search algorithm. It works by checking each element of the list one by one, sequentially, until a match is found or the whole list has been searched.</p>
  <p>While linear search is not efficient for large lists compared to other algorithms like binary search, it has the advantage of working on unsorted lists and being very simple to implement.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Simple to understand and implement</li>
    <li>Works on unsorted data</li>
    <li>Inefficient for large datasets</li>
    <li>O(n) time complexity in the worst case</li>
  </ul>
  <p>Step-by-step algorithm:</p>
  <ol>
    <li>Start from the first element of the array</li>
    <li>Compare the current element with the target value</li>
    <li>If the current element matches the target, return the current position</li>
    <li>If the current element doesn't match, move to the next element</li>
    <li>Repeat steps 2-4 until the element is found or the end of the array is reached</li>
    <li>If the end of the array is reached without finding the target, return -1 to indicate the target is not in the array</li>
  </ol>`,
  generateSteps: (input: { array: number[], target: number }) => {
    // Ensure input is properly defined with default values if necessary
    const array = input?.array || [24, 45, 65, 12, 78, 32, 98, 14, 54];
    const target = input?.target !== undefined ? input.target : 78;
    
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: `Start linear search for target ${target} in the array`,
      highlightedLines: [1, 2],
      visualState: { array, target }
    });
    
    for (let i = 0; i < array.length; i++) {
      steps.push({
        id: `check-${i}`,
        description: `Check if element at index ${i} (${array[i]}) equals target ${target}`,
        highlightedLines: [3, 4],
        visualState: { array, target, current: i }
      });
      
      if (array[i] === target) {
        steps.push({
          id: `found-${i}`,
          description: `Target ${target} found at index ${i}!`,
          highlightedLines: [4, 5],
          visualState: { array, target, current: i, found: true }
        });
        return steps;
      }
      
      steps.push({
        id: `not-match-${i}`,
        description: `Element ${array[i]} doesn't match target ${target}, continue searching`,
        highlightedLines: [2],
        visualState: { array, target, current: i, checked: [...Array(i+1).keys()] }
      });
    }
    
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array after checking all elements`,
      highlightedLines: [8],
      visualState: { array, target, found: false, checked: [...Array(array.length).keys()] }
    });
    
    return steps;
  },
  defaultInput: { 
    array: [24, 45, 65, 12, 78, 32, 98, 14, 54], 
    target: 78 
  }
};
