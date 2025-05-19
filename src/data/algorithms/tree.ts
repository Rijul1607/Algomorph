
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
            description: `Value ${target} found in the tree`,
            visualState: {
              tree: JSON.parse(JSON.stringify(root)),
              current: current.value,
              path: [...path],
              highlighted: [current.value],
              found: true
            }
          });
          return;
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
                current: null,
                path: [...path],
                highlighted: [],
                found: false
              }
            });
            return;
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
                current: null,
                path: [...path],
                highlighted: [],
                found: false
              }
            });
            return;
          }
        }
      }
    }

    if (value !== undefined) {
      searchNode(tree, value);
    }

    steps.push({
      id: 'step-final',
      description: 'Binary Search Tree operations complete',
      visualState: {
        tree: JSON.parse(JSON.stringify(tree)),
        current: null,
        path: [],
        highlighted: []
      }
    });

    return steps;
  }
};

// Level Order Traversal Algorithm
export const levelOrderTraversal: Algorithm = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  type: 'tree',
  description: 'Traverse a binary tree level by level.',
  explanation: `
    <p>Level order traversal visits all nodes of a tree level by level, starting from the root.</p>
    <p>It uses a queue to keep track of the nodes to visit.</p>
  `,
  code: `function levelOrder(root) {
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
  spaceComplexity: 'O(w) where w is the maximum width of the tree',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7],
    withLevels: false
  },
  generateSteps: (input: any) => {
    const { nodes, withLevels } = input;
    const tree = createBinaryTree([...nodes]);
    const steps: any[] = [];
    const queue: any[] = [];
    const visited: number[] = [];
    let levels: number[][] = [];

    if (!tree) {
      steps.push({
        id: 'step-0',
        description: 'The tree is empty.',
        visualState: {
          tree: null,
          current: null,
          queue: [],
          visited: [],
          levels: []
        }
      });
      return steps;
    }

    queue.push({ node: tree, level: 0 });

    steps.push({
      id: 'step-1',
      description: 'Start Level Order Traversal from the root node',
      visualState: {
        tree: tree,
        current: tree.value,
        queue: queue.map(item => item.node.value),
        visited: [],
        levels: []
      }
    });

    while (queue.length > 0) {
      const { node, level } = queue.shift();

      if (withLevels) {
        if (!levels[level]) {
          levels[level] = [];
        }
        levels[level].push(node.value);
      }

      visited.push(node.value);

      steps.push({
        id: `step-${steps.length + 1}`,
        description: `Visiting node ${node.value} at level ${level}`,
        visualState: {
          tree: tree,
          current: node.value,
          queue: queue.map(item => item.node.value),
          visited: [...visited],
          levels: withLevels ? levels : []
        }
      });

      if (node.left) {
        queue.push({ node: node.left, level: level + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, level: level + 1 });
      }
    }

    steps.push({
      id: 'step-final',
      description: `Level Order Traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        queue: [],
        visited: [...visited],
        levels: withLevels ? levels : []
      }
    });

    return steps;
  }
};

// Pre-order Traversal Algorithm
export const preOrderTraversal: Algorithm = {
  id: 'pre-order-traversal',
  name: 'Pre-order Traversal',
  type: 'tree',
  description: 'Traverse a binary tree using pre-order traversal (recursive or iterative).',
  explanation: `
    <p>Pre-order traversal visits the current node before its child nodes (left then right).</p>
    <p>It can be implemented recursively or iteratively using a stack.</p>
  `,
  code: `// Recursive Pre-order Traversal
function preOrderRecursive(node) {
  if (node) {
    console.log(node.value);
    preOrderRecursive(node.left);
    preOrderRecursive(node.right);
  }
}

// Iterative Pre-order Traversal
function preOrderIterative(root) {
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}`,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7],
    iterative: false
  },
  generateSteps: (input: any) => {
    const { nodes, iterative } = input;
    const tree = createBinaryTree([...nodes]);
    const steps: any[] = [];
    const visited: number[] = [];
    const stack: any[] = [];
    let current: any = null;
    const path: number[] = []; // Initialize path as an array

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

    if (iterative) {
      stack.push(tree);

      steps.push({
        id: 'step-1',
        description: 'Start Iterative Pre-order Traversal from the root node',
        visualState: {
          tree: tree,
          current: tree.value,
          stack: stack.map(node => node.value),
          visited: []
        }
      });

      while (stack.length > 0) {
        current = stack.pop();
        visited.push(current.value);

        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Visiting node ${current.value} (Iterative)`,
          visualState: {
            tree: tree,
            current: current.value,
            stack: stack.map(node => node.value),
            visited: [...visited]
          }
        });

        if (current.right) {
          stack.push(current.right);
        }
        if (current.left) {
          stack.push(current.left);
        }
      }
    } else {
      function traverse(node: any) {
        if (!node) return;

        visited.push(node.value);
        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Visiting node ${node.value} (Recursive)`,
          visualState: {
            tree: tree,
            current: node.value,
            stack: [],
            visited: [...visited]
          }
        });

        traverse(node.left);
        traverse(node.right);
      }

      steps.push({
        id: 'step-1',
        description: 'Start Recursive Pre-order Traversal from the root node',
        visualState: {
          tree: tree,
          current: tree.value,
          stack: [],
          visited: []
        }
      });

      traverse(tree);
    }

    steps.push({
      id: 'step-final',
      description: `Pre-order Traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        stack: [],
        visited: [...visited]
      }
    });

    return steps;
  }
};

// Post-order Traversal Algorithm
export const postOrderTraversal: Algorithm = {
  id: 'post-order-traversal',
  name: 'Post-order Traversal',
  type: 'tree',
  description: 'Traverse a binary tree using post-order traversal (recursive or iterative).',
  explanation: `
    <p>Post-order traversal visits the child nodes before the current node (left, then right).</p>
    <p>It can be implemented recursively or iteratively using two stacks.</p>
  `,
  code: `// Recursive Post-order Traversal
function postOrderRecursive(node) {
  if (node) {
    postOrderRecursive(node.left);
    postOrderRecursive(node.right);
    console.log(node.value);
  }
}

// Iterative Post-order Traversal (using two stacks)
function postOrderIterative(root) {
  const stack1 = [root];
  const stack2 = [];
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  const result = [];
  while (stack2.length > 0) {
    result.push(stack2.pop().value);
  }
  return result;
}`,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) where h is the height of the tree',
  defaultInput: {
    nodes: [1, 2, 3, 4, 5, 6, 7],
    iterative: false
  },
  generateSteps: (input: any) => {
    // Input validation - ensure nodes is an array
    const nodes = Array.isArray(input?.nodes) ? [...input.nodes] : [];
    const iterative = input?.iterative ?? false;
    
    const tree = createBinaryTree(nodes);
    const steps: any[] = [];
    const visited: number[] = [];
    const stack1: any[] = [];
    const stack2: any[] = [];
    let current: any = null;
    const path: number[] = []; // Initialize path as an array

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

    if (iterative) {
      stack1.push(tree);

      steps.push({
        id: 'step-1',
        description: 'Start Iterative Post-order Traversal from the root node',
        visualState: {
          tree: tree,
          current: tree.value,
          stack1: stack1.map(node => node.value),
          stack2: [],
          visited: []
        }
      });

      while (stack1.length > 0) {
        current = stack1.pop();
        stack2.push(current);

        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Moving node ${current.value} to stack2 (Iterative)`,
          visualState: {
            tree: tree,
            current: current.value,
            stack1: stack1.map(node => node.value),
            stack2: stack2.map(node => node.value),
            visited: [...visited]
          }
        });

        if (current.left) {
          stack1.push(current.left);
        }
        if (current.right) {
          stack1.push(current.right);
        }
      }

      while (stack2.length > 0) {
        current = stack2.pop();
        visited.push(current.value);

        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Visiting node ${current.value} from stack2 (Iterative)`,
          visualState: {
            tree: tree,
            current: current.value,
            stack1: [],
            stack2: stack2.map(node => node.value),
            visited: [...visited]
          }
        });
      }
    } else {
      function traverse(node: any) {
        if (!node) return;

        traverse(node.left);
        traverse(node.right);
        visited.push(node.value);

        steps.push({
          id: `step-${steps.length + 1}`,
          description: `Visiting node ${node.value} (Recursive)`,
          visualState: {
            tree: tree,
            current: node.value,
            stack1: [],
            stack2: [],
            visited: [...visited]
          }
        });
      }

      steps.push({
        id: 'step-1',
        description: 'Start Recursive Post-order Traversal from the root node',
        visualState: {
          tree: tree,
          current: tree.value,
          stack1: [],
          stack2: [],
          visited: []
        }
      });

      traverse(tree);
    }

    steps.push({
      id: 'step-final',
      description: `Post-order Traversal complete. Order: ${visited.join(', ')}`,
      visualState: {
        tree: tree,
        current: null,
        stack1: [],
        stack2: [],
        visited: [...visited]
      }
    });

    return steps;
  }
};
