// Fix several type errors related to arrays in this file
import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Binary Search Tree
export const binarySearchTree: Algorithm = {
  id: 'binary-search-tree',
  name: 'Binary Search Tree',
  type: 'tree',
  description: 'A binary search tree (BST) is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys less than the node\'s key; The right subtree of a node contains only nodes with keys greater than the node\'s key; Both the left and right subtrees must also be binary search trees.',
  timeComplexity: 'O(log n) average, O(n) worst case',
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
    if (this.root === null) {
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
    if (this.root === null) return false;
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
  explanation: `<p>A binary search tree (BST) is a particular type of data structure that stores data in a hierarchical manner. Each node in the tree has a value, and each node can have at most two children: a left child and a right child.</p>
  <p>The key property of a binary search tree is that for any given node, all nodes in its left subtree have values less than the node's value, and all nodes in its right subtree have values greater than the node's value.</p>
  <p>This property makes searching for a value in a binary search tree very efficient. Starting from the root node, you can compare the value you're searching for with the value of the current node. If the value is less than the current node's value, you can move to the left child. If the value is greater, you can move to the right child. This process is repeated until the value is found or you reach a leaf node.</p>`,
  generateSteps: (input: { value: number }) => {
    const { value } = input;
    const steps: AlgorithmStep[] = [];
    const tree = new BinarySearchTreeVisualization();

    steps.push({
      id: 'init',
      description: `Initialize a binary search tree and search for value ${value}`,
      highlightedLines: [1, 2],
      visualState: {
        tree: tree.nodes,
        value,
        currentNode: null,
        found: false
      }
    });

    // Insert values into the tree
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    for (let i = 0; i < values.length; i++) {
      tree.insert(values[i]);
      steps.push({
        id: `insert-${values[i]}`,
        description: `Insert value ${values[i]} into the tree`,
        highlightedLines: [15, 16],
        visualState: {
          tree: tree.nodes,
          value,
          currentNode: null,
          found: false
        }
      });
    }

    let current = tree.root;
    let found = false;

    steps.push({
      id: 'search-start',
      description: `Start searching for value ${value} from the root`,
      highlightedLines: [31, 32],
      visualState: {
        tree: tree.nodes,
        value,
        currentNode: current ? current.value : null,
        found: false
      }
    });

    while (current && !found) {
      steps.push({
        id: `compare-${current.value}`,
        description: `Compare ${value} with current node ${current.value}`,
        highlightedLines: [33],
        visualState: {
          tree: tree.nodes,
          value,
          currentNode: current.value,
          found: false
        }
      });

      if (value < current.value) {
        current = tree.nodes[current.left];
        steps.push({
          id: `go-left-${current ? current.value : 'null'}`,
          description: `Go left since ${value} < ${current.value}`,
          highlightedLines: [34],
          visualState: {
            tree: tree.nodes,
            value,
            currentNode: current ? current.value : null,
            found: false
          }
        });
      } else if (value > current.value) {
        current = tree.nodes[current.right];
        steps.push({
          id: `go-right-${current ? current.value : 'null'}`,
          description: `Go right since ${value} > ${current.value}`,
          highlightedLines: [36],
          visualState: {
            tree: tree.nodes,
            value,
            currentNode: current ? current.value : null,
            found: false
          }
        });
      } else {
        found = true;
        steps.push({
          id: `found-${value}`,
          description: `Found ${value} in the tree`,
          highlightedLines: [38],
          visualState: {
            tree: tree.nodes,
            value,
            currentNode: current.value,
            found: true
          }
        });
      }
    }

    if (!found) {
      steps.push({
        id: 'not-found',
        description: `${value} not found in the tree`,
        highlightedLines: [42],
        visualState: {
          tree: tree.nodes,
          value,
          currentNode: null,
          found: false
        }
      });
    }

    return steps;
  },
  defaultInput: { value: 7 }
};

class NodeVisualization {
  value: number;
  left: number | null;
  right: number | null;
  x: number;
  y: number;

  constructor(value: number, x: number = 0, y: number = 0) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
  }
}

class BinarySearchTreeVisualization {
  root: NodeVisualization | null;
  nodes: { [key: number]: NodeVisualization };
  counter: number;

  constructor() {
    this.root = null;
    this.nodes = {};
    this.counter = 0;
  }

  insert(value: number) {
    const newNode = new NodeVisualization(value);
    this.nodes[this.counter] = newNode;
    newNode.x = 500;
    newNode.y = 50;

    if (this.root === null) {
      this.root = newNode;
      this.counter++;
      return this;
    }

    let current = this.root;
    let level = 1;
    while (true) {
      if (value === current.value) return undefined;

      if (value < current.value) {
        if (current.left === null) {
          newNode.x = current.x - 150 / level;
          newNode.y = current.y + 75;
          current.left = this.counter;
          this.counter++;
          return this;
        }
        current = this.nodes[current.left];
      } else {
        if (current.right === null) {
          newNode.x = current.x + 150 / level;
          newNode.y = current.y + 75;
          current.right = this.counter;
          this.counter++;
          return this;
        }
        current = this.nodes[current.right];
      }
      level++;
    }
  }
}

// Binary Tree Traversal
export const binaryTreeTraversal: Algorithm = {
  id: 'binary-tree-traversal',
  name: 'Binary Tree Traversal',
  type: 'tree',
  description: 'Demonstrates different ways to traverse a binary tree: inorder, preorder, and postorder.',
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

function inorderTraversal(node) {
  if (node) {
    inorderTraversal(node.left);
    console.log(node.value);
    inorderTraversal(node.right);
  }
}

function preorderTraversal(node) {
  if (node) {
    console.log(node.value);
    preorderTraversal(node.left);
    preorderTraversal(node.right);
  }
}

function postorderTraversal(node) {
  if (node) {
    postorderTraversal(node.left);
    postorderTraversal(node.right);
    console.log(node.value);
  }
}`,
  explanation: `<p>Binary tree traversal refers to the process of visiting (examining and/or updating) each node in a binary tree data structure, exactly once. Such traversals are classified by the order in which the nodes are visited.</p>
  <ul>
    <li><strong>Inorder Traversal:</strong> Visit the left subtree, then the root, and then the right subtree.</li>
    <li><strong>Preorder Traversal:</strong> Visit the root, then the left subtree, and then the right subtree.</li>
    <li><strong>Postorder Traversal:</strong> Visit the left subtree, then the right subtree, and then the root.</li>
  </ul>`,
  generateSteps: (input: { traversalType: string }) => {
    const { traversalType = 'inorder' } = input;
    const steps: AlgorithmStep[] = [];
    const tree = new BinarySearchTreeVisualization();

    // Insert values into the tree
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    for (let i = 0; i < values.length; i++) {
      tree.insert(values[i]);
    }

    steps.push({
      id: 'init',
      description: `Initialize a binary search tree and perform ${traversalType} traversal`,
      highlightedLines: [1, 2],
      visualState: {
        tree: tree.nodes,
        traversalType,
        currentNode: null,
        visited: []
      }
    });

    const traverse = (node: NodeVisualization | null, order: string) => {
      if (!node) return;

      if (order === 'preorder') {
        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value} (Preorder)`,
          visualState: {
            tree: tree.nodes,
            traversalType,
            currentNode: node.value,
            visited: [...(steps[steps.length - 1]?.visualState?.visited || []), node.value]
          }
        });
        traverse(tree.nodes[node.left], order);
        traverse(tree.nodes[node.right], order);
      } else if (order === 'inorder') {
        traverse(tree.nodes[node.left], order);
        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value} (Inorder)`,
          visualState: {
            tree: tree.nodes,
            traversalType,
            currentNode: node.value,
            visited: [...(steps[steps.length - 1]?.visualState?.visited || []), node.value]
          }
        });
        traverse(tree.nodes[node.right], order);
      } else if (order === 'postorder') {
        traverse(tree.nodes[node.left], order);
        traverse(tree.nodes[node.right], order);
        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value} (Postorder)`,
          visualState: {
            tree: tree.nodes,
            traversalType,
            currentNode: node.value,
            visited: [...(steps[steps.length - 1]?.visualState?.visited || []), node.value]
          }
        });
      }
    };

    traverse(tree.root, traversalType);

    return steps;
  },
  defaultInput: { traversalType: 'inorder' }
};

// Level Order Traversal
export const levelOrderTraversal: Algorithm = {
  id: 'level-order-traversal',
  name: 'Level Order Traversal',
  type: 'tree',
  description: 'Traverses a binary tree level by level, from left to right.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
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
}`,
  explanation: `<p>Level order traversal visits all nodes level by level, starting from the root and moving from left to right.</p>
  <p>This is typically implemented using a queue. The root node is added to the queue, then the algorithm enters a loop where it removes a node from the queue, visits it, and adds its children to the queue.</p>`,
  generateSteps: (input: { withLevels: boolean }) => {
    const { withLevels = false } = input;
    const steps: AlgorithmStep[] = [];
    const tree = new BinarySearchTreeVisualization();

    // Insert values into the tree
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    for (let i = 0; i < values.length; i++) {
      tree.insert(values[i]);
    }

    steps.push({
      id: 'init',
      description: `Initialize a binary search tree and perform level order traversal ${withLevels ? 'with' : 'without'} levels`,
      highlightedLines: [1, 2],
      visualState: {
        tree: tree.nodes,
        withLevels,
        currentNode: null,
        visited: [],
        queue: []
      }
    });

    const queue: NodeVisualization[] = [];
    if (tree.root) {
      queue.push(tree.root);
    }
    let visitedSoFar: number[] = []; // Initialize as empty array instead of number

    steps.push({
      id: 'start',
      description: 'Add root to the queue',
      visualState: {
        tree: tree.nodes,
        withLevels,
        currentNode: tree.root ? tree.root.value : null,
        visited: [],
        queue: queue.map(node => node.value)
      }
    });

    let level = 0;
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: number[] = [];

      steps.push({
        id: `level-start-${level}`,
        description: `Start processing level ${level}`,
        visualState: {
          tree: tree.nodes,
          withLevels,
          currentNode: null,
          visited: [...visitedSoFar],
          queue: queue.map(node => node.value),
          currentLevel
        }
      });

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();

        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value}`,
          visualState: {
            tree: tree.nodes,
            withLevels,
            currentNode: node.value,
            visited: [...visitedSoFar, node.value],
            queue: queue.map(node => node.value),
            currentLevel
          }
        });

        visitedSoFar.push(node.value);
        currentLevel.push(node.value);

        if (node.left !== null && tree.nodes[node.left]) {
          queue.push(tree.nodes[node.left]);
          steps.push({
            id: `enqueue-left-${tree.nodes[node.left].value}`,
            description: `Enqueue left child ${tree.nodes[node.left].value}`,
            visualState: {
              tree: tree.nodes,
              withLevels,
              currentNode: node.value,
              visited: [...visitedSoFar],
              queue: queue.map(node => node.value),
              currentLevel
            }
          });
        }

        if (node.right !== null && tree.nodes[node.right]) {
          queue.push(tree.nodes[node.right]);
          steps.push({
            id: `enqueue-right-${tree.nodes[node.right].value}`,
            description: `Enqueue right child ${tree.nodes[node.right].value}`,
            visualState: {
              tree: tree.nodes,
              withLevels,
              currentNode: node.value,
              visited: [...visitedSoFar],
              queue: queue.map(node => node.value),
              currentLevel
            }
          });
        }
      }

      level++;

      steps.push({
        id: `level-end-${level}`,
        description: `End processing level ${level - 1}`,
        visualState: {
          tree: tree.nodes,
          withLevels,
          currentNode: null,
          visited: [...visitedSoFar],
          queue: queue.map(node => node.value),
          currentLevel
        }
      });
    }

    return steps;
  },
  defaultInput: { withLevels: false }
};

// Pre-order Traversal
export const preOrderTraversal: Algorithm = {
  id: 'pre-order-traversal',
  name: 'Pre-order Traversal',
  type: 'tree',
  description: 'Traverses a binary tree using pre-order traversal (recursive and iterative).',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation (Recursive)
function preOrderTraversalRecursive(root) {
  if (!root) return [];

  const result = [root.value];
  result.push(...preOrderTraversalRecursive(root.left));
  result.push(...preOrderTraversalRecursive(root.right));

  return result;
}

// JavaScript Implementation (Iterative)
function preOrderTraversalIterative(root) {
  if (!root) return [];

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
  explanation: `<p>Pre-order traversal visits the current node first, then recursively visits the left subtree, and finally the right subtree.</p>
  <p>The iterative approach uses a stack to keep track of the nodes to visit. The current node is visited, then its right child (if it exists) and left child (if it exists) are pushed onto the stack.</p>`,
  generateSteps: (input: { iterative: boolean }) => {
    const { iterative = false } = input;
    const steps: AlgorithmStep[] = [];
    const tree = new BinarySearchTreeVisualization();

    // Insert values into the tree
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    for (let i = 0; i < values.length; i++) {
      tree.insert(values[i]);
    }

    steps.push({
      id: 'init',
      description: `Initialize a binary search tree and perform ${iterative ? 'iterative' : 'recursive'} pre-order traversal`,
      highlightedLines: [1, 2],
      visualState: {
        tree: tree.nodes,
        iterative,
        currentNode: null,
        visited: [],
        stack: []
      }
    });

    if (iterative) {
      const stack: NodeVisualization[] = [];
      if (tree.root) {
        stack.push(tree.root);
      }
      let visitedSoFar: number[] = []; // Initialize as empty array instead of number

      steps.push({
        id: 'start',
        description: 'Add root to the stack',
        visualState: {
          tree: tree.nodes,
          iterative,
          currentNode: tree.root ? tree.root.value : null,
          visited: [],
          stack: stack.map(node => node.value)
        }
      });

      while (stack.length > 0) {
        const node = stack.pop();

        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value}`,
          visualState: {
            tree: tree.nodes,
            iterative,
            currentNode: node.value,
            visited: [...visitedSoFar, node.value],
            stack: stack.map(node => node.value)
          }
        });

        visitedSoFar.push(node.value);

        if (node.right !== null && tree.nodes[node.right]) {
          stack.push(tree.nodes[node.right]);
          steps.push({
            id: `push-right-${tree.nodes[node.right].value}`,
            description: `Push right child ${tree.nodes[node.right].value} onto the stack`,
            visualState: {
              tree: tree.nodes,
              iterative,
              currentNode: node.value,
              visited: [...visitedSoFar],
              stack: stack.map(node => node.value)
            }
          });
        }

        if (node.left !== null && tree.nodes[node.left]) {
          stack.push(tree.nodes[node.left]);
          steps.push({
            id: `push-left-${tree.nodes[node.left].value}`,
            description: `Push left child ${tree.nodes[node.left].value} onto the stack`,
            visualState: {
              tree: tree.nodes,
              iterative,
              currentNode: node.value,
              visited: [...visitedSoFar],
              stack: stack.map(node => node.value)
            }
          });
        }
      }
    } else {
      const visitedSoFar: number[] = []; // Initialize as empty array instead of number

      const traverse = (node: NodeVisualization | null) => {
        if (!node) return;

        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value}`,
          visualState: {
            tree: tree.nodes,
            iterative,
            currentNode: node.value,
            visited: [...visitedSoFar, node.value],
            stack: []
          }
        });

        visitedSoFar.push(node.value);

        traverse(tree.nodes[node.left]);
        traverse(tree.nodes[node.right]);
      };

      traverse(tree.root);
    }

    return steps;
  },
  defaultInput: { iterative: false }
};

// Post-order Traversal
export const postOrderTraversal: Algorithm = {
  id: 'post-order-traversal',
  name: 'Post-order Traversal',
  type: 'tree',
  description: 'Traverses a binary tree using post-order traversal (recursive and iterative).',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation (Recursive)
function postOrderTraversalRecursive(root) {
  if (!root) return [];

  const result = [];
  result.push(...postOrderTraversalRecursive(root.left));
  result.push(...postOrderTraversalRecursive(root.right));
  result.push(root.value);

  return result;
}

// JavaScript Implementation (Iterative)
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
    const node = stack2.pop();
    result.push(node.value);
  }

  return result;
}`,
  explanation: `<p>Post-order traversal visits the left subtree first, then the right subtree, and finally the current node.</p>
  <p>The iterative approach uses two stacks. The first stack is used to traverse the tree, and the second stack is used to store the nodes in the reverse order of their visit.</p>`,
  generateSteps: (input: { iterative: boolean }) => {
    const { iterative = false } = input;
    const steps: AlgorithmStep[] = [];
    const tree = new BinarySearchTreeVisualization();

    // Insert values into the tree
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    for (let i = 0; i < values.length; i++) {
      tree.insert(values[i]);
    }

    steps.push({
      id: 'init',
      description: `Initialize a binary search tree and perform ${iterative ? 'iterative' : 'recursive'} post-order traversal`,
      highlightedLines: [1, 2],
      visualState: {
        tree: tree.nodes,
        iterative,
        currentNode: null,
        visited: [],
        stack1: [],
        stack2: []
      }
    });

    if (iterative) {
      let stack1: number[] = [0]; // Initialize as empty array with root
      let stack2: number[] = []; // Initialize as empty array

      if (tree.root) {
        stack1 = [tree.root.value];
      }

      steps.push({
        id: 'start',
        description: 'Add root to the stack1',
        visualState: {
          tree: tree.nodes,
          iterative,
          currentNode: tree.root ? tree.root.value : null,
          visited: [],
          stack1: stack1,
          stack2: stack2
        }
      });

      while (stack1.length > 0) {
        const nodeIdx = stack1.pop()!;
        const node = tree.nodes[nodeIdx];
        stack2.push(nodeIdx);

        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value} and push to stack2`,
          visualState: {
            tree: tree.nodes,
            iterative,
            currentNode: node.value,
            visited: [],
            stack1: stack1,
            stack2: stack2.map(node => tree.nodes[node] ? tree.nodes[node].value : null)
          }
        });

        if (node.left !== null && tree.nodes[node.left]) {
          stack1.push(node.left);
          steps.push({
            id: `push-left-${tree.nodes[node.left].value}`,
            description: `Push left child ${tree.nodes[node.left].value} onto the stack1`,
            visualState: {
              tree: tree.nodes,
              iterative,
              currentNode: node.value,
              visited: [],
              stack1: stack1,
              stack2: stack2.map(node => tree.nodes[node] ? tree.nodes[node].value : null)
            }
          });
        }

        if (node.right !== null && tree.nodes[node.right]) {
          stack1.push(node.right);
          steps.push({
            id: `push-right-${tree.nodes[node.right].value}`,
            description: `Push right child ${tree.nodes[node.right].value} onto the stack1`,
            visualState: {
              tree: tree.nodes,
              iterative,
              currentNode: node.value,
              visited: [],
              stack1: stack1,
              stack2: stack2.map(node => tree.nodes[node] ? tree.nodes[node].value : null)
            }
          });
        }
      }

      const visitedSoFar: number[] = [];
      while (stack2.length > 0) {
        const nodeIdx = stack2.pop()!;
        const node = tree.nodes[nodeIdx];
        visitedSoFar.push(node.value);

        steps.push({
          id: `visit2-${node.value}`,
          description: `Visit node ${node.value} from stack2`,
          visualState: {
            tree: tree.nodes,
            iterative,
            currentNode: node.value,
            visited: visitedSoFar,
            stack1: stack1,
            stack2: stack2.map(node => tree.nodes[node] ? tree.nodes[node].value : null)
          }
        });
      }
    } else {
      const visitedSoFar: number[] = []; // Initialize as empty array instead of number

      const traverse = (node: NodeVisualization | null) => {
        if (!node) return;

        traverse(tree.nodes[node.left]);
        traverse(tree.nodes[node.right]);

        steps.push({
          id: `visit-${node.value}`,
          description: `Visit node ${node.value}`,
          visualState: {
            tree: tree.nodes,
            iterative,
            currentNode: node.value,
            visited: [...visitedSoFar, node.value],
            stack1: [],
            stack2: []
          }
        });

        visitedSoFar.push(node.value);
      };

      traverse(tree.root);
    }

    return steps;
  },
  defaultInput: { iterative: false }
};

// In-order Traversal
export const inOrderTraversal: Algorithm = {
  id: 'in-order-traversal',
  name: 'In-order Traversal',
  type: 'tree',
  description: 'Traverses a binary tree using in-order traversal (recursive and iterative).',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  code: `// JavaScript Implementation (Recursive)
function inOrderTraversalRecursive(root) {
  if (!root) return [];

  const result = [];
  result.push(...inOrderTraversalRecursive(root.left));
  result.push(root.value);
  result.push(...inOrderTraversalRecursive(root.right));

  return result;
}

// JavaScript Implementation (Iterative)
function inOrderTraversalIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    result.push(current.value);
    current = current.right;
  }

  return result;
}`,
  explanation: `<p>In-order traversal visits the left subtree first, then the current node, and finally the right subtree.</p>
  <p>The iterative approach uses a stack to keep track of the nodes to visit. The current node is pushed onto the stack, then the algorithm moves to the left child (if it exists). When there are no more left children, the algorithm pops a node from the stack, visits it, and moves to its right child.</p>`,
  generateSteps: (input: { iterative: boolean }) => {
    const { iterative = false } = input;
    const steps: AlgorithmStep[] = [];
    const tree = new BinarySearchTreeVisualization();

    // Insert values into the tree
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    for (let i = 0; i < values.length; i++) {
      tree.insert(values[i]);
    }

    steps.push({
      id: 'init',
      description: `Initialize a binary search tree and perform ${iterative ? 'iterative' : 'recursive'} in-order traversal`,
      highlightedLines: [1, 2],
      visualState: {
        tree: tree.nodes,
        iterative,
        currentNode: null,
        visited: [],
        stack: []
      }
    });

    if (iterative) {
      const stack: NodeVisualization[] = [];
      let current: NodeVisualization | null = tree.root;
      let visitedSoFar: number[] = []; // Initialize as empty array instead of number

      steps.push({
        id: 'start',
        description: 'Initialize stack and current node',
        visualState: {
          tree: tree.nodes,
          iterative,
