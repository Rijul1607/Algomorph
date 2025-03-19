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
}`,
  explanation: `<p>Binary tree traversal is the process of visiting each node in a tree data structure exactly once. There are three common ways to traverse a binary tree:</p>
  <ol>
    <li><strong>In-order traversal:</strong> First visit the left subtree, then the root, and finally the right subtree (Left → Root → Right).</li>
    <li><strong>Pre-order traversal:</strong> First visit the root, then the left subtree, and finally the right subtree (Root → Left → Right).</li>
    <li><strong>Post-order traversal:</strong> First visit the left subtree, then the right subtree, and finally the root (Left → Right → Root).</li>
  </ol>
  <p>Applications of tree traversal:</p>
  <ul>
    <li>In-order traversal of a binary search tree gives nodes in ascending order</li>
    <li>Pre-order traversal can be used to create a copy of the tree</li>
    <li>Post-order traversal can be used to delete the tree</li>
  </ul>`,
  generateSteps: (input: { tree: any }) => {
    const { tree } = input;
    const steps: AlgorithmStep[] = [];
    const visited: number[] = [];
    
    // Create a simple representation of a binary tree for visualization
    const visualTree = {
      value: 10,
      left: { value: 5, left: { value: 3, left: null, right: null }, right: { value: 7, left: null, right: null } },
      right: { value: 15, left: { value: 12, left: null, right: null }, right: { value: 18, left: null, right: null } }
    };
    
    // Convert tree to array representation for easier visualization
    const treeArray = [10, 5, 15, 3, 7, 12, 18];
    
    steps.push({
      id: 'init',
      description: 'Starting tree traversal',
      highlightedLines: [1, 2],
      visualState: { 
        tree: treeArray,
        current: null,
        visited: []
      }
    });
    
    // Pre-order traversal steps
    steps.push({
      id: 'pre-order-root',
      description: 'Pre-order: Visit root node (10)',
      highlightedLines: [25],
      visualState: { 
        tree: treeArray,
        current: 0,
        visited: [0]
      }
    });
    
    steps.push({
      id: 'pre-order-left',
      description: 'Pre-order: Visit left subtree root (5)',
      highlightedLines: [27],
      visualState: { 
        tree: treeArray,
        current: 1,
        visited: [0, 1]
      }
    });
    
    steps.push({
      id: 'pre-order-left-left',
      description: 'Pre-order: Visit left-left node (3)',
      highlightedLines: [27],
      visualState: { 
        tree: treeArray,
        current: 3,
        visited: [0, 1, 3]
      }
    });
    
    steps.push({
      id: 'pre-order-left-right',
      description: 'Pre-order: Visit left-right node (7)',
      highlightedLines: [29],
      visualState: { 
        tree: treeArray,
        current: 4,
        visited: [0, 1, 3, 4]
      }
    });
    
    steps.push({
      id: 'pre-order-right',
      description: 'Pre-order: Visit right subtree root (15)',
      highlightedLines: [29],
      visualState: { 
        tree: treeArray,
        current: 2,
        visited: [0, 1, 3, 4, 2]
      }
    });
    
    steps.push({
      id: 'pre-order-right-left',
      description: 'Pre-order: Visit right-left node (12)',
      highlightedLines: [27],
      visualState: { 
        tree: treeArray,
        current: 5,
        visited: [0, 1, 3, 4, 2, 5]
      }
    });
    
    steps.push({
      id: 'pre-order-right-right',
      description: 'Pre-order: Visit right-right node (18)',
      highlightedLines: [29],
      visualState: { 
        tree: treeArray,
        current: 6,
        visited: [0, 1, 3, 4, 2, 5, 6]
      }
    });
    
    steps.push({
      id: 'pre-order-complete',
      description: 'Pre-order traversal complete: [10, 5, 3, 7, 15, 12, 18]',
      highlightedLines: [33],
      visualState: { 
        tree: treeArray,
        visited: [0, 1, 3, 4, 2, 5, 6],
        complete: true
      }
    });
    
    return steps;
  },
  defaultInput: { tree: {} }
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
    const { value } = input;
    const steps: AlgorithmStep[] = [];
    
    // Create a sample BST
    const tree = [15, 10, 20, 8, 12, 17, 25];
    
    steps.push({
      id: 'init',
      description: 'Starting with a binary search tree',
      highlightedLines: [1, 2],
      visualState: { 
        tree: tree,
        searching: value
      }
    });
    
    steps.push({
      id: 'root-check',
      description: `Checking root node (15) against search value ${value}`,
      highlightedLines: [55, 56],
      visualState: { 
        tree: tree,
        current: 0,
        searching: value
      }
    });
    
    if (value < 15) {
      steps.push({
        id: 'go-left',
        description: `${value} < 15, so search in left subtree`,
        highlightedLines: [62, 63],
        visualState: { 
          tree: tree,
          current: 1,
          searching: value
        }
      });
      
      if (value < 10) {
        steps.push({
          id: 'go-left-again',
          description: `${value} < 10, so search in left-left subtree`,
          highlightedLines: [62, 63],
          visualState: { 
            tree: tree,
            current: 3,
            searching: value
          }
        });
        
        if (value === 8) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree: tree,
              current: 3,
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree: tree,
              current: 3,
              found: false
            }
          });
        }
      } else {
        steps.push({
          id: 'go-right-subtree',
          description: `${value} > 10, so search in left-right subtree`,
          highlightedLines: [67, 68],
          visualState: { 
            tree: tree,
            current: 4,
            searching: value
          }
        });
        
        if (value === 12) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree: tree,
              current: 4,
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree: tree,
              current: 4,
              found: false
            }
          });
        }
      }
    } else {
      steps.push({
        id: 'go-right',
        description: `${value} > 15, so search in right subtree`,
        highlightedLines: [67, 68],
        visualState: { 
          tree: tree,
          current: 2,
          searching: value
        }
      });
      
      if (value < 20) {
        steps.push({
          id: 'go-left-subtree',
          description: `${value} < 20, so search in right-left subtree`,
          highlightedLines: [62, 63],
          visualState: { 
            tree: tree,
            current: 5,
            searching: value
          }
        });
        
        if (value === 17) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree: tree,
              current: 5,
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree: tree,
              current: 5,
              found: false
            }
          });
        }
      } else {
        steps.push({
          id: 'go-right-again',
          description: `${value} > 20, so search in right-right subtree`,
          highlightedLines: [67, 68],
          visualState: { 
            tree: tree,
            current: 6,
            searching: value
          }
        });
        
        if (value === 25) {
          steps.push({
            id: 'found',
            description: `Found ${value} at node!`,
            highlightedLines: [73],
            visualState: { 
              tree: tree,
              current: 6,
              found: true
            }
          });
        } else {
          steps.push({
            id: 'not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [57],
            visualState: { 
              tree: tree,
              current: 6,
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
