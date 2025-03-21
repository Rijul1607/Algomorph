import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Binary Tree Traversal
export const binaryTreeTraversal: Algorithm = {
  id: 'binary-tree-traversal',
  name: 'Binary Tree Traversal',
  type: 'tree',
  description: 'Visualize different binary tree traversal algorithms: In-order, Pre-order, and Post-order.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// In-order traversal: Left -> Root -> Right
function inOrderTraversal(node, result = []) {
  if (node) {
    inOrderTraversal(node.left, result);
    result.push(node.value);
    inOrderTraversal(node.right, result);
  }
  return result;
}

// Pre-order traversal: Root -> Left -> Right
function preOrderTraversal(node, result = []) {
  if (node) {
    result.push(node.value);
    preOrderTraversal(node.left, result);
    preOrderTraversal(node.right, result);
  }
  return result;
}

// Post-order traversal: Left -> Right -> Root
function postOrderTraversal(node, result = []) {
  if (node) {
    postOrderTraversal(node.left, result);
    postOrderTraversal(node.right, result);
    result.push(node.value);
  }
  return result;
}

// Example usage:
const root = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3, new Node(6), new Node(7)));
console.log("In-order:", inOrderTraversal(root));
console.log("Pre-order:", preOrderTraversal(root));
console.log("Post-order:", postOrderTraversal(root));`,
  explanation: `<p>Binary tree traversal involves visiting each node in the tree in a specific order. There are three common types of traversals:</p>
  <ul>
    <li><strong>In-order:</strong> Traverse the left subtree, visit the root, then traverse the right subtree.</li>
    <li><strong>Pre-order:</strong> Visit the root, traverse the left subtree, then traverse the right subtree.</li>
    <li><strong>Post-order:</strong> Traverse the left subtree, traverse the right subtree, then visit the root.</li>
  </ul>
  <p>Each traversal type results in a different order of visiting the nodes, which can be useful for different applications.</p>`,
  generateSteps: (input: { traversalType: 'inOrder' | 'preOrder' | 'postOrder' }) => {
    const { traversalType = 'inOrder' } = input;
    const steps: AlgorithmStep[] = [];

    // Define the tree structure
    const tree = {
      root: {
        id: '1',
        value: 1,
        left: {
          id: '2',
          value: 2,
          left: { id: '4', value: 4, left: null, right: null },
          right: { id: '5', value: 5, left: null, right: null }
        },
        right: {
          id: '3',
          value: 3,
          left: { id: '6', value: 6, left: null, right: null },
          right: { id: '7', value: 7, left: null, right: null }
        }
      }
    };

    const traversalOrder: number[] = [];

    // Recursive traversal function
    const traverse = (node: any, type: string) => {
      if (!node) return;

      if (type === 'preOrder') {
        traversalOrder.push(node.value);
        steps.push({
          id: `preOrder-${node.id}`,
          description: `Pre-order: Visit node ${node.value}`,
          highlightedLines: [18],
          visualState: {
            tree,
            currentNode: node.id,
            traversalOrder: [...traversalOrder],
            traversalType
          }
        });
        traverse(node.left, type);
        traverse(node.right, type);
      } else if (type === 'inOrder') {
        traverse(node.left, type);
        traversalOrder.push(node.value);
        steps.push({
          id: `inOrder-${node.id}`,
          description: `In-order: Visit node ${node.value}`,
          highlightedLines: [11],
          visualState: {
            tree,
            currentNode: node.id,
            traversalOrder: [...traversalOrder],
            traversalType
          }
        });
        traverse(node.right, type);
      } else if (type === 'postOrder') {
        traverse(node.left, type);
        traverse(node.right, type);
        traversalOrder.push(node.value);
        steps.push({
          id: `postOrder-${node.id}`,
          description: `Post-order: Visit node ${node.value}`,
          highlightedLines: [25],
          visualState: {
            tree,
            currentNode: node.id,
            traversalOrder: [...traversalOrder],
            traversalType
          }
        });
      }
    };

    steps.push({
      id: 'init',
      description: `Initialize ${traversalType} traversal`,
      highlightedLines: [],
      visualState: {
        tree,
        traversalOrder: [],
        traversalType
      }
    });

    traverse(tree.root, traversalType);

    steps.push({
      id: 'complete',
      description: `Traversal complete: ${traversalOrder.join(', ')}`,
      highlightedLines: [],
      visualState: {
        tree,
        traversalOrder,
        traversalType,
        complete: true
      }
    });

    return steps;
  },
  defaultInput: { traversalType: 'inOrder' }
};

// Binary Search Tree
export const binarySearchTree: Algorithm = {
  id: 'binary-search-tree',
  name: 'Binary Search Tree',
  type: 'tree',
  description: 'Visualize the creation and search operations in a Binary Search Tree (BST).',
  timeComplexity: 'O(log n) average, O(n) worst-case',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
class Node {
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
}

// Example usage:
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(13);
bst.insert(11);
bst.insert(2);
bst.insert(16);
bst.insert(7);
console.log(bst.search(13));
console.log(bst.search(100));`,
  explanation: `<p>A Binary Search Tree (BST) is a tree data structure where each node has at most two children, which are referred to as the left child and the right child. In a BST, for each node:</p>
  <ul>
    <li>All nodes in the left subtree have values less than the node's value.</li>
    <li>All nodes in the right subtree have values greater than the node's value.</li>
  </ul>
  <p>This property allows for efficient searching, insertion, and deletion operations.</p>`,
  generateSteps: (input: { operation: 'insert' | 'search', value: number, initialTree?: number[] }) => {
    const { operation = 'insert', value = 5, initialTree = [10, 5, 13, 11, 2, 16, 7] } = input;
    const steps: AlgorithmStep[] = [];

    // Define the tree structure
    const tree = { root: null };
    const nodes: { [key: string]: any } = {};
    let nodeIdCounter = 1;

    // Function to create a new node
    const createNode = (value: number) => {
      const id = String(nodeIdCounter++);
      const newNode = { id, value, left: null, right: null };
      nodes[id] = newNode;
      return newNode;
    };

    // Function to insert a node into the BST
    const insertNode = (root: any, value: number) => {
      const newNode = createNode(value);
      if (!root) {
        return newNode;
      }

      let current = root;
      while (true) {
        if (value === current.value) return root;

        if (value < current.value) {
          if (current.left === null) {
            current.left = newNode;
            return root;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = newNode;
            return root;
          }
          current = current.right;
        }
      }
    };

    // Build initial tree
    initialTree.forEach(val => {
      tree.root = insertNode(tree.root, val);
    });

    steps.push({
      id: 'init',
      description: `Initialize BST with initial values: ${initialTree.join(', ')}`,
      highlightedLines: [],
      visualState: {
        tree,
        nodes,
        operation,
        value
      }
    });

    if (operation === 'insert') {
      // Insertion steps
      const newNode = createNode(value);
      steps.push({
        id: 'create-node',
        description: `Create new node with value ${value}`,
        highlightedLines: [],
        visualState: {
          tree,
          nodes,
          operation,
          value,
          newNodeId: newNode.id
        }
      });

      if (!tree.root) {
        tree.root = newNode;
        steps.push({
          id: 'insert-root',
          description: `Insert ${value} as the root node`,
          highlightedLines: [],
          visualState: {
            tree,
            nodes,
            operation,
            value,
            newNodeId: newNode.id,
            insertedNodeId: newNode.id
          }
        });
      } else {
        let current = tree.root;
        let parent = null;
        let direction = '';

        while (true) {
          steps.push({
            id: `compare-${current.id}`,
            description: `Compare ${value} with current node ${current.value}`,
            highlightedLines: [],
            visualState: {
              tree,
              nodes,
              operation,
              value,
              newNodeId: newNode.id,
              currentNodeId: current.id
            }
          });

          if (value === current.value) {
            steps.push({
              id: `duplicate-${current.id}`,
              description: `${value} is a duplicate, insertion stopped`,
              highlightedLines: [],
              visualState: {
                tree,
                nodes,
                operation,
                value,
                newNodeId: newNode.id,
                currentNodeId: current.id,
                duplicate: true
              }
            });
            break;
          }

          parent = current;
          if (value < current.value) {
            direction = 'left';
            if (!current.left) {
              current.left = newNode;
              steps.push({
                id: `insert-left-${current.id}`,
                description: `Insert ${value} as left child of ${current.value}`,
                highlightedLines: [],
                visualState: {
                  tree,
                  nodes,
                  operation,
                  value,
                  newNodeId: newNode.id,
                  currentNodeId: current.id,
                  insertedNodeId: newNode.id
                }
              });
              break;
            }
            current = current.left;
          } else {
            direction = 'right';
            if (!current.right) {
              current.right = newNode;
              steps.push({
                id: `insert-right-${current.id}`,
                description: `Insert ${value} as right child of ${current.value}`,
                highlightedLines: [],
                visualState: {
                  tree,
                  nodes,
                  operation,
                  value,
                  newNodeId: newNode.id,
                  currentNodeId: current.id,
                  insertedNodeId: newNode.id
                }
              });
              break;
            }
            current = current.right;
          }
        }
      }
    } else if (operation === 'search') {
      // Search steps
      if (!tree.root) {
        steps.push({
          id: 'search-empty',
          description: `Tree is empty, ${value} not found`,
          highlightedLines: [],
          visualState: {
            tree,
            nodes,
            operation,
            value,
            notFound: true
          }
        });
      } else {
        let current = tree.root;
        let found = false;

        while (current && !found) {
          steps.push({
            id: `search-compare-${current.id}`,
            description: `Compare ${value} with current node ${current.value}`,
            highlightedLines: [],
            visualState: {
              tree,
              nodes,
              operation,
              value,
              currentNodeId: current.id
            }
          });

          if (value < current.value) {
            current = current.left;
          } else if (value > current.value) {
            current = current.right;
          } else {
            found = true;
            steps.push({
              id: `search-found-${current.id}`,
              description: `${value} found in the tree`,
              highlightedLines: [],
              visualState: {
                tree,
                nodes,
                operation,
                value,
                currentNodeId: current.id,
                found: true
              }
            });
            break;
          }
        }

        if (!found) {
          steps.push({
            id: 'search-not-found',
            description: `${value} not found in the tree`,
            highlightedLines: [],
            visualState: {
              tree,
              nodes,
              operation,
              value,
              notFound: true
            }
          });
        }
      }
    }

    steps.push({
      id: 'complete',
      description: `${operation === 'insert' ? 'Insertion' : 'Search'} complete`,
      highlightedLines: [],
      visualState: {
        tree,
        nodes,
        operation,
        value,
        complete: true
      }
    });

    return steps;
  },
  defaultInput: { operation: 'insert', value: 8, initialTree: [10, 5, 13, 11, 2, 16, 7] }
};

// Level Order Traversal
export const levelOrderTraversal: Algorithm = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  type: 'tree',
  description: 'Visualize level order traversal (breadth-first) of a binary tree.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function levelOrderTraversal(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);

    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }

  return result;
}

// Example usage:
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
console.log(levelOrderTraversal(root));`,
  explanation: `<p>Level order traversal visits all nodes of a tree level by level, starting from the root and moving from left to right.</p>
  <p>This traversal method is also known as breadth-first traversal.</p>`,
  generateSteps: (input: {}) => {
    const steps: AlgorithmStep[] = [];

    // Define the tree structure
    const tree = {
      root: {
        id: '1',
        value: 1,
        left: {
          id: '2',
          value: 2,
          left: { id: '4', value: 4, left: null, right: null },
          right: { id: '5', value: 5, left: null, right: null }
        },
        right: {
          id: '3',
          value: 3,
          left: null,
          right: null
        }
      }
    };

    const traversalOrder: number[] = [];
    const queue: any[] = [];

    steps.push({
      id: 'init',
      description: 'Initialize level order traversal',
      highlightedLines: [],
      visualState: {
        tree,
        queue: [],
        traversalOrder: []
      }
    });

    if (!tree.root) {
      steps.push({
        id: 'empty-tree',
        description: 'Tree is empty, traversal complete',
        highlightedLines: [],
        visualState: {
          tree,
          queue: [],
          traversalOrder: [],
          complete: true
        }
      });
      return steps;
    }

    queue.push(tree.root);

    steps.push({
      id: 'add-root',
      description: 'Add root node to the queue',
      highlightedLines: [],
      visualState: {
        tree,
        queue: queue.map(node => node.id),
        traversalOrder: [],
        currentNode: tree.root.id
      }
    });

    let iteration = 0;
    while (queue.length > 0) {
      iteration++;
      const node = queue.shift();
      traversalOrder.push(node.value);

      steps.push({
        id: `visit-${node.id}`,
        description: `Iteration ${iteration}: Visit node ${node.value}`,
        highlightedLines: [],
        visualState: {
          tree,
          queue: queue.map(n => n.id),
          traversalOrder: [...traversalOrder],
          currentNode: node.id
        }
      });

      if (node.left) {
        queue.push(node.left);
        steps.push({
          id: `enqueue-left-${node.left.id}`,
          description: `Enqueue left child ${node.left.value}`,
          highlightedLines: [],
          visualState: {
            tree,
            queue: queue.map(n => n.id),
            traversalOrder: [...traversalOrder],
            currentNode: node.id,
            enqueuedLeft: node.left.id
          }
        });
      }

      if (node.right) {
        queue.push(node.right);
        steps.push({
          id: `enqueue-right-${node.right.id}`,
          description: `Enqueue right child ${node.right.value}`,
          highlightedLines: [],
          visualState: {
            tree,
            queue: queue.map(n => n.id),
            traversalOrder: [...traversalOrder],
            currentNode: node.id,
            enqueuedRight: node.right.id
          }
        });
      }
    }

    steps.push({
      id: 'complete',
      description: `Traversal complete: ${traversalOrder.join(', ')}`,
      highlightedLines: [],
      visualState: {
        tree,
        queue: [],
        traversalOrder,
        complete: true
      }
    });

    return steps;
  },
  defaultInput: {}
};

// Pre-Order Traversal (iterative)
export const preOrderTraversal: Algorithm = {
  id: 'pre-order-traversal',
  name: 'Pre-Order Traversal (Iterative)',
  type: 'tree',
  description: 'Visualize iterative pre-order traversal of a binary tree.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function preOrderTraversal(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);

    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }

  return result;
}

// Example usage:
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
console.log(preOrderTraversal(root));`,
  explanation: `<p>Pre-order traversal visits the root node before its left and right subtrees.</p>
  <p>In the iterative version, a stack is used to keep track of the nodes to visit.</p>`,
  generateSteps: (input: {}) => {
    const steps: AlgorithmStep[] = [];

    // Define the tree structure
    const tree = {
      root: {
        id: '1',
        value: 1,
        left: {
          id: '2',
          value: 2,
          left: { id: '4', value: 4, left: null, right: null },
          right: { id: '5', value: 5, left: null, right: null }
        },
        right: {
          id: '3',
          value: 3,
          left: null,
          right: null
        }
      }
    };

    const traversalOrder: number[] = [];
    const stack: any[] = [];

    steps.push({
      id: 'init',
      description: 'Initialize iterative pre-order traversal',
      highlightedLines: [],
      visualState: {
        tree,
        stack: [],
        traversalOrder: []
      }
    });

    if (!tree.root) {
      steps.push({
        id: 'empty-tree',
        description: 'Tree is empty, traversal complete',
        highlightedLines: [],
        visualState: {
          tree,
          stack: [],
          traversalOrder: [],
          complete: true
        }
      });
      return steps;
    }

    stack.push(tree.root);

    steps.push({
      id: 'add-root',
      description: 'Add root node to the stack',
      highlightedLines: [],
      visualState: {
        tree,
        stack: stack.map(node => node.id),
        traversalOrder: [],
        currentNode: tree.root.id
      }
    });

    let iteration = 0;
    while (stack.length > 0) {
      iteration++;
      const node = stack.pop();
      traversalOrder.push(node.value);

      steps.push({
        id: `visit-${node.id}`,
        description: `Iteration ${iteration}: Visit node ${node.value}`,
        highlightedLines: [],
        visualState: {
          tree,
          stack: stack.map(n => n.id),
          traversalOrder: [...traversalOrder],
          currentNode: node.id
        }
      });

      if (node.right) {
        stack.push(node.right);
        steps.push({
          id: `push-right-${node.right.id}`,
          description: `Push right child ${node.right.value} onto the stack`,
          highlightedLines: [],
          visualState: {
            tree,
            stack: stack.map(n => n.id),
            traversalOrder: [...traversalOrder],
            currentNode: node.id,
            pushedRight: node.right.id
          }
        });
      }

      if (node.left) {
        stack.push(node.left);
        steps.push({
          id: `push-left-${node.left.id}`,
          description: `Push left child ${node.left.value} onto the stack`,
          highlightedLines: [],
          visualState: {
            tree,
            stack: stack.map(n => n.id),
            traversalOrder: [...traversalOrder],
            currentNode: node.id,
            pushedLeft: node.left.id
          }
        });
      }
    }

    steps.push({
      id: 'complete',
      description: `Traversal complete: ${traversalOrder.join(', ')}`,
      highlightedLines: [],
      visualState: {
        tree,
        stack: [],
        traversalOrder,
        complete: true
      }
    });

    return steps;
  },
  defaultInput: {}
};

// Post-Order Traversal (iterative)
export const postOrderTraversal: Algorithm = {
  id: 'post-order-traversal',
  name: 'Post-Order Traversal (Iterative)',
  type: 'tree',
  description: 'Visualize iterative post-order traversal of a binary tree.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function postOrderTraversal(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.unshift(node.value);

    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }

  return result;
}

// Example usage:
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
console.log(postOrderTraversal(root));`,
  explanation: `<p>Post-order traversal visits the left and right subtrees before the root node.</p>
  <p>In the iterative version, a stack is used, and the result is built by unshifting values to the beginning of the result array.</p>`,
  generateSteps: (input: {}) => {
    const steps: AlgorithmStep[] = [];

    // Define the tree structure
    const tree = {
      root: {
        id: '1',
        value: 1,
        left: {
          id: '2',
          value: 2,
          left: { id: '4', value: 4, left: null, right: null },
          right: { id: '5', value: 5, left: null, right: null }
        },
        right: {
          id: '3',
          value: 3,
          left: null,
          right: null
        }
      }
    };

    const traversalOrder: number[] = [];
    const stack: any[] = [];

    steps.push({
      id: 'init',
      description: 'Initialize iterative post-order traversal',
      highlightedLines: [],
      visualState: {
        tree,
        stack: [],
        traversalOrder: []
      }
    });

    if (!tree.root) {
      steps.push({
        id: 'empty-tree',
        description: 'Tree is empty, traversal complete',
        highlightedLines: [],
        visualState: {
          tree,
          stack: [],
          traversalOrder: [],
          complete: true
        }
      });
      return steps;
    }

    stack.push(tree.root);

    steps.push({
      id: 'add-root',
      description: 'Add root node to the stack',
      highlightedLines: [],
      visualState: {
        tree,
        stack: stack.map(node => node.id),
        traversalOrder: [],
        currentNode: tree.root.id
      }
    });

    let iteration = 0;
    while (stack.length > 0) {
      iteration++;
      const node = stack.pop();
      traversalOrder.unshift(node.value);

      steps.push({
        id: `visit-${node.id}`,
        description: `Iteration ${iteration}: Visit node ${node.value}`,
        highlightedLines: [],
        visualState: {
          tree,
          stack: stack.map(n => n.id),
          traversalOrder: [...traversalOrder],
          currentNode: node.id
        }
      });

      if (node.left) {
        stack.push(node.left);
        steps.push({
          id: `push-left-${node.left.id}`,
          description: `Push left child ${node.left.value} onto the stack`,
          highlightedLines: [],
          visualState: {
            tree,
            stack: stack.map(n => n.id),
            traversalOrder: [...traversalOrder],
            currentNode: node.id,
            pushedLeft: node.left.id
          }
        });
      }

      if (node.right) {
        stack.push(node.right);
        steps.push({
          id: `push-right-${node.right.id}`,
          description: `Push right child ${node.right.value} onto the stack`,
          highlightedLines: [],
          visualState: {
            tree,
            stack: stack.map(n => n.id),
            traversalOrder: [...traversalOrder],
            currentNode: node.id,
            pushedRight: node.right.id
          }
        });
      }
    }

    steps.push({
      id: 'complete',
      description: `Traversal complete: ${traversalOrder.join(', ')}`,
      highlightedLines: [],
      visualState: {
        tree,
        stack: [],
        traversalOrder,
        complete: true
      }
    });

    return steps;
  },
  defaultInput: {}
};
