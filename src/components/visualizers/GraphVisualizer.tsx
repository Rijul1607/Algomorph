import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';

interface GraphVisualizerProps {
  data: {
    // Common data
    graph?: any;
    startNode?: string;
    currentNode?: string;
    
    // BFS/DFS data
    visited?: string[];
    queue?: string[];
    stack?: string[];
    traversal?: string[];
    recursionStack?: string[];
    justVisited?: string;
    currentNeighbor?: string;
    alreadyVisited?: boolean;
    goingDeeper?: boolean;
    backtracking?: boolean;
    justAddedToStack?: string;
    depth?: number;
    iteration?: number;
    recursive?: boolean;
    
    // Dijkstra data
    nodes?: string[];
    distances?: Record<string, number>;
    previous?: Record<string, string | null>;
    unvisited?: string[];
    currentEdge?: {
      from: string;
      to: string;
      weight: number;
    };
    oldDistance?: number;
    newDistance?: number;
    improved?: boolean;
    paths?: Record<string, { distance: number, path: string[] }>;
    
    complete?: boolean;
  };
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ data }) => {
  // Early return with a message if data is undefined or empty
  if (!data || !data.graph) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  // Determine which visualization to use based on the data
  if (data.unvisited || data.distances) {
    return <DijkstraVisualizer data={data} />;
  } else if (data.queue) {
    return <BFSVisualizer data={data} />;
  } else if (data.stack || data.recursionStack) {
    return <DFSVisualizer data={data} />;
  }
  
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="text-muted-foreground">Unknown graph algorithm visualization</div>
    </div>
  );
};

// Helper function to calculate coordinates for nodes in a circle
const calculateNodePositions = (nodes: string[], centerX: number, centerY: number, radius: number) => {
  const positions: Record<string, { x: number, y: number }> = {};
  const angleStep = (2 * Math.PI) / nodes.length;
  
  nodes.forEach((node, index) => {
    const angle = index * angleStep;
    positions[node] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });
  
  return positions;
};

// Helper function to format distance values
const formatDistance = (distance: number) => {
  return distance === Infinity ? '∞' : distance.toString();
};

// Dijkstra Visualization Component
const DijkstraVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { 
    graph, startNode, nodes = Object.keys(graph), 
    distances, previous, unvisited = [],
    currentNode, currentNeighbor, currentEdge,
    oldDistance, newDistance, improved,
    justVisited, paths, complete
  } = data;
  
  // Calculate node positions
  const nodePositions = useMemo(() => {
    return calculateNodePositions(nodes, 250, 200, 150);
  }, [nodes]);
  
  // Determine node colors
  const getNodeColor = (node: string) => {
    if (node === startNode) return 'bg-blue-500 text-white';
    if (node === currentNode) return 'bg-amber-500 text-white';
    if (node === currentNeighbor) return 'bg-purple-500 text-white';
    if (node === justVisited) return 'bg-green-500 text-white';
    if (!unvisited.includes(node)) return 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200';
    return 'bg-card border';
  };
  
  // Determine edge colors
  const getEdgeColor = (from: string, to: string) => {
    if (currentEdge && currentEdge.from === from && currentEdge.to === to) {
      return 'stroke-amber-500 stroke-[3px]';
    }
    
    if (previous && previous[to] === from) {
      return 'stroke-green-500 stroke-[3px]';
    }
    
    return 'stroke-muted-foreground/50';
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-auto">
      <div className="mb-6 text-center">
        <span className="font-medium">Dijkstra's Algorithm</span>
        <div className="text-sm text-muted-foreground mt-1">
          Finding shortest paths from {startNode}
        </div>
      </div>
      
      {/* Graph visualization */}
      <div className="mb-8 relative" style={{ width: '500px', height: '400px' }}>
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full">
          {Object.entries(graph).map(([from, neighbors]: [string, any]) => 
            Object.entries(neighbors).map(([to, weight]: [string, number]) => {
              const fromPos = nodePositions[from];
              const toPos = nodePositions[to];
              
              if (!fromPos || !toPos) return null;
              
              // Only draw one edge between two nodes
              if (from > to) return null;
              
              // Calculate midpoint for edge label
              const midX = (fromPos.x + toPos.x) / 2;
              const midY = (fromPos.y + toPos.y) / 2;
              
              return (
                <g key={`${from}-${to}`}>
                  <line 
                    x1={fromPos.x} 
                    y1={fromPos.y} 
                    x2={toPos.x} 
                    y2={toPos.y} 
                    className={`${getEdgeColor(from, to)} transition-colors`}
                    strokeWidth="2"
                  />
                  <circle 
                    cx={midX} 
                    cy={midY} 
                    r="12" 
                    className="fill-card stroke-gray-300 dark:stroke-gray-700" 
                  />
                  <text 
                    x={midX} 
                    y={midY} 
                    textAnchor="middle" 
                    alignmentBaseline="middle" 
                    fontSize="12"
                    className="fill-foreground"
                  >
                    {weight}
                  </text>
                </g>
              );
            })
          )}
        </svg>
        
        {/* Nodes */}
        {nodes.map(node => {
          const pos = nodePositions[node];
          if (!pos) return null;
          
          return (
            <div 
              key={node}
              className={`absolute w-10 h-10 rounded-full border flex items-center justify-center ${getNodeColor(node)} transition-colors`}
              style={{ 
                left: pos.x - 20, 
                top: pos.y - 20,
              }}
            >
              {node}
            </div>
          );
        })}
      </div>
      
      {/* Distance table */}
      {distances && (
        <div className="bg-muted/30 p-4 rounded-lg max-w-md w-full mb-6">
          <h3 className="font-medium mb-3">Distances from {startNode}:</h3>
          <div className="grid grid-cols-3 gap-2">
            {nodes.map(node => (
              <div 
                key={node} 
                className={`p-2 rounded-md border text-center ${
                  node === currentNode || node === currentNeighbor
                    ? 'bg-warning/20 border-warning'
                    : improved && node === currentNeighbor
                      ? 'bg-success/20 border-success'
                      : 'bg-card border-border'
                }`}
              >
                <div className="text-xs mb-1">{node}</div>
                <div className="font-mono font-medium">
                  {formatDistance(distances[node])}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Decision visualization for current edge */}
      {currentEdge && oldDistance !== undefined && newDistance !== undefined && (
        <div className="p-4 bg-muted/30 rounded-lg max-w-md w-full mb-6">
          <h3 className="font-medium mb-2">Path Update Check:</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-sm">Current Path to {currentNeighbor}</div>
              <div className={`mt-1 p-2 rounded-md ${
                oldDistance <= newDistance ? 'bg-success/20' : 'bg-muted'
              }`}>
                <div className="text-xs mb-1">Distance</div>
                <div className="font-mono">{formatDistance(oldDistance)}</div>
              </div>
            </div>
            <div className="text-xl">vs</div>
            <div className="text-center">
              <div className="text-sm">New Path via {currentNode}</div>
              <div className={`mt-1 p-2 rounded-md ${
                newDistance < oldDistance ? 'bg-success/20' : 'bg-muted'
              }`}>
                <div className="text-xs mb-1">Distance</div>
                <div className="font-mono">{formatDistance(newDistance)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Final paths */}
      {complete && paths && (
        <div className="p-4 bg-primary/10 rounded-lg max-w-md w-full">
          <h3 className="font-medium mb-3">Shortest Paths from {startNode}:</h3>
          <div className="space-y-2">
            {Object.entries(paths).map(([node, pathData]) => (
              <div key={node} className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">To {node}</div>
                  <div className="font-mono bg-primary/20 px-2 py-0.5 rounded">
                    {formatDistance(pathData.distance)}
                  </div>
                </div>
                <div className="flex items-center flex-wrap">
                  {pathData.path.map((step, i) => (
                    <React.Fragment key={i}>
                      <span className="bg-card px-2 py-1 rounded">{step}</span>
                      {i < pathData.path.length - 1 && <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// BFS Visualization Component
const BFSVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { 
    graph, startNode, 
    visited = [], queue = [], traversal = [],
    currentNode, currentNeighbor, justVisited,
    alreadyVisited, distances, previous,
    iteration, complete
  } = data;
  
  const nodes = useMemo(() => Object.keys(graph), [graph]);
  
  // Calculate node positions
  const nodePositions = useMemo(() => {
    return calculateNodePositions(nodes, 250, 200, 150);
  }, [nodes]);
  
  // Determine node colors
  const getNodeColor = (node: string) => {
    if (node === startNode) return 'bg-blue-500 text-white';
    if (node === currentNode) return 'bg-amber-500 text-white';
    if (node === currentNeighbor) return 'bg-purple-500 text-white';
    if (node === justVisited) return 'bg-green-500 text-white';
    if (visited.includes(node)) return 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200';
    return 'bg-card border';
  };
  
  // Determine edge colors
  const getEdgeColor = (from: string, to: string) => {
    if (currentNode === from && currentNeighbor === to) {
      return alreadyVisited ? 'stroke-red-500/50 stroke-[3px]' : 'stroke-amber-500 stroke-[3px]';
    }
    
    if (previous && previous[to] === from) {
      return 'stroke-green-500 stroke-[3px]';
    }
    
    return 'stroke-muted-foreground/50';
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-auto">
      <div className="mb-6 text-center">
        <span className="font-medium">Breadth-First Search</span>
        <div className="text-sm text-muted-foreground mt-1">
          Starting from node {startNode}
        </div>
      </div>
      
      {/* Graph visualization */}
      <div className="mb-8 relative" style={{ width: '500px', height: '400px' }}>
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full">
          {Object.entries(graph).map(([from, neighbors]: [string, string[]]) => 
            neighbors.map((to: string) => {
              const fromPos = nodePositions[from];
              const toPos = nodePositions[to];
              
              if (!fromPos || !toPos) return null;
              
              // Only draw one edge between two nodes
              if (from > to) return null;
              
              return (
                <line 
                  key={`${from}-${to}`}
                  x1={fromPos.x} 
                  y1={fromPos.y} 
                  x2={toPos.x} 
                  y2={toPos.y} 
                  className={`${getEdgeColor(from, to)} transition-colors`}
                  strokeWidth="2"
                />
              );
            })
          )}
        </svg>
        
        {/* Nodes */}
        {nodes.map(node => {
          const pos = nodePositions[node];
          if (!pos) return null;
          
          return (
            <div 
              key={node}
              className={`absolute w-10 h-10 rounded-full border flex items-center justify-center ${getNodeColor(node)} transition-colors`}
              style={{ 
                left: pos.x - 20, 
                top: pos.y - 20,
              }}
            >
              {node}
            </div>
          );
        })}
      </div>
      
      {/* Queue visualization */}
      <div className="bg-muted/30 p-4 rounded-lg max-w-md w-full mb-6">
        <h3 className="font-medium mb-3">Queue:</h3>
        {queue.length > 0 ? (
          <div className="flex items-center gap-2">
            {queue.map((node, index) => (
              <div 
                key={index} 
                className="p-2 rounded border bg-card flex items-center justify-center w-10 h-10"
              >
                {node}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground">Queue is empty</div>
        )}
      </div>
      
      {/* Traversal so far */}
      <div className="bg-muted/30 p-4 rounded-lg max-w-md w-full mb-6">
        <h3 className="font-medium mb-3">Traversal Order:</h3>
        <div className="flex flex-wrap gap-2">
          {traversal.map((node, index) => (
            <div 
              key={index} 
              className="p-2 rounded border bg-card flex items-center justify-center min-w-10 h-10"
            >
              <span className="text-xs mr-1 text-muted-foreground">{index + 1}.</span> {node}
            </div>
          ))}
        </div>
      </div>
      
      {/* Distances table */}
      {distances && (
        <div className="bg-primary/10 p-4 rounded-lg max-w-md w-full mb-6">
          <h3 className="font-medium mb-3">Distances from {startNode}:</h3>
          <div className="grid grid-cols-3 gap-2">
            {nodes.map(node => (
              <div 
                key={node} 
                className={`p-2 rounded-md border text-center ${
                  node === currentNeighbor && justVisited === node
                    ? 'bg-success/20 border-success'
                    : 'bg-card border-border'
                }`}
              >
                <div className="text-xs mb-1">{node}</div>
                <div className="font-mono font-medium">
                  {formatDistance(distances[node])}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {complete && (
        <div className="text-center font-medium text-success">
          BFS traversal complete!
        </div>
      )}
    </div>
  );
};

// DFS Visualization Component
const DFSVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { 
    graph, startNode, recursive = true,
    visited = [], stack = [], recursionStack = [], traversal = [],
    currentNode, currentNeighbor, justVisited, justAddedToStack,
    alreadyVisited, goingDeeper, backtracking,
    depth, iteration, complete
  } = data;
  
  const nodes = useMemo(() => Object.keys(graph), [graph]);
  
  // Calculate node positions
  const nodePositions = useMemo(() => {
    return calculateNodePositions(nodes, 250, 200, 150);
  }, [nodes]);
  
  // Determine node colors
  const getNodeColor = (node: string) => {
    if (node === startNode) return 'bg-blue-500 text-white';
    if (node === currentNode) return 'bg-amber-500 text-white';
    if (node === currentNeighbor) return 'bg-purple-500 text-white';
    if (node === justVisited) return 'bg-green-500 text-white';
    if (visited.includes(node)) return 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200';
    return 'bg-card border';
  };
  
  // Determine edge colors
  const getEdgeColor = (from: string, to: string) => {
    if (currentNode === from && currentNeighbor === to) {
      if (alreadyVisited) return 'stroke-red-500/50 stroke-[3px]';
      if (goingDeeper) return 'stroke-amber-500 stroke-[3px]';
      return 'stroke-amber-500 stroke-[3px]';
    }
    
    if (recursionStack.includes(from) && recursionStack.includes(to)) {
      const fromIndex = recursionStack.indexOf(from);
      const toIndex = recursionStack.indexOf(to);
      if (Math.abs(fromIndex - toIndex) === 1) {
        return 'stroke-green-500 stroke-[3px]';
      }
    }
    
    return 'stroke-muted-foreground/50';
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-auto">
      <div className="mb-6 text-center">
        <span className="font-medium">Depth-First Search ({recursive ? 'Recursive' : 'Iterative'})</span>
        <div className="text-sm text-muted-foreground mt-1">
          Starting from node {startNode}
        </div>
      </div>
      
      {/* Graph visualization */}
      <div className="mb-8 relative" style={{ width: '500px', height: '400px' }}>
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full">
          {Object.entries(graph).map(([from, neighbors]: [string, string[]]) => 
            neighbors.map((to: string) => {
              const fromPos = nodePositions[from];
              const toPos = nodePositions[to];
              
              if (!fromPos || !toPos) return null;
              
              // Only draw one edge between two nodes
              if (from > to) return null;
              
              return (
                <line 
                  key={`${from}-${to}`}
                  x1={fromPos.x} 
                  y1={fromPos.y} 
                  x2={toPos.x} 
                  y2={toPos.y} 
                  className={`${getEdgeColor(from, to)} transition-colors`}
                  strokeWidth="2"
                />
              );
            })
          )}
        </svg>
        
        {/* Nodes */}
        {nodes.map(node => {
          const pos = nodePositions[node];
          if (!pos) return null;
          
          return (
            <div 
              key={node}
              className={`absolute w-10 h-10 rounded-full border flex items-center justify-center ${getNodeColor(node)} transition-colors`}
              style={{ 
                left: pos.x - 20, 
                top: pos.y - 20,
              }}
            >
              {node}
            </div>
          );
        })}
      </div>
      
      {/* Stack visualization for iterative DFS */}
      {!recursive && (
        <div className="bg-muted/30 p-4 rounded-lg max-w-md w-full mb-6">
          <h3 className="font-medium mb-3">Stack:</h3>
          {stack.length > 0 ? (
            <div className="flex flex-col-reverse items-center gap-2">
              {stack.map((node, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded border flex items-center justify-center w-full ${
                    node === justAddedToStack ? 'bg-success/20 border-success' : 'bg-card border-border'
                  }`}
                >
                  {node}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground">Stack is empty</div>
          )}
        </div>
      )}
      
      {/* Recursion stack visualization for recursive DFS */}
      {recursive && recursionStack && recursionStack.length > 0 && (
        <div className="bg-muted/30 p-4 rounded-lg max-w-md w-full mb-6">
          <h3 className="font-medium mb-3">Recursion Stack:</h3>
          <div className="flex items-center gap-2">
            {recursionStack.map((node, index) => (
              <div 
                key={index} 
                className={`p-2 rounded border flex items-center justify-center min-w-10 h-10 ${
                  backtracking && index === recursionStack.length - 1 
                    ? 'bg-amber-500/20 border-amber-500'
                    : goingDeeper && index === recursionStack.length - 1 
                      ? 'bg-success/20 border-success'
                      : 'bg-card border-border'
                }`}
              >
                <span className="text-xs mr-1 text-muted-foreground">{index + 1}.</span> {node}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Traversal so far */}
      <div className="bg-muted/30 p-4 rounded-lg max-w-md w-full mb-6">
        <h3 className="font-medium mb-3">Traversal Order:</h3>
        <div className="flex flex-wrap gap-2">
          {traversal.map((node, index) => (
            <div 
              key={index} 
              className="p-2 rounded border bg-card flex items-center justify-center min-w-10 h-10"
            >
              <span className="text-xs mr-1 text-muted-foreground">{index + 1}.</span> {node}
            </div>
          ))}
        </div>
      </div>
      
      {backtracking && (
        <div className="bg-amber-500/20 border border-amber-500 rounded-md p-3 mb-6 max-w-md w-full">
          <div className="font-medium">Backtracking</div>
          <div className="text-sm">Finished exploring {currentNode}, returning to previous node in the call stack</div>
        </div>
      )}
      
      {complete && (
        <div className="text-center font-medium text-success">
          DFS traversal complete!
        </div>
      )}
    </div>
  );
};

export default GraphVisualizer;
