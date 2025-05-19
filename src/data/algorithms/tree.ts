
import { Algorithm } from '@/types/algorithm';

// Helper function to create a binary tree
function createBinaryTree(nodes: (number | null)[]): any {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  const createNode = (value: number | null): any => {
    if (value === null) {
      return null;
    }
    return {
      value: value,
      left: null,
      right: null
    };
  };

  const rootValue = nodes.shift();
  const root = createNode(rootValue);
  if (!root) return null;

  const queue: any[] = [root];

  while (nodes.length > 0) {
    const node = queue.shift();
    if (!node) break;

    const leftValue = nodes.shift();
    if (leftValue !== undefined && leftValue !== null) {
      node.left = createNode(leftValue);
      if (node.left) {
        queue.push(node.left);
      }
    }

    const rightValue = nodes.shift();
    if (rightValue !== undefined && rightValue !== null) {
      node.right = createNode(rightValue);
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return root;
}

// Binary Tree Traversal Algorithm
export const binaryTreeTraversal: Algorithm = {
  id: 'binary-tree-traversal',
  name: 'Binary Tree Traversal',
  type: 'tree',
  description: 'Perform inorder, preorder, or postorder traversal on a binary tree.',
  explanation: `
    <p>Binary tree traversal involves visiting each node in the tree in a specific order. There are three common types of traversals:</p>
    <ul>
      <li><strong>Inorder:</strong> Visit the left subtree, then the current node, then the right subtree.</li>
      <li><strong>Preorder:</strong> Visit the current node, then the left subtree, then the right subtree.</li>
      <li><strong>Postorder:</strong> Visit the left subtree, then the right subtree, then the current node.</li>
    </ul>
    <p>These traversals can be implemented recursively or iteratively using a stack.</p>
  `,
  code: `// Recursive Inorder Traversal
function inorderTraversal(node) {
  if (node) {
    inorderTraversal(node.left);
    console.log(node.value); // Visit the node
    inorderTraversal(node.right);
  }
}

// Recursive Preorder Traversal
function preorderTraversal(node) {
  if (node) {
    console.log(node.value); // Visit the node
    preorderTraversal(node.left);
    preorderTraversal(node.right);
  }
}

// Recursive Postorder Traversal
function postorderTraversal(node) {
  if (node) {
    postorderTraversal(node.left);
    postorderTraversal(node.right);
    console.log(node.value); // Visit the node
  }
}`,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    traversalType: 'inorder'
  },
  generateSteps: (input: any) => {
    const { nodes, traversalType } = input;
    const tree = createBinaryTree([...nodes]);
    const steps: any[] = [];
    const path: number[] = []; // Initialize path as an array
    const visited: number[] = [];

    if (!tree) {
      steps.push({
        id: 'step-0',
        description: 'The tree is empty.',
        visualState: {
          tree: null,
          current: null,
          path: [],
          visited: []
        }
      });
      return steps;
    }

    steps.push({
      id: 'step-1',
      description: `Start Binary Tree traversal from root node ${tree.value}`,
      visualState: {
        tree: tree,
        current: tree.value,
        path: [], // Fix: initialize as an array instead of a number
        highlighted: [tree.value]
      }
    });

    function traverse(node: any, type: string) {
      if (!node) return;

      if (type === 'preorder') {
        visited.push(node.value);
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Preorder: Visiting node ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            path: [...path], // Fix: ensure path is an array
            visited: [...visited],
            highlighted: [node.value]
          }
        });
        path.push(node.value);
        traverse(node.left, type);
        path.pop();
        traverse(node.right, type);
      } else if (type === 'inorder') {
        path.push(node.value);
        traverse(node.left, type);
        path.pop();
        visited.push(node.value);
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Inorder: Visiting node ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            path: [...path], // Fix: ensure path is an array
            visited: [...visited],
            highlighted: [node.value]
          }
        });
        path.push(node.value);
        traverse(node.right, type);
        path.pop();
      } else if (type === 'postorder') {
        path.push(node.value);
        traverse(node.left, type);
        path.pop();
        path.push(node.value);
        traverse(node.right, type);
        path.pop();
        visited.push(node.value);
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Postorder: Visiting node ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            path: [...path], // Fix: ensure path is an array
            visited: [...visited],
            highlighted: [node.value]
          }
        });
      }
    }

    traverse(tree, traversalType);

    steps.push({
      id: 'step-final',
      description: `Traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        path: [],
        visited: [...visited],
        highlighted: []
      }
    });

    return steps;
  }
};

// Binary Search Tree Algorithm
export const binarySearchTree: Algorithm = {
  id: 'binary-search-tree',
  name: 'Binary Search Tree',
  type: 'tree',
  description: 'Demonstrates binary search tree operations like insertion and search.',
  explanation: `
    <p>A binary search tree (BST) is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.</p>
    <p>In a BST, for each node:</p>
    <ul>
      <li>All nodes in the left subtree have values less than the node's value.</li>
      <li>All nodes in the right subtree have values greater than the node's value.</li>
    </ul>
    <p>This property makes BSTs efficient for searching, insertion, and deletion operations.</p>
  `,
  code: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    if (!this.root) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return false;
    return current;
  }
}`,
  timeComplexity: 'O(log n) on average, O(n) in worst case',
  spaceComplexity: 'O(1)',
  defaultInput: {
    nodes: [8, 3, 10, 1, 6, 14, 4, 7, 13],
    value: 6
  },
  generateSteps: (input: any) => {
    // Make sure input is defined and nodes is an array
    if (!input || !input.nodes || !Array.isArray(input.nodes)) {
      return [{
        id: 'error',
        description: 'Invalid input. Using default tree nodes.',
        visualState: {
          tree: [],
          current: null,
          path: [],
          highlighted: []
        }
      }];
    }
    
    const { nodes, value } = input;
    const tree = { value: null, left: null, right: null }; // Initialize as an object
    const steps: any[] = [];
    let current: any = null;
    const path: number[] = []; // Initialize path as an array

    // Construct the tree
    function insertNode(root: any, val: number) {
      if (root.value === null) {
        root.value = val;
        steps.push({
          id: `step-insert-${steps.length + 1}`,
          description: `Inserting root node with value ${val}`,
          visualState: {
            tree: { ...root },
            current: val,
            path: [],
            highlighted: [val]
          }
        });
        return;
      }

      current = root;
      while (true) {
        if (val < current.value) {
          if (current.left === null) {
            current.left = { value: val, left: null, right: null };
            steps.push({
              id: `step-insert-${steps.length + 1}`,
              description: `Inserting node with value ${val} to the left of ${current.value}`,
              visualState: {
                tree: JSON.parse(JSON.stringify(root)),
                current: val,
                path: [...path, current.value],
                highlighted: [val, current.value]
              }
            });
            break;
          } else {
            path.push(current.value);
            current = current.left;
          }
        } else {
          if (current.right === null) {
            current.right = { value: val, left: null, right: null };
            steps.push({
              id: `step-insert-${steps.length + 1}`,
              description: `Inserting node with value ${val} to the right of ${current.value}`,
              visualState: {
                tree: JSON.parse(JSON.stringify(root)),
                current: val,
                path: [...path, current.value],
                highlighted: [val, current.value]
              }
            });
            break;
          } else {
            path.push(current.value);
            current = current.right;
          }
        }
      }
    }

    if (nodes && nodes.length > 0) {
      steps.push({
        id: 'step-0',
        description: 'Start building Binary Search Tree',
        visualState: {
          tree: { ...tree },
          current: null,
          path: [],
          highlighted: []
        }
      });

      for (const nodeValue of nodes) {
        insertNode(tree, nodeValue);
      }
    }

    // Search for the value
    function searchNode(root: any, target: number) {
      if (!root.value) return;

      current = root;
      path.length = 0; // Reset path for search
      while (current) {
        steps.push({
          id: `step-search-${steps.length + 1}`,
          description: `Searching for value ${target}, currently at node ${current.value}`,
          visualState: {
            tree: JSON.parse(JSON.stringify(root)),
            current: current.value,
            path: [...path],
            highlighted: [current.value]
          }
        });

        if (target === current.value) {
          steps.push({
            id: `step-search-found-${steps.length + 1}`,
            description: `Found node with value ${target}`,
            visualState: {
              tree: JSON.parse(JSON.stringify(root)),
              current: current.value,
              path: [...path],
              highlighted: [current.value],
              found: true
            }
          });
          return true;
        } else if (target < current.value) {
          if (current.left) {
            path.push(current.value);
            current = current.left;
          } else {
            steps.push({
              id: `step-search-not-found-${steps.length + 1}`,
              description: `Value ${target} not found in the tree`,
              visualState: {
                tree: JSON.parse(JSON.stringify(root)),
                current: current.value,
                path: [...path],
                highlighted: [current.value],
                found: false
              }
            });
            return false;
          }
        } else {
          if (current.right) {
            path.push(current.value);
            current = current.right;
          } else {
            steps.push({
              id: `step-search-not-found-${steps.length + 1}`,
              description: `Value ${target} not found in the tree`,
              visualState: {
                tree: JSON.parse(JSON.stringify(root)),
                current: current.value,
                path: [...path],
                highlighted: [current.value],
                found: false
              }
            });
            return false;
          }
        }
      }

      return false;
    }

    if (value !== undefined) {
      searchNode(tree, value);
    }

    return steps;
  }
};

// Level Order Traversal Algorithm
export const levelOrderTraversal: Algorithm = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  type: 'tree',
  description: 'Traverse a binary tree in level order (breadth-first).',
  explanation: `
    <p>Level order traversal, also known as breadth-first traversal, visits nodes in a binary tree level by level, starting from the root node.</p>
    <p>The algorithm uses a queue data structure to keep track of nodes to visit:</p>
    <ol>
      <li>Start by enqueueing the root node.</li>
      <li>While the queue is not empty:</li>
      <ul>
        <li>Dequeue a node and process it.</li>
        <li>Enqueue its left child (if exists).</li>
        <li>Enqueue its right child (if exists).</li>
      </ul>
    </ol>
    <p>This approach ensures that nodes are processed in order of their distance from the root, from top to bottom and left to right.</p>
  `,
  code: `function levelOrderTraversal(root) {
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
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7, null, null, 10, 11],
    withLevels: false
  },
  generateSteps: (input: any) => {
    // Make sure input is defined and nodes is an array
    if (!input || !input.nodes || !Array.isArray(input.nodes)) {
      return [{
        id: 'error',
        description: 'Invalid input. Using default tree nodes.',
        visualState: {
          tree: [],
          current: null,
          queue: [],
          visited: []
        }
      }];
    }
    
    const { nodes, withLevels } = input;
    const tree = createBinaryTree([...nodes]);
    const steps: any[] = [];
    const visited: number[] = [];
    
    if (!tree) {
      steps.push({
        id: 'step-0',
        description: 'The tree is empty.',
        visualState: {
          tree: null,
          current: null,
          queue: [],
          visited: []
        }
      });
      return steps;
    }
    
    steps.push({
      id: 'step-1',
      description: 'Start Level Order traversal from root node',
      visualState: {
        tree: tree,
        current: tree.value,
        queue: [tree.value],
        visited: []
      }
    });
    
    function bfs(root: any) {
      const queue: any[] = [root];
      
      while (queue.length > 0) {
        const node = queue.shift();
        visited.push(node.value);
        
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Visit node ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            queue: queue.map(n => n.value),
            visited: [...visited]
          }
        });
        
        if (node.left) {
          queue.push(node.left);
          steps.push({
            id: `step-enqueue-left-${steps.length + 1}`,
            description: `Enqueue left child node ${node.left.value}`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.left.value],
              queue: queue.map(n => n.value),
              visited: [...visited]
            }
          });
        }
        
        if (node.right) {
          queue.push(node.right);
          steps.push({
            id: `step-enqueue-right-${steps.length + 1}`,
            description: `Enqueue right child node ${node.right.value}`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.right.value],
              queue: queue.map(n => n.value),
              visited: [...visited]
            }
          });
        }
      }
    }
    
    function bfsWithLevels(root: any) {
      const queue: any[] = [root];
      let levelCount = 1;
      let nextLevelCount = 0;
      let currentLevel = 0;
      
      while (queue.length > 0) {
        const node = queue.shift();
        visited.push(node.value);
        levelCount--;
        
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Visit node ${node.value} at level ${currentLevel}`,
          visualState: {
            tree: tree,
            current: node.value,
            queue: queue.map(n => n.value),
            visited: [...visited],
            level: currentLevel
          }
        });
        
        if (node.left) {
          queue.push(node.left);
          nextLevelCount++;
          steps.push({
            id: `step-enqueue-left-${steps.length + 1}`,
            description: `Enqueue left child node ${node.left.value} for next level`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.left.value],
              queue: queue.map(n => n.value),
              visited: [...visited],
              level: currentLevel
            }
          });
        }
        
        if (node.right) {
          queue.push(node.right);
          nextLevelCount++;
          steps.push({
            id: `step-enqueue-right-${steps.length + 1}`,
            description: `Enqueue right child node ${node.right.value} for next level`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.right.value],
              queue: queue.map(n => n.value),
              visited: [...visited],
              level: currentLevel
            }
          });
        }
        
        if (levelCount === 0) {
          if (nextLevelCount > 0) {
            currentLevel++;
            steps.push({
              id: `step-next-level-${steps.length + 1}`,
              description: `Moving to level ${currentLevel}`,
              visualState: {
                tree: tree,
                current: null,
                queue: queue.map(n => n.value),
                visited: [...visited],
                level: currentLevel
              }
            });
          }
          levelCount = nextLevelCount;
          nextLevelCount = 0;
        }
      }
    }
    
    if (withLevels) {
      bfsWithLevels(tree);
    } else {
      bfs(tree);
    }
    
    steps.push({
      id: 'step-final',
      description: `Level Order traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        queue: [],
        visited: [...visited],
        complete: true
      }
    });
    
    return steps;
  }
};

// Pre-Order Traversal Algorithm
export const preOrderTraversal: Algorithm = {
  id: 'pre-order-traversal',
  name: 'Pre-Order Traversal',
  type: 'tree',
  description: 'Traverse a binary tree in pre-order (Node, Left, Right).',
  explanation: `
    <p>Pre-order traversal visits nodes in a binary tree in the following order:</p>
    <ol>
      <li>Visit the current node.</li>
      <li>Recursively visit the left subtree.</li>
      <li>Recursively visit the right subtree.</li>
    </ol>
    <p>This traversal can be implemented recursively or iteratively using a stack.</p>
    <p>Pre-order traversal is useful for creating a copy of the tree or getting a prefix expression of an expression tree.</p>
  `,
  code: `// Recursive Pre-Order Traversal
function preOrderTraversal(root) {
  if (!root) return [];
  
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    
    result.push(node.value); // Visit the node first
    traverse(node.left);     // Then left subtree
    traverse(node.right);    // Then right subtree
  }
  
  traverse(root);
  return result;
}

// Iterative Pre-Order Traversal
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
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    iterative: false
  },
  generateSteps: (input: any) => {
    // Make sure input is defined and nodes is an array
    if (!input || !input.nodes || !Array.isArray(input.nodes)) {
      return [{
        id: 'error',
        description: 'Invalid input. Using default tree nodes.',
        visualState: {
          tree: [],
          current: null,
          stack: [],
          visited: []
        }
      }];
    }
    
    const { nodes, iterative } = input;
    const tree = createBinaryTree([...nodes]);
    const steps: any[] = [];
    const visited: number[] = [];
    
    if (!tree) {
      steps.push({
        id: 'step-0',
        description: 'The tree is empty.',
        visualState: {
          tree: null,
          current: null,
          stack: [],
          visited: []
        }
      });
      return steps;
    }
    
    steps.push({
      id: 'step-1',
      description: `Start Pre-Order traversal from root node ${tree.value}`,
      visualState: {
        tree: tree,
        current: tree.value,
        stack: iterative ? [tree.value] : [],
        visited: []
      }
    });
    
    function recursivePreOrder(node: any, stack: number[] = []) {
      if (!node) return;
      
      visited.push(node.value);
      steps.push({
        id: `step-${steps.length + 1}`,
        description: `Visit node ${node.value}`,
        visualState: {
          tree: tree,
          current: node.value,
          stack: [...stack, node.value],
          visited: [...visited]
        }
      });
      
      if (node.left) {
        steps.push({
          id: `step-go-left-${steps.length + 1}`,
          description: `Go to left child of ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            comparing: [node.left.value],
            stack: [...stack, node.value],
            visited: [...visited]
          }
        });
        recursivePreOrder(node.left, [...stack, node.value]);
      }
      
      if (node.right) {
        steps.push({
          id: `step-go-right-${steps.length + 1}`,
          description: `Go to right child of ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            comparing: [node.right.value],
            stack: [...stack, node.value],
            visited: [...visited]
          }
        });
        recursivePreOrder(node.right, [...stack, node.value]);
      }
    }
    
    function iterativePreOrder(root: any) {
      const stack: any[] = [root];
      
      while (stack.length > 0) {
        const node = stack.pop();
        visited.push(node.value);
        
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Pop and visit node ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            stack: stack.map(n => n.value),
            visited: [...visited]
          }
        });
        
        // Push right then left so left gets processed first (due to LIFO of stack)
        if (node.right) {
          stack.push(node.right);
          steps.push({
            id: `step-push-right-${steps.length + 1}`,
            description: `Push right child ${node.right.value} onto stack`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.right.value],
              stack: stack.map(n => n.value),
              visited: [...visited]
            }
          });
        }
        
        if (node.left) {
          stack.push(node.left);
          steps.push({
            id: `step-push-left-${steps.length + 1}`,
            description: `Push left child ${node.left.value} onto stack`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.left.value],
              stack: stack.map(n => n.value),
              visited: [...visited]
            }
          });
        }
      }
    }
    
    if (iterative) {
      iterativePreOrder(tree);
    } else {
      recursivePreOrder(tree);
    }
    
    steps.push({
      id: 'step-final',
      description: `Pre-Order traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        stack: [],
        visited: [...visited],
        complete: true
      }
    });
    
    return steps;
  }
};

// Post-Order Traversal Algorithm
export const postOrderTraversal: Algorithm = {
  id: 'post-order-traversal',
  name: 'Post-Order Traversal',
  type: 'tree',
  description: 'Traverse a binary tree in post-order (Left, Right, Node).',
  explanation: `
    <p>Post-order traversal visits nodes in a binary tree in the following order:</p>
    <ol>
      <li>Recursively visit the left subtree.</li>
      <li>Recursively visit the right subtree.</li>
      <li>Visit the current node.</li>
    </ol>
    <p>This traversal can be implemented recursively or iteratively (though the iterative version is more complex).</p>
    <p>Post-order traversal is useful for deleting a tree or evaluating postfix expressions.</p>
  `,
  code: `// Recursive Post-Order Traversal
function postOrderTraversal(root) {
  if (!root) return [];
  
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    
    traverse(node.left);     // First visit left subtree
    traverse(node.right);    // Then right subtree
    result.push(node.value); // Finally visit the node
  }
  
  traverse(root);
  return result;
}

// Iterative Post-Order Traversal (using two stacks)
function postOrderTraversalIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack1 = [root];
  const stack2 = [];
  
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  
  while (stack2.length > 0) {
    result.push(stack2.pop().value);
  }
  
  return result;
}`,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    iterative: false
  },
  generateSteps: (input: any) => {
    // Make sure input is defined and nodes is an array
    if (!input || !input.nodes || !Array.isArray(input.nodes)) {
      return [{
        id: 'error',
        description: 'Invalid input. Using default tree nodes.',
        visualState: {
          tree: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          current: null,
          stack1: [],
          stack2: [],
          visited: []
        }
      }];
    }
    
    const { nodes, iterative } = input;
    const tree = createBinaryTree([...nodes]);
    const steps: any[] = [];
    const visited: number[] = [];
    
    if (!tree) {
      steps.push({
        id: 'step-0',
        description: 'The tree is empty.',
        visualState: {
          tree: null,
          current: null,
          stack1: [],
          stack2: [],
          visited: []
        }
      });
      return steps;
    }
    
    steps.push({
      id: 'step-1',
      description: `Start Post-Order traversal from root node ${tree.value}`,
      visualState: {
        tree: tree,
        current: tree.value,
        stack1: iterative ? [tree.value] : [],
        stack2: [],
        visited: []
      }
    });
    
    function recursivePostOrder(node: any, recursionStack: number[] = []) {
      if (!node) return;
      
      steps.push({
        id: `step-${steps.length + 1}`,
        description: `Enter node ${node.value}`,
        visualState: {
          tree: tree,
          current: node.value,
          recursionStack: [...recursionStack, node.value],
          visited: [...visited]
        }
      });
      
      if (node.left) {
        steps.push({
          id: `step-go-left-${steps.length + 1}`,
          description: `Go to left child of ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            comparing: [node.left.value],
            recursionStack: [...recursionStack, node.value],
            visited: [...visited]
          }
        });
        recursivePostOrder(node.left, [...recursionStack, node.value]);
      }
      
      if (node.right) {
        steps.push({
          id: `step-go-right-${steps.length + 1}`,
          description: `Go to right child of ${node.value}`,
          visualState: {
            tree: tree,
            current: node.value,
            comparing: [node.right.value],
            recursionStack: [...recursionStack, node.value],
            visited: [...visited]
          }
        });
        recursivePostOrder(node.right, [...recursionStack, node.value]);
      }
      
      visited.push(node.value);
      steps.push({
        id: `step-visit-${steps.length + 1}`,
        description: `Visit node ${node.value} (after both subtrees)`,
        visualState: {
          tree: tree,
          current: node.value,
          recursionStack: [...recursionStack],
          visited: [...visited]
        }
      });
    }
    
    function iterativePostOrder(root: any) {
      const stack1: any[] = [root];
      const stack2: any[] = [];
      
      // First DFS traversal to fill stack2 in reverse post-order
      while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);
        
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Pop node ${node.value} from stack1 and push to stack2`,
          visualState: {
            tree: tree,
            current: node.value,
            stack1: stack1.map(n => n.value),
            stack2: stack2.map(n => n.value),
            visited: [...visited]
          }
        });
        
        // Push left then right so right gets processed first
        if (node.left) {
          stack1.push(node.left);
          steps.push({
            id: `step-push-left-${steps.length + 1}`,
            description: `Push left child ${node.left.value} onto stack1`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.left.value],
              stack1: stack1.map(n => n.value),
              stack2: stack2.map(n => n.value),
              visited: [...visited]
            }
          });
        }
        
        if (node.right) {
          stack1.push(node.right);
          steps.push({
            id: `step-push-right-${steps.length + 1}`,
            description: `Push right child ${node.right.value} onto stack1`,
            visualState: {
              tree: tree,
              current: node.value,
              comparing: [node.right.value],
              stack1: stack1.map(n => n.value),
              stack2: stack2.map(n => n.value),
              visited: [...visited]
            }
          });
        }
      }
      
      // Then pop from stack2 to get post-order traversal
      while (stack2.length > 0) {
        const node = stack2.pop();
        visited.push(node.value);
        
        steps.push({
          id: `step-pop-${steps.length + 1}`,
          description: `Pop and visit node ${node.value} from stack2`,
          visualState: {
            tree: tree,
            current: node.value,
            stack1: [],
            stack2: stack2.map(n => n.value),
            visited: [...visited]
          }
        });
      }
    }
    
    if (iterative) {
      iterativePostOrder(tree);
    } else {
      recursivePostOrder(tree);
    }
    
    steps.push({
      id: 'step-final',
      description: `Post-Order traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        stack1: [],
        stack2: [],
        visited: [...visited],
        complete: true
      }
    });
    
    return steps;
  }
};
