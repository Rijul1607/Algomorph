
// Export all algorithms
import { bubbleSort, quickSort, selectionSort } from './sorting';
import { linearSearch, binarySearch } from './searching';
import { 
  binaryTreeTraversal,
  binarySearchTree,
  levelOrderTraversal,
  preOrderTraversal,
  postOrderTraversal
} from './tree';
import {
  fibonacciDP,
  knapsackProblem,
  longestCommonSubsequence
} from './dynamic-programming';

export const algorithmData = [
  // Sorting algorithms
  bubbleSort,
  quickSort,
  selectionSort,
  
  // Searching algorithms
  linearSearch,
  binarySearch,
  
  // Tree algorithms
  binaryTreeTraversal,
  binarySearchTree,
  levelOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
  
  // Dynamic Programming algorithms
  fibonacciDP,
  knapsackProblem,
  longestCommonSubsequence
];
