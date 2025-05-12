import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Binary Tree Traversal
export const binaryTreeTraversal: Algorithm = {
  id: 'binary-tree-traversal',
  name: 'Binary Tree Traversal',
  type: 'tree',
  description: 'Algorithms for traversing or searching tree data structures. The traversal methods are in-order, pre-order, and post-order.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  code: `// JavaScript Implementation
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// In-order traversal: Left -> Root -> Right
function inOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node !== null) {
      // Traverse left subtree
      traverse(node.left);
      // Visit root
      result.push(node.value);
      // Traverse right subtree
      traverse(node.right);
    }
  }
  
  traverse(root);
  return result;
}

// Pre-order traversal: Root -> Left -> Right
function preOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node !== null) {
      // Visit root
      result.push(node.value);
      // Traverse left subtree
      traverse(node.left);
      // Traverse right subtree
      traverse(node.right);
    }
  }
  
  traverse(root);
  return result;
}

// Post-order traversal: Left -> Right -> Root
function postOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node !== null) {
      // Traverse left subtree
      traverse(node.left);
      // Traverse right subtree
      traverse(node.right);
      // Visit root
      result.push(node.value);
    }
  }
  
  traverse(root);
  return result;
}

// Level order traversal (Breadth-First)
function levelOrderTraversal(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}`,
  explanation: `<p>Binary tree traversal is the process of visiting each node in a tree data structure exactly once. There are several common ways to traverse a binary tree:</p>
  <ol>
    <li><strong>In-order traversal:</strong> First visit the left subtree, then the root, and finally the right subtree (Left → Root → Right).</li>
    <li><strong>Pre-order traversal:</strong> First visit the root, then the left subtree, and finally the right subtree (Root → Left → Right).</li>
    <li><strong>Post-order traversal:</strong> First visit the left subtree, then the right subtree, and finally the root (Left → Right → Root).</li>
    <li><strong>Level-order traversal:</strong> Visit nodes level by level from top to bottom and left to right (also called Breadth-First traversal).</li>
  </ol>
  <p>Applications of tree traversal:</p>
  <ul>
    <li>In-order traversal of a binary search tree gives nodes in ascending order</li>
    <li>Pre-order traversal can be used to create a copy of the tree</li>
    <li>Post-order traversal can be used to delete the tree</li>
    <li>Level-order traversal is useful for breadth-first searches in trees</li>
  </ul>`,
  generateSteps: (input: { traversalType: string }) => {
    const steps: AlgorithmStep[] = [];
    const { traversalType = 'inorder' } = input;
    
    // Create a sample binary tree for visualization
    const treeArray = [10, 5, 15, 3, 7, 12, 18];
    
    steps.push({
      id: 'init',
      description: `Starting ${traversalType} tree traversal`,
      highlightedLines: [1, 2],
      visualState: { 
        tree: treeArray,
        current: [0],
        visited: [],
        traversalType
      }
    });
    
    if (traversalType === 'inorder') {
      // In-order: Left -> Root -> Right
      const visitOrder = [3, 5, 7, 10, 12, 15, 18];
      const nodeIndices = [3, 1, 4, 0, 5, 2, 6];
      
      for (let i = 0; i < visitOrder.length; i++) {
        steps.push({
          id: `inorder-${i}`,
          description: `In-order: Visit node (${visitOrder[i]})`,
          highlightedLines: [i < visitOrder.length/2 ? 21 : 25],
          visualState: { 
            tree: treeArray,
            current: [nodeIndices[i]],
            visited: nodeIndices.slice(0, i),
            traversalType
          }
        });
      }
    } else if (traversalType === 'preorder') {
      // Pre-order: Root -> Left -> Right
      const visitOrder = [10, 5, 3, 7, 15, 12, 18];
      const nodeIndices = [0, 1, 3, 4, 2, 5, 6];
      
      for (let i = 0; i < visitOrder.length; i++) {
        steps.push({
          id: `preorder-${i}`,
          description: `Pre-order: Visit node (${visitOrder[i]})`,
          highlightedLines: [i === 0 ? 36 : (i < 4 ? 38 : 40)],
          visualState: { 
            tree: treeArray,
            current: [nodeIndices[i]],
            visited: nodeIndices.slice(0, i),
            traversalType
          }
        });
      }
    } else if (traversalType === 'postorder') {
      // Post-order: Left -> Right -> Root
      const visitOrder = [3, 7, 5, 12, 18, 15, 10];
      const nodeIndices = [3, 4, 1, 5, 6, 2, 0];
      
      for (let i = 0; i < visitOrder.length; i++) {
        steps.push({
          id: `postorder-${i}`,
          description: `Post-order: Visit node (${visitOrder[i]})`,
          highlightedLines: [i < 3 ? 55 : (i < 6 ? 57 : 59)],
          visualState: { 
            tree: treeArray,
            current: [nodeIndices[i]],
            visited: nodeIndices.slice(0, i),
            traversalType
          }
        });
      }
    } else if (traversalType === 'levelorder') {
      // Level-order: BFS
      const visitOrder = [10, 5, 15, 3, 7, 12, 18];
      const nodeIndices = [0, 1, 2, 3, 4, 5, 6];
      
      for (let i = 0; i < visitOrder.length; i++) {
        steps.push({
          id: `levelorder-${i}`,
          description: `Level-order: Visit node (${visitOrder[i]})`,
          highlightedLines: [75],
          visualState: { 
            tree: treeArray,
            current: [nodeIndices[i]],
            visited: nodeIndices.slice(0, i),
            traversalType,
            queue: nodeIndices.slice(i + 1, Math.min(i + 3, nodeIndices.length))
          }
        });
      }
    }
    
    steps.push({
      id: 'complete',
      description: `${traversalType} traversal complete`,
      highlightedLines: [traversalType === 'inorder' ? 29 : (traversalType === 'preorder' ? 44 : (traversalType === 'postorder' ? 63 : 82))],
      visualState: { 
        tree: treeArray,
        visited: traversalType === 'inorder' ? [3, 1, 4, 0, 5, 2, 6] :
                traversalType === 'preorder' ? [0, 1, 3, 4, 2, 5, 6] :
                traversalType === 'postorder' ? [3, 4, 1, 5, 6, 2, 0] : [0, 1, 2, 3, 4, 5, 6],
        complete: true,
        traversalType
      }
    });
    
    return steps;
  },
  defaultInput: { traversalType: 'inorder' }
};

// Binary Search Tree
export const binarySearchTree: Algorithm = {
  id: 'binary-search-tree',
  name: 'Binary Search Tree',
  type: 'tree',
  description: 'A binary search tree is a data structure that quickly allows us to maintain a sorted list of numbers.',
  timeComplexity: 'Average: O(log n), Worst: O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a node
  insert(data) {
    const newNode = new Node(data);
    
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    
    // Helper function to recursively insert
    const insertNode = (node, newNode) => {
      // If the data is less than the node's data,
      // move to the left side
      if (newNode.data < node.data) {
        // If there is no left, insert it
        if (node.left === null) {
          node.left = newNode;
        } else {
          // Otherwise, continue down the left
          insertNode(node.left, newNode);
        }
      } else {
        // If there is no right, insert it
        if (node.right === null) {
          node.right = newNode;
        } else {
          // Otherwise, continue down the right
          insertNode(node.right, newNode);
        }
      }
    };
    
    insertNode(this.root, newNode);
  }
  
  // Search for a node
  search(data) {
    // Helper function to find node
    const findNode = (node, data) => {
      // If trees are empty
      if (node === null) {
        return null;
      }
      
      // If data is less than node's data
      if (data < node.data) {
        return findNode(node.left, data);
      }
      
      // If data is greater than node's data
      if (data > node.data) {
        return findNode(node.right, data);
      }
      
      // If data is equal to the node data
      return node;
    };
    
    return findNode(this.root, data);
  }
}`,
  explanation: `<p>A binary search tree (BST) is a data structure that quickly allows us to maintain a sorted list of numbers. It is called a binary search tree because:</p>
  <ul>
    <li>Each node has at most two children (binary)</li>
    <li>It can be used for efficient searching (search)</li>
    <li>It is a tree data structure</li>
  </ul>
  <p>The properties that separate a binary search tree from a regular binary tree are:</p>
  <ul>
    <li>All nodes of left subtree are less than the root node</li>
    <li>All nodes of right subtree are greater than the root node</li>
    <li>Both subtrees of each node are also BSTs (i.e., they have the above two properties)</li>
  </ul>
  <p>Operations supported by a BST:</p>
  <ul>
    <li>Search: O(log n) average, O(n) worst case</li>
    <li>Insert: O(log n) average, O(n) worst case</li>
    <li>Delete: O(log n) average, O(n) worst case</li>
  </ul>
  <p>The worst case occurs when the tree is skewed (e.g., when data is inserted in sorted order).</p>`,
  generateSteps: (input: { value: number }) => {
    const { value = 17 } = input;
    const steps: AlgorithmStep[] = [];
    
    // Create a sample BST
    const tree = [15, 10, 20, 8, 12, 17, 25];
    
    steps.push({
      id: 'init',
      description: 'Starting with a binary search tree',
      highlightedLines: [1, 2],
      visualState: { 
        tree,
        searching: value
      }
    });
    
    steps.push({
      id: 'root-check',
      description: `Checking root node (${tree[0]}) against search value ${value}`,
      highlightedLines: [55, 56],
      visualState: { 
        tree,
        current: [0], // Fixed: Change from number to number[]
        searching: value
      }
    });
    
    if (value < tree[0]) {
      steps.push({
        id: 'go-left',
        description: `${value} < ${tree[0]}, so search in left subtree`,
        highlightedLines: [62, 63],
        visualState: { 
          tree,
          current: [1],
          searching: value
        }
      });
      
      if (value < tree[1]) {
        steps.push({
          id: 'go-left-again',
          description: `${value} < ${tree[1]}, so search in left-left subtree`,
          highlightedLines: [62, 63],
          visualState: { 
            tree,
            current: [3],
            searching: value
          }
        });
        
        if (value === tree[3]) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree,
              current: [3],
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree,
              current: [3],
              found: false
            }
          });
        }
      } else {
        steps.push({
          id: 'go-right-subtree',
          description: `${value} > ${tree[1]}, so search in left-right subtree`,
          highlightedLines: [67, 68],
          visualState: { 
            tree,
            current: [4],
            searching: value
          }
        });
        
        if (value === tree[4]) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree,
              current: [4],
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree,
              current: [4],
              found: false
            }
          });
        }
      }
    } else {
      steps.push({
        id: 'go-right',
        description: `${value} > ${tree[0]}, so search in right subtree`,
        highlightedLines: [67, 68],
        visualState: { 
          tree,
          current: [2],
          searching: value
        }
      });
      
      if (value < tree[2]) {
        steps.push({
          id: 'go-left-subtree',
          description: `${value} < ${tree[2]}, so search in right-left subtree`,
          highlightedLines: [62, 63],
          visualState: { 
            tree,
            current: [5],
            searching: value
          }
        });
        
        if (value === tree[5]) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree,
              current: [5],
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree,
              current: [5],
              found: false
            }
          });
        }
      } else {
        steps.push({
          id: 'go-right-again',
          description: `${value} > ${tree[2]}, so search in right-right subtree`,
          highlightedLines: [67, 68],
          visualState: { 
            tree,
            current: [6],
            searching: value
          }
        });
        
        if (value === tree[6]) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree,
              current: [6],
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree,
              current: [6],
              found: false
            }
          });
        }
      }
    }
    
    return steps;
  },
  defaultInput: { value: 17 }
};

// Level Order Traversal (BFS)
export const levelOrderTraversal: Algorithm = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  type: 'tree',
  description: 'Level Order Traversal (also known as Breadth-First Search) visits all nodes at the current depth level before moving to nodes at the next depth level.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(w) where w is the maximum width of the tree',
  code: `// JavaScript Implementation
function levelOrderTraversal(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}

// Level order traversal with levels
function levelOrderTraversalWithLevels(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.value);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}`,
  explanation: `<p>Level Order Traversal, also known as Breadth-First Search (BFS) for trees, is a tree traversal algorithm that visits all nodes at the current depth level before moving to nodes at the next depth level.</p>
  <p>Key characteristics:</p>
  <ul>
    <li>Uses a queue data structure to track nodes to visit</li>
    <li>Processes all nodes at the same level before moving to the next level</li>
    <li>Traverses the tree level by level from top to bottom</li>
    <li>Within each level, nodes are processed from left to right</li>
  </ul>
  <p>Applications of level order traversal:</p>
  <ul>
    <li>Finding the shortest path between two nodes in an unweighted graph</li>
    <li>Level-by-level processing of a tree (useful for printing a tree)</li>
    <li>Connecting nodes at the same level (e.g., connecting cousins in a tree)</li>
    <li>Finding the minimum height of a binary tree</li>
  </ul>`,
  generateSteps: (input: { withLevels: boolean }) => {
    const { withLevels = false } = input;
    const steps: AlgorithmStep[] = [];
    
    // Create a sample binary tree for visualization
    const treeArray = [10, 5, 15, 3, 7, 12, 18];
    
    steps.push({
      id: 'init',
      description: 'Starting level order traversal',
      highlightedLines: [2, 3],
      visualState: { 
        tree: treeArray,
        current: [0], // Fixed: Change from number to number[]
        visited: [],
        queue: [0]
      }
    });
    
    // Level order traversal (BFS)
    const levels = [
      [0],         // Level 0: root (10)
      [1, 2],      // Level 1: left child (5) and right child (15)
      [3, 4, 5, 6] // Level 2: children of 5 and 15
    ];
    
    let visitedSoFar: number[] = []; // Fix: Initialize as empty array
    let currentLevel = 0;
    
    for (const level of levels) {
      if (withLevels) {
        steps.push({
          id: `level-${currentLevel}`,
          description: `Processing level ${currentLevel}`,
          highlightedLines: [22, 23],
          visualState: { 
            tree: treeArray,
            current: null, // Fix: null is fine as it's already compatible
            visited: visitedSoFar,
            currentLevel: level,
            queue: level.slice(),
            levelHighlight: true
          }
        });
      }
      
      for (const nodeIdx of level) {
        const nextQueue = [...visitedSoFar, nodeIdx].filter(idx => !level.includes(idx) || level.indexOf(idx) > level.indexOf(nodeIdx));
        
        steps.push({
          id: `visit-${nodeIdx}`,
          description: `Visit node ${treeArray[nodeIdx]} and add its children to the queue`,
          highlightedLines: withLevels ? 25 : 8,
          visualState: { 
            tree: treeArray,
            current: [nodeIdx],
            visited: visitedSoFar,
            queue: nextQueue
          }
        });
        
        visitedSoFar.push(nodeIdx);
      }
      
      currentLevel++;
    }
    
    steps.push({
      id: 'complete',
      description: 'Level order traversal complete',
      highlightedLines: withLevels ? 33 : 13,
      visualState: { 
        tree: treeArray,
        visited: visitedSoFar,
        complete: true,
        queue: []
      }
    });
    
    return steps;
  },
  defaultInput: { withLevels: false }
};

// Pre-order Traversal
export const preOrderTraversal: Algorithm = {
  id: 'pre-order-traversal',
  name: 'Pre-order Traversal',
  type: 'tree',
  description: 'Pre-order traversal visits the root node first, then recursively visits the left subtree, and finally the right subtree.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  code: `// JavaScript Implementation
function preOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node !== null) {
      // Visit root
      result.push(node.value);
      // Traverse left subtree
      traverse(node.left);
      // Traverse right subtree
      traverse(node.right);
    }
  }
  
  traverse(root);
  return result;
}

// Iterative implementation using a stack
function preOrderTraversalIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);
    
    // Push right first so left is processed first (LIFO)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  
  return result;
}`,
  explanation: `<p>Pre-order traversal is a depth-first tree traversal algorithm that follows the Root-Left-Right pattern:</p>
  <ol>
    <li>Visit the current node (Root)</li>
    <li>Recursively traverse the left subtree (Left)</li>
    <li>Recursively traverse the right subtree (Right)</li>
  </ol>
  <p>Key characteristics:</p>
  <ul>
    <li>The root node is always the first node visited</li>
    <li>Can be implemented recursively or iteratively (using a stack)</li>
    <li>Useful for creating a copy of the tree or generating a prefix expression from an expression tree</li>
  </ul>
  <p>Applications of pre-order traversal:</p>
  <ul>
    <li>Creating a copy/clone of a tree</li>
    <li>Prefix (Polish) notation of an expression tree</li>
    <li>Used in serialization of a tree to string format</li>
  </ul>`,
  generateSteps: (input: { iterative: boolean }) => {
    const { iterative = false } = input;
    const steps: AlgorithmStep[] = [];
    
    // Create a sample binary tree for visualization
    const treeArray = [10, 5, 15, 3, 7, 12, 18];
    
    steps.push({
      id: 'init',
      description: `Starting pre-order traversal (${iterative ? 'iterative' : 'recursive'})`,
      highlightedLines: iterative ? [19, 20] : [2, 3],
      visualState: { 
        tree: treeArray,
        current: [0], // Fixed: Change from number to number[]
        visited: [],
        stack: iterative ? [0] : []
      }
    });
    
    if (iterative) {
      // Iterative pre-order: using a stack
      const visitOrder = [0, 1, 3, 4, 2, 5, 6]; // Node indices in visit order
      let stackState = [0]; // Start with root
      let visitedSoFar: number[] = []; // Fix: Initialize as empty array
      
      for (const nodeIdx of visitOrder) {
        steps.push({
          id: `visit-${nodeIdx}`,
          description: `Pop and visit node ${treeArray[nodeIdx]}`,
          highlightedLines: [23, 24],
          visualState: { 
            tree: treeArray,
            current: [nodeIdx],
            visited: visitedSoFar,
            stack: stackState
          }
        });
        
        visitedSoFar.push(nodeIdx);
        
        // Update stack - remove current and add children (right first, then left)
        stackState = stackState.filter(idx => idx !== nodeIdx);
        
        // Right child (if exists)
        const rightIdx = 2 * nodeIdx + 2;
        if (rightIdx < treeArray.length && treeArray[rightIdx] !== null && treeArray[rightIdx] !== undefined) {
          stackState.unshift(rightIdx); // Add to front (stack is LIFO)
        }
        
        // Left child (if exists)
        const leftIdx = 2 * nodeIdx + 1;
        if (leftIdx < treeArray.length && treeArray[leftIdx] !== null && treeArray[leftIdx] !== undefined) {
          stackState.unshift(leftIdx); // Add to front (stack is LIFO)
        }
        
        steps.push({
          id: `stack-update-${nodeIdx}`,
          description: `Update stack with children (right first, then left)`,
          highlightedLines: [27, 28],
          visualState: { 
            tree: treeArray,
            current: [], // Fix: Use empty array instead of null
            visited: visitedSoFar,
            stack: stackState
          }
        });
      }
    } else {
      // Recursive pre-order: Root -> Left -> Right
      const visitOrder = [10, 5, 3, 7, 15, 12, 18];
      const nodeIndices = [0, 1, 3, 4, 2, 5, 6];
      
      for (let i = 0; i < visitOrder.length; i++) {
        steps.push({
          id: `visit-${i}`,
          description: `Pre-order: Visit node (${visitOrder[i]})`,
          highlightedLines: [i === 0 ? 6 : (i < 4 ? 8 : 10)],
          visualState: { 
            tree: treeArray,
            current: [nodeIndices[i]],
            visited: nodeIndices.slice(0, i),
            recursionStack: nodeIndices.slice(0, i).reverse()
          }
        });
      }
    }
    
    steps.push({
      id: 'complete',
      description: 'Pre-order traversal complete',
      highlightedLines: iterative ? 31 : 14,
      visualState: { 
        tree: treeArray,
        visited: [0, 1, 3, 4, 2, 5, 6],
        complete: true,
        stack: []
      }
    });
    
    return steps;
  },
  defaultInput: { iterative: false }
};

// Post-order Traversal
export const postOrderTraversal: Algorithm = {
  id: 'post-order-traversal',
  name: 'Post-order Traversal',
  type: 'tree',
  description: 'Post-order traversal recursively visits the left subtree, then the right subtree, and finally the root node.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  code: `// JavaScript Implementation
function postOrderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node !== null) {
      // Traverse left subtree
      traverse(node.left);
      // Traverse right subtree
      traverse(node.right);
      // Visit root
      result.push(node.value);
    }
  }
  
  traverse(root);
  return result;
}

// Iterative implementation using two stacks
function postOrderTraversalIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack1 = [root];
  const stack2 = [];
  
  // First, use stack1 to create reverse post-order in stack2
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  
  // Then pop from stack2 to get post-order
  while (stack2.length > 0) {
    const node = stack2.pop();
    result.push(node.value);
  }
  
  return result;
}`,
  explanation: `<p>Post-order traversal is a depth-first tree traversal algorithm that follows the Left-Right-Root pattern:</p>
  <ol>
    <li>Recursively traverse the left subtree (Left)</li>
    <li>Recursively traverse the right subtree (Right)</li>
    <li>Visit the current node (Root)</li>
  </ol>
  <p>Key characteristics:</p>
  <ul>
    <li>The root node is always the last node visited</li>
    <li>Can be implemented recursively or iteratively (using two stacks or one stack with markers)</li>
    <li>Children are processed before their parent nodes</li>
  </ul>
  <p>Applications of post-order traversal:</p>
  <ul>
    <li>Deleting a tree (children must be deleted before parent)</li>
    <li>Evaluating postfix notation</li>
    <li>Finding the height of a tree (bottom-up)</li>
  </ul>`,
  generateSteps: (input: { iterative: boolean }) => {
    const { iterative = false } = input;
    const steps: AlgorithmStep[] = [];
    
    // Create a sample binary tree for visualization
    const treeArray = [10, 5, 15, 3, 7, 12, 18];
    
    steps.push({
      id: 'init',
      description: `Starting post-order traversal (${iterative ? 'iterative' : 'recursive'})`,
      highlightedLines: iterative ? [19, 20] : [2, 3],
      visualState: { 
        tree: treeArray,
        current: [0], // Fixed: Change from number to number[]
        visited: []
      }
    });
    
    if (iterative) {
      // Step 1: Fill stack2 by processing nodes in pre-order but pushing to stack2
      let stack1: number[] = [0]; // Start with root index
      let stack2: number[] = [];
      
      steps.push({
        id: 'stack-init',
        description: 'Initialize stack1 with the root node',
        highlightedLines: [21, 22],
        visualState: { 
          tree: treeArray,
          current: null,
          visited: [],
          stack1,
          stack2
        }
      });
      
      while (stack1.length > 0) {
        const nodeIdx = stack1.pop()!;
        stack2.push(nodeIdx);
        
        steps.push({
          id: `stack1-pop-${nodeIdx}`,
          description: `Pop node ${treeArray[nodeIdx]} from stack1 and push to stack2`,
          highlightedLines: [24, 25],
          visualState: { 
            tree: treeArray,
            current: [nodeIdx],
            visited: [],
            stack1,
            stack2
          }
        });
        
        // Left child (if exists)
        const leftIdx = 2 * nodeIdx + 1;
        if (leftIdx < treeArray.length && treeArray[leftIdx] !== null && treeArray[leftIdx] !== undefined) {
          stack1.push(leftIdx);
        }
        
        // Right child (if exists)
        const rightIdx = 2 * nodeIdx + 2;
        if (rightIdx < treeArray.length && treeArray[rightIdx] !== null && treeArray[rightIdx] !== undefined) {
          stack1.push(rightIdx);
        }
        
        steps.push({
          id: `stack1-update-${nodeIdx}`,
          description: 'Push children to stack1 (if they exist)',
          highlightedLines: [27, 28],
          visualState: { 
            tree: treeArray,
            current: null,
            visited: [],
            stack1,
            stack2
          }
        });
      }
      
      // Step 2: Pop from stack2 to get post-order traversal
      let visitedSoFar: number[] = [];
      
      steps.push({
        id: 'stack2-process',
        description: 'Process stack2 to get post-order traversal',
        highlightedLines: [32, 33],
        visualState: { 
          tree: treeArray,
          current: null,
          visited: visitedSoFar,
          stack2
        }
      });
      
      while (stack2.length > 0) {
        const nodeIdx = stack2.pop()!;
        visitedSoFar.push(nodeIdx);
        
        steps.push({
          id: `visit-${nodeIdx}`,
          description: `Pop and visit node ${treeArray[nodeIdx]}`,
          highlightedLines: [33, 34],
          visualState: { 
            tree: treeArray,
            current: [nodeIdx],
            visited: visitedSoFar,
            stack2
          }
        });
      }
    } else {
      // Recursive post-order: Left -> Right -> Root
      const visitOrder = [3, 7, 5, 12, 18, 15, 10];
      const nodeIndices = [3, 4, 1, 5, 6, 2, 0];
      
      for (let i = 0; i < visitOrder.length; i++) {
        steps.push({
          id: `visit-${i}`,
          description: `Post-order: Visit node (${visitOrder[i]})`,
          highlightedLines: [i < 3 ? 6 : (i < 6 ? 8 : 10)],
          visualState: { 
            tree: treeArray,
            current: [nodeIndices[i]],
            visited: nodeIndices.slice(0, i),
            recursionStack: nodeIndices.slice(0, i).reverse()
          }
        });
      }
    }
    
    steps.push({
      id: 'complete',
      description: 'Post-order traversal complete',
      highlightedLines: iterative ? 37 : 14,
      visualState: { 
        tree: treeArray,
        visited: [3, 4, 1, 5, 6, 2, 0], // Post-order indices
        complete: true
      }
    });
    
    return steps;
  },
  defaultInput: { iterative: false }
};

</edits_to_apply>
