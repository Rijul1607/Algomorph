
import { Algorithm, AlgorithmStep } from '@/types/algorithm';

// Dijkstra's Algorithm
export const dijkstra: Algorithm = {
  id: 'dijkstra',
  name: "Dijkstra's Algorithm",
  type: 'graph',
  description: 'Find the shortest path between nodes in a weighted graph with non-negative weights.',
  timeComplexity: 'O(V² + E) with simple implementation, O((V+E)log V) with min-heap',
  spaceComplexity: 'O(V + E)',
  code: `// JavaScript Implementation
function dijkstra(graph, startNode) {
  const nodes = Object.keys(graph);
  const distances = {};
  const previous = {};
  const unvisited = new Set(nodes);
  
  // Initialize distances
  for (let node of nodes) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
  }
  
  while (unvisited.size > 0) {
    // Find closest unvisited node
    let closest = null;
    
    for (let node of unvisited) {
      if (closest === null || distances[node] < distances[closest]) {
        closest = node;
      }
    }
    
    if (distances[closest] === Infinity) break; // Unreachable nodes
    
    unvisited.delete(closest);
    
    // Update distances to neighbors
    for (let neighbor in graph[closest]) {
      const distance = distances[closest] + graph[closest][neighbor];
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = closest;
      }
    }
  }
  
  // Construct paths
  const paths = {};
  for (let node of nodes) {
    const path = [];
    let current = node;
    
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    
    paths[node] = {
      distance: distances[node],
      path: path
    };
  }
  
  return paths;
}`,
  explanation: `<p>Dijkstra's algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights.</p>
  <p>The algorithm works by:</p>
  <ol>
    <li>Initializing distances from the start node to all other nodes as infinity (except the start node itself, which is 0)</li>
    <li>Maintaining a set of unvisited nodes</li>
    <li>In each step, selecting the unvisited node with the minimum distance</li>
    <li>For the current node, calculating distances to all its neighbors and updating if a shorter path is found</li>
    <li>Marking the current node as visited and repeating the process</li>
  </ol>
  <p>This algorithm has many real-world applications, including:</p>
  <ul>
    <li>GPS navigation systems</li>
    <li>Network routing protocols</li>
    <li>Flight scheduling</li>
    <li>Telecommunications networks</li>
  </ul>
  <p>The time complexity can be improved from O(V² + E) to O((V+E)log V) by using a priority queue (min-heap) instead of a simple array to find the node with the minimum distance.</p>`,
  generateSteps: (input: { graph: Record<string, Record<string, number>>, startNode: string }) => {
    const graph = input?.graph || {
      A: { B: 4, C: 2 },
      B: { A: 4, C: 1, D: 5 },
      C: { A: 2, B: 1, D: 8, E: 10 },
      D: { B: 5, C: 8, E: 2, F: 6 },
      E: { C: 10, D: 2, F: 3 },
      F: { D: 6, E: 3 }
    };
    const startNode = input?.startNode || 'A';
    
    const steps: AlgorithmStep[] = [];
    const nodes = Object.keys(graph);
    
    steps.push({
      id: 'init',
      description: `Initialize Dijkstra's algorithm from node ${startNode}`,
      highlightedLines: [2, 3, 4, 5, 6],
      visualState: { 
        graph,
        startNode,
        nodes,
        currentNode: null,
        distances: null,
        previous: null,
        unvisited: null
      }
    });
    
    // Initialize distances
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const unvisited = new Set(nodes);
    
    for (let node of nodes) {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
    }
    
    steps.push({
      id: 'init-distances',
      description: `Initialize distances: ${startNode} = 0, all others = ∞`,
      highlightedLines: [8, 9, 10, 11],
      visualState: { 
        graph,
        startNode,
        nodes,
        distances: { ...distances },
        previous: { ...previous },
        unvisited: Array.from(unvisited)
      }
    });
    
    let iteration = 0;
    while (unvisited.size > 0) {
      iteration++;
      
      // Find closest unvisited node
      let closest: string | null = null;
      
      for (let node of unvisited) {
        if (closest === null || distances[node] < distances[closest]) {
          closest = node;
        }
      }
      
      if (closest === null || distances[closest] === Infinity) {
        // Unreachable nodes
        steps.push({
          id: `unreachable-${iteration}`,
          description: 'Remaining nodes are unreachable',
          highlightedLines: [23],
          visualState: { 
            graph,
            startNode,
            nodes,
            distances: { ...distances },
            previous: { ...previous },
            unvisited: Array.from(unvisited),
            iteration
          }
        });
        break;
      }
      
      steps.push({
        id: `closest-${iteration}`,
        description: `Iteration ${iteration}: Select closest node ${closest} with distance ${distances[closest]}`,
        highlightedLines: [16, 17, 18, 19, 20, 21],
        visualState: { 
          graph,
          startNode,
          nodes,
          distances: { ...distances },
          previous: { ...previous },
          unvisited: Array.from(unvisited),
          currentNode: closest,
          iteration
        }
      });
      
      unvisited.delete(closest);
      
      steps.push({
        id: `visited-${iteration}`,
        description: `Mark node ${closest} as visited`,
        highlightedLines: [25],
        visualState: { 
          graph,
          startNode,
          nodes,
          distances: { ...distances },
          previous: { ...previous },
          unvisited: Array.from(unvisited),
          currentNode: closest,
          iteration,
          justVisited: closest
        }
      });
      
      // Update distances to neighbors
      for (let neighbor in graph[closest]) {
        if (!unvisited.has(neighbor)) continue; // Skip visited neighbors
        
        const oldDistance = distances[neighbor];
        const newDistance = distances[closest] + graph[closest][neighbor];
        
        steps.push({
          id: `check-neighbor-${iteration}-${neighbor}`,
          description: `Check neighbor ${neighbor}: current = ${oldDistance}, new = ${newDistance}`,
          highlightedLines: [28, 29],
          visualState: { 
            graph,
            startNode,
            nodes,
            distances: { ...distances },
            previous: { ...previous },
            unvisited: Array.from(unvisited),
            currentNode: closest,
            currentNeighbor: neighbor,
            currentEdge: {
              from: closest,
              to: neighbor,
              weight: graph[closest][neighbor]
            },
            oldDistance,
            newDistance,
            iteration
          }
        });
        
        if (newDistance < oldDistance) {
          distances[neighbor] = newDistance;
          previous[neighbor] = closest;
          
          steps.push({
            id: `update-neighbor-${iteration}-${neighbor}`,
            description: `Update distance to ${neighbor}: ${oldDistance} → ${newDistance}, previous = ${closest}`,
            highlightedLines: [31, 32, 33],
            visualState: { 
              graph,
              startNode,
              nodes,
              distances: { ...distances },
              previous: { ...previous },
              unvisited: Array.from(unvisited),
              currentNode: closest,
              currentNeighbor: neighbor,
              improved: true,
              iteration
            }
          });
        }
      }
    }
    
    // Construct paths
    const paths: Record<string, { distance: number, path: string[] }> = {};
    
    for (let node of nodes) {
      const path: string[] = [];
      let current: string | null = node;
      
      while (current !== null) {
        path.unshift(current);
        current = previous[current];
      }
      
      paths[node] = {
        distance: distances[node],
        path: path
      };
    }
    
    steps.push({
      id: 'result',
      description: 'Final shortest paths from start node',
      highlightedLines: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
      visualState: { 
        graph,
        startNode,
        nodes,
        distances: { ...distances },
        previous: { ...previous },
        paths,
        complete: true
      }
    });
    
    return steps;
  },
  defaultInput: { 
    graph: {
      A: { B: 4, C: 2 },
      B: { A: 4, C: 1, D: 5 },
      C: { A: 2, B: 1, D: 8, E: 10 },
      D: { B: 5, C: 8, E: 2, F: 6 },
      E: { C: 10, D: 2, F: 3 },
      F: { D: 6, E: 3 }
    },
    startNode: 'A'
  }
};

// Breadth-First Search (BFS)
export const bfs: Algorithm = {
  id: 'bfs',
  name: 'Breadth-First Search',
  type: 'graph',
  description: 'Traverse a graph level by level, visiting all neighbors of a node before moving to the next level.',
  timeComplexity: 'O(V + E) where V is the number of vertices and E is the number of edges',
  spaceComplexity: 'O(V)',
  code: `// JavaScript Implementation
function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];
  const distances = {};
  const previous = {};
  
  // Initialize distances
  for (let node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
  }
  
  visited.add(startNode);
  
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);
    
    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        
        // Record distance and previous node
        distances[neighbor] = distances[current] + 1;
        previous[neighbor] = current;
      }
    }
  }
  
  return {
    traversal: result,
    distances,
    previous
  };
}`,
  explanation: `<p>Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth level before moving on to vertices at the next depth level.</p>
  <p>The algorithm works by:</p>
  <ol>
    <li>Starting at a chosen node</li>
    <li>Exploring all its neighbors before moving to any of their children</li>
    <li>Using a queue to keep track of nodes to visit next</li>
  </ol>
  <p>BFS has several important properties:</p>
  <ul>
    <li>It finds the shortest path in an unweighted graph</li>
    <li>It explores nodes level by level</li>
    <li>It can be used to find connected components</li>
  </ul>
  <p>Applications of BFS include:</p>
  <ul>
    <li>Finding shortest paths in unweighted graphs</li>
    <li>Web crawlers</li>
    <li>Social network connections (finding "friends of friends")</li>
    <li>Puzzle solving (e.g., sliding puzzles)</li>
  </ul>`,
  generateSteps: (input: { graph: Record<string, string[]>, startNode: string }) => {
    const graph = input?.graph || {
      A: ['B', 'C', 'D'],
      B: ['A', 'E', 'F'],
      C: ['A', 'G', 'H'],
      D: ['A', 'I'],
      E: ['B'],
      F: ['B'],
      G: ['C'],
      H: ['C'],
      I: ['D']
    };
    const startNode = input?.startNode || 'A';
    
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: `Initialize BFS from node ${startNode}`,
      highlightedLines: [2, 3, 4, 5, 6],
      visualState: { 
        graph,
        startNode,
        visited: [],
        queue: [],
        traversal: []
      }
    });
    
    const visited = new Set<string>();
    const queue: string[] = [startNode];
    const result: string[] = [];
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    
    // Initialize distances and previous
    for (let node in graph) {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
    }
    
    visited.add(startNode);
    
    steps.push({
      id: 'start',
      description: `Start with node ${startNode}, mark as visited and add to queue`,
      highlightedLines: [8, 9, 10, 11, 12, 14],
      visualState: { 
        graph,
        startNode,
        visited: Array.from(visited),
        queue: [...queue],
        traversal: [...result],
        distances: { ...distances },
        previous: { ...previous }
      }
    });
    
    let iteration = 0;
    while (queue.length > 0) {
      iteration++;
      const current = queue.shift()!;
      result.push(current);
      
      steps.push({
        id: `dequeue-${iteration}`,
        description: `Iteration ${iteration}: Dequeue and process node ${current}`,
        highlightedLines: [16, 17, 18],
        visualState: { 
          graph,
          startNode,
          visited: Array.from(visited),
          queue: [...queue],
          traversal: [...result],
          currentNode: current,
          distances: { ...distances },
          previous: { ...previous },
          iteration
        }
      });
      
      for (let neighbor of graph[current]) {
        steps.push({
          id: `check-neighbor-${iteration}-${neighbor}`,
          description: `Check neighbor ${neighbor} of node ${current}`,
          highlightedLines: [20, 21],
          visualState: { 
            graph,
            startNode,
            visited: Array.from(visited),
            queue: [...queue],
            traversal: [...result],
            currentNode: current,
            currentNeighbor: neighbor,
            distances: { ...distances },
            previous: { ...previous },
            iteration
          }
        });
        
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          
          // Record distance and previous node
          distances[neighbor] = distances[current] + 1;
          previous[neighbor] = current;
          
          steps.push({
            id: `visit-neighbor-${iteration}-${neighbor}`,
            description: `Neighbor ${neighbor} not visited: add to queue, distance = ${distances[neighbor]}`,
            highlightedLines: [22, 23, 24, 26, 27, 28],
            visualState: { 
              graph,
              startNode,
              visited: Array.from(visited),
              queue: [...queue],
              traversal: [...result],
              currentNode: current,
              currentNeighbor: neighbor,
              justVisited: neighbor,
              distances: { ...distances },
              previous: { ...previous },
              iteration
            }
          });
        } else {
          steps.push({
            id: `skip-neighbor-${iteration}-${neighbor}`,
            description: `Neighbor ${neighbor} already visited: skip`,
            highlightedLines: [21],
            visualState: { 
              graph,
              startNode,
              visited: Array.from(visited),
              queue: [...queue],
              traversal: [...result],
              currentNode: current,
              currentNeighbor: neighbor,
              alreadyVisited: true,
              distances: { ...distances },
              previous: { ...previous },
              iteration
            }
          });
        }
      }
    }
    
    steps.push({
      id: 'result',
      description: 'BFS traversal complete',
      highlightedLines: [33, 34, 35, 36, 37, 38],
      visualState: { 
        graph,
        startNode,
        visited: Array.from(visited),
        queue: [],
        traversal: result,
        distances,
        previous,
        complete: true
      }
    });
    
    return steps;
  },
  defaultInput: { 
    graph: {
      A: ['B', 'C', 'D'],
      B: ['A', 'E', 'F'],
      C: ['A', 'G', 'H'],
      D: ['A', 'I'],
      E: ['B'],
      F: ['B'],
      G: ['C'],
      H: ['C'],
      I: ['D']
    },
    startNode: 'A'
  }
};

// Depth-First Search (DFS)
export const dfs: Algorithm = {
  id: 'dfs',
  name: 'Depth-First Search',
  type: 'graph',
  description: 'Explore a graph by going as far as possible along each branch before backtracking.',
  timeComplexity: 'O(V + E) where V is the number of vertices and E is the number of edges',
  spaceComplexity: 'O(V)',
  code: `// JavaScript Implementation
function dfs(graph, startNode) {
  const visited = new Set();
  const result = [];
  
  function explore(node) {
    visited.add(node);
    result.push(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
  }
  
  explore(startNode);
  return result;
}

// Iterative version
function dfsIterative(graph, startNode) {
  const visited = new Set();
  const stack = [startNode];
  const result = [];
  
  while (stack.length > 0) {
    const current = stack.pop();
    
    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      
      // Add neighbors in reverse order to maintain similar traversal to recursive
      for (let i = graph[current].length - 1; i >= 0; i--) {
        const neighbor = graph[current][i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`,
  explanation: `<p>Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.</p>
  <p>The algorithm works by:</p>
  <ol>
    <li>Starting at a chosen node</li>
    <li>Exploring one path as deeply as possible before backtracking</li>
    <li>Using a stack (explicitly or implicitly through recursion) to keep track of nodes to visit</li>
  </ol>
  <p>DFS has several important properties:</p>
  <ul>
    <li>It can be implemented recursively or iteratively</li>
    <li>It's useful for topological sorting, finding connected components, and cycle detection</li>
    <li>It may not find the shortest path in an unweighted graph (unlike BFS)</li>
  </ul>
  <p>Applications of DFS include:</p>
  <ul>
    <li>Topological sorting</li>
    <li>Finding connected components</li>
    <li>Maze generation and solving</li>
    <li>Detecting cycles in a graph</li>
    <li>Finding strongly connected components (Tarjan's algorithm)</li>
  </ul>`,
  generateSteps: (input: { graph: Record<string, string[]>, startNode: string, recursive: boolean }) => {
    const graph = input?.graph || {
      A: ['B', 'C', 'D'],
      B: ['A', 'E', 'F'],
      C: ['A', 'G', 'H'],
      D: ['A', 'I'],
      E: ['B'],
      F: ['B'],
      G: ['C'],
      H: ['C'],
      I: ['D']
    };
    const startNode = input?.startNode || 'A';
    const recursive = input?.recursive !== undefined ? input.recursive : true;
    
    const steps: AlgorithmStep[] = [];
    
    steps.push({
      id: 'init',
      description: `Initialize ${recursive ? 'recursive' : 'iterative'} DFS from node ${startNode}`,
      highlightedLines: recursive ? [2, 3, 4] : [20, 21, 22, 23],
      visualState: { 
        graph,
        startNode,
        recursive,
        visited: [],
        stack: recursive ? [] : [startNode],
        traversal: [],
        recursionStack: recursive ? [startNode] : []
      }
    });
    
    if (recursive) {
      // Recursive DFS
      const visited = new Set<string>();
      const result: string[] = [];
      const recursionStack: string[] = [];
      
      function generateExploreSteps(node: string, depth: number): void {
        recursionStack.push(node);
        
        steps.push({
          id: `explore-${node}-depth-${depth}`,
          description: `Explore node ${node} at depth ${depth}`,
          highlightedLines: [5, 6],
          visualState: { 
            graph,
            startNode,
            recursive,
            visited: Array.from(visited),
            traversal: [...result],
            recursionStack: [...recursionStack],
            currentNode: node,
            depth
          }
        });
        
        visited.add(node);
        result.push(node);
        
        steps.push({
          id: `visit-${node}-depth-${depth}`,
          description: `Mark ${node} as visited and add to result`,
          highlightedLines: [7, 8],
          visualState: { 
            graph,
            startNode,
            recursive,
            visited: Array.from(visited),
            traversal: [...result],
            recursionStack: [...recursionStack],
            currentNode: node,
            justVisited: node,
            depth
          }
        });
        
        for (let neighbor of graph[node]) {
          steps.push({
            id: `check-neighbor-${node}-${neighbor}-depth-${depth}`,
            description: `Check neighbor ${neighbor} of node ${node}`,
            highlightedLines: [10, 11],
            visualState: { 
              graph,
              startNode,
              recursive,
              visited: Array.from(visited),
              traversal: [...result],
              recursionStack: [...recursionStack],
              currentNode: node,
              currentNeighbor: neighbor,
              depth
            }
          });
          
          if (!visited.has(neighbor)) {
            steps.push({
              id: `recurse-${node}-${neighbor}-depth-${depth}`,
              description: `Neighbor ${neighbor} not visited: recurse`,
              highlightedLines: [12],
              visualState: { 
                graph,
                startNode,
                recursive,
                visited: Array.from(visited),
                traversal: [...result],
                recursionStack: [...recursionStack],
                currentNode: node,
                currentNeighbor: neighbor,
                goingDeeper: true,
                depth
              }
            });
            
            generateExploreSteps(neighbor, depth + 1);
          } else {
            steps.push({
              id: `skip-neighbor-${node}-${neighbor}-depth-${depth}`,
              description: `Neighbor ${neighbor} already visited: skip`,
              highlightedLines: [11],
              visualState: { 
                graph,
                startNode,
                recursive,
                visited: Array.from(visited),
                traversal: [...result],
                recursionStack: [...recursionStack],
                currentNode: node,
                currentNeighbor: neighbor,
                alreadyVisited: true,
                depth
              }
            });
          }
        }
        
        recursionStack.pop();
        
        steps.push({
          id: `backtrack-${node}-depth-${depth}`,
          description: `Finished exploring ${node} at depth ${depth}, backtrack`,
          highlightedLines: [15],
          visualState: { 
            graph,
            startNode,
            recursive,
            visited: Array.from(visited),
            traversal: [...result],
            recursionStack: [...recursionStack],
            currentNode: node,
            backtracking: true,
            depth
          }
        });
      }
      
      generateExploreSteps(startNode, 0);
      
      steps.push({
        id: 'result',
        description: 'DFS traversal complete',
        highlightedLines: [17],
        visualState: { 
          graph,
          startNode,
          recursive,
          visited: Array.from(visited),
          traversal: result,
          complete: true
        }
      });
      
    } else {
      // Iterative DFS
      const visited = new Set<string>();
      const stack: string[] = [startNode];
      const result: string[] = [];
      
      steps.push({
        id: 'start',
        description: `Start with node ${startNode} in the stack`,
        highlightedLines: [24],
        visualState: { 
          graph,
          startNode,
          recursive,
          visited: Array.from(visited),
          stack: [...stack],
          traversal: [...result]
        }
      });
      
      let iteration = 0;
      while (stack.length > 0) {
        iteration++;
        const current = stack.pop()!;
        
        steps.push({
          id: `pop-${iteration}`,
          description: `Iteration ${iteration}: Pop node ${current} from stack`,
          highlightedLines: [25, 26],
          visualState: { 
            graph,
            startNode,
            recursive,
            visited: Array.from(visited),
            stack: [...stack],
            traversal: [...result],
            currentNode: current,
            iteration
          }
        });
        
        if (!visited.has(current)) {
          visited.add(current);
          result.push(current);
          
          steps.push({
            id: `visit-${iteration}`,
            description: `Mark ${current} as visited and add to result`,
            highlightedLines: [28, 29, 30],
            visualState: { 
              graph,
              startNode,
              recursive,
              visited: Array.from(visited),
              stack: [...stack],
              traversal: [...result],
              currentNode: current,
              justVisited: current,
              iteration
            }
          });
          
          // Add neighbors in reverse order
          const neighbors = [...graph[current]].reverse();
          
          for (let neighbor of neighbors) {
            steps.push({
              id: `check-neighbor-${iteration}-${neighbor}`,
              description: `Check neighbor ${neighbor} of node ${current}`,
              highlightedLines: [33, 34, 35, 36],
              visualState: { 
                graph,
                startNode,
                recursive,
                visited: Array.from(visited),
                stack: [...stack],
                traversal: [...result],
                currentNode: current,
                currentNeighbor: neighbor,
                iteration
              }
            });
            
            if (!visited.has(neighbor)) {
              stack.push(neighbor);
              
              steps.push({
                id: `push-neighbor-${iteration}-${neighbor}`,
                description: `Neighbor ${neighbor} not visited: add to stack`,
                highlightedLines: [35, 36],
                visualState: { 
                  graph,
                  startNode,
                  recursive,
                  visited: Array.from(visited),
                  stack: [...stack],
                  traversal: [...result],
                  currentNode: current,
                  currentNeighbor: neighbor,
                  justAddedToStack: neighbor,
                  iteration
                }
              });
            } else {
              steps.push({
                id: `skip-neighbor-${iteration}-${neighbor}`,
                description: `Neighbor ${neighbor} already visited: skip`,
                highlightedLines: [35],
                visualState: { 
                  graph,
                  startNode,
                  recursive,
                  visited: Array.from(visited),
                  stack: [...stack],
                  traversal: [...result],
                  currentNode: current,
                  currentNeighbor: neighbor,
                  alreadyVisited: true,
                  iteration
                }
              });
            }
          }
        } else {
          steps.push({
            id: `skip-${iteration}`,
            description: `Node ${current} already visited: skip`,
            highlightedLines: [27, 28],
            visualState: { 
              graph,
              startNode,
              recursive,
              visited: Array.from(visited),
              stack: [...stack],
              traversal: [...result],
              currentNode: current,
              alreadyVisited: true,
              iteration
            }
          });
        }
      }
      
      steps.push({
        id: 'result',
        description: 'DFS traversal complete',
        highlightedLines: [42, 43],
        visualState: { 
          graph,
          startNode,
          recursive,
          visited: Array.from(visited),
          stack: [],
          traversal: result,
          complete: true
        }
      });
    }
    
    return steps;
  },
  defaultInput: { 
    graph: {
      A: ['B', 'C', 'D'],
      B: ['A', 'E', 'F'],
      C: ['A', 'G', 'H'],
      D: ['A', 'I'],
      E: ['B'],
      F: ['B'],
      G: ['C'],
      H: ['C'],
      I: ['D']
    },
    startNode: 'A',
    recursive: true
  }
};

// Exporting all graph algorithms
export const graphAlgorithms = [
  dijkstra,
  bfs,
  dfs
];
