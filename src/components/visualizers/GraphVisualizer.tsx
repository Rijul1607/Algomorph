
import React from 'react';

interface GraphVisualizerProps {
  data: {
    nodes?: {
      id: string | number;
      label?: string;
      x?: number;
      y?: number;
      visited?: boolean;
      distance?: number;
      color?: string;
      current?: boolean;
      processing?: boolean;
      neighbor?: boolean;
      path?: boolean;
      highlighted?: boolean;
      justVisited?: boolean;
    }[];
    edges?: {
      from: string | number;
      to: string | number;
      weight?: number;
      visited?: boolean;
      current?: boolean;
      path?: boolean;
      highlighted?: boolean;
    }[];
    current?: string | number;
    start?: string | number;
    target?: string | number;
    queue?: (string | number)[];
    stack?: (string | number)[];
    visited?: (string | number)[];
    distance?: Record<string | number, number>;
    path?: Record<string | number, string | number>;
    step?: number;
    totalSteps?: number;
    complete?: boolean;
    foundPath?: boolean;
    shortestDistance?: number;
  };
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ data }) => {
  if (!data || !data.nodes) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No graph data available for visualization</div>
      </div>
    );
  }
  
  const { 
    nodes = [], 
    edges = [], 
    current,
    start,
    target,
    queue,
    stack,
    visited,
    distance = {},
    path = {},
    step,
    totalSteps,
    complete,
    foundPath,
    shortestDistance
  } = data;
  
  const svgWidth = 600;
  const svgHeight = 400;
  const nodeRadius = 20;
  
  // If node positions are not defined, generate them in a circular layout
  const nodesWithPositions = nodes.map((node, index) => {
    if (node.x === undefined || node.y === undefined) {
      const angle = (index / nodes.length) * 2 * Math.PI;
      const radius = Math.min(svgWidth, svgHeight) * 0.4;
      return {
        ...node,
        x: svgWidth / 2 + radius * Math.cos(angle),
        y: svgHeight / 2 + radius * Math.sin(angle)
      };
    }
    return node;
  });
  
  // Determine node colors based on their state
  const getNodeColor = (node: typeof nodesWithPositions[0]) => {
    if (node.id === current) return 'fill-warning';
    if (node.id === start) return 'fill-blue-500';
    if (node.id === target) return 'fill-success';
    if (node.path || (foundPath && path[node.id] !== undefined)) return 'fill-teal-400';
    if (node.visited || (visited && visited.includes(node.id))) return 'fill-primary-light';
    if (node.processing) return 'fill-amber-400';
    if (node.neighbor) return 'fill-blue-300';
    return 'fill-muted';
  };
  
  // Determine edge colors based on their state
  const getEdgeColor = (edge: typeof edges[0]) => {
    if (edge.path) return 'stroke-success';
    if (edge.visited) return 'stroke-primary';
    if (edge.current) return 'stroke-warning';
    return 'stroke-muted-foreground';
  };
  
  // Check if an edge is on the path (for visualization)
  const isEdgeOnPath = (edge: typeof edges[0]) => {
    if (!foundPath || !path) return false;
    
    let currentNode: string | number | undefined = target;
    while (currentNode && path[currentNode] !== undefined) {
      const parentNode = path[currentNode];
      if ((edge.from === parentNode && edge.to === currentNode) || 
          (edge.from === currentNode && edge.to === parentNode)) {
        return true;
      }
      currentNode = parentNode;
    }
    return false;
  };
  
  return (
    <div className="w-full overflow-auto">
      <div className="flex flex-col items-center">
        <svg 
          width={svgWidth} 
          height={svgHeight} 
          className="border rounded-md bg-card"
        >
          {/* Render edges first so they appear behind nodes */}
          {edges.map((edge, idx) => {
            const fromNode = nodesWithPositions.find(node => node.id === edge.from);
            const toNode = nodesWithPositions.find(node => node.id === edge.to);
            
            if (!fromNode || !toNode) return null;
            
            const isPath = edge.path || isEdgeOnPath(edge);
            
            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={`${getEdgeColor(edge)} ${isPath ? 'stroke-2' : 'stroke-1'}`}
                />
                {edge.weight !== undefined && (
                  <text
                    x={(fromNode.x! + toNode.x!) / 2}
                    y={(fromNode.y! + toNode.y!) / 2}
                    dy="-5"
                    className="text-xs fill-muted-foreground text-center bg-background"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Render nodes */}
          {nodesWithPositions.map((node, idx) => {
            const isCurrentNode = node.id === current;
            const isNodeInPath = node.path || (foundPath && path && path[node.id] !== undefined);
            
            return (
              <g key={`node-${idx}`}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  className={`${getNodeColor(node)} stroke-2 ${isCurrentNode ? 'stroke-warning-dark' : 'stroke-border'}`}
                />
                <text
                  x={node.x}
                  y={node.y}
                  dy="0.3em"
                  className="text-center fill-foreground font-medium"
                  textAnchor="middle"
                >
                  {node.label || node.id}
                </text>
                
                {/* Display distance if available */}
                {distance && distance[node.id] !== undefined && (
                  <text
                    x={node.x}
                    y={node.y! + nodeRadius + 15}
                    className="text-xs text-center fill-muted-foreground"
                    textAnchor="middle"
                  >
                    d: {distance[node.id]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Additional information */}
        <div className="w-full max-w-xl mt-4">
          {/* Queue/Stack visualization if available */}
          {(queue || stack) && (
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">
                {queue ? 'Queue:' : 'Stack:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(queue || stack)?.map((node, idx) => (
                  <div 
                    key={`queue-${idx}`}
                    className={`px-3 py-1 rounded-full text-sm ${
                      idx === 0 ? 'bg-warning/30 border border-warning' : 'bg-muted/50 border border-border'
                    }`}
                  >
                    {nodes.find(n => n.id === node)?.label || node}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Visited nodes */}
          {visited && visited.length > 0 && (
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">Visited:</div>
              <div className="flex flex-wrap gap-1">
                {visited.map((node, idx) => (
                  <span 
                    key={`visited-${idx}`}
                    className="text-sm bg-primary-light/20 px-2 py-0.5 rounded"
                  >
                    {nodes.find(n => n.id === node)?.label || node}
                    {idx < visited.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Result information */}
          {complete && (
            <div className="mt-4 p-3 bg-muted/30 rounded-md">
              {foundPath ? (
                <div>
                  <div className="font-medium">Path found:</div>
                  <div className="flex flex-wrap gap-1 items-center mt-1">
                    {(() => {
                      const pathNodes: (string | number)[] = [];
                      let currentNode: string | number | undefined = target;
                      
                      while (currentNode !== undefined) {
                        pathNodes.unshift(currentNode);
                        currentNode = path[currentNode as string | number];
                      }
                      
                      return pathNodes.map((node, idx) => (
                        <React.Fragment key={`path-${idx}`}>
                          <span className="bg-teal-400/20 px-2 py-0.5 rounded">
                            {nodes.find(n => n.id === node)?.label || node}
                          </span>
                          {idx < pathNodes.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </React.Fragment>
                      ));
                    })()}
                  </div>
                  {shortestDistance !== undefined && (
                    <div className="mt-2">
                      <span className="font-medium">Distance:</span> {shortestDistance}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-destructive font-medium">
                  No path found from {nodes.find(n => n.id === start)?.label || start} to {nodes.find(n => n.id === target)?.label || target}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
