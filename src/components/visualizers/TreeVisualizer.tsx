
import React from 'react';

interface TreeNode {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

interface TreeVisualizerProps {
  data: {
    tree: number[];
    current?: number;
    visited?: number[];
    searching?: number;
    found?: boolean;
    complete?: boolean;
  };
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ data }) => {
  const { tree, current, visited = [], searching, found, complete } = data;
  
  // Helper function to determine node position
  const getNodePosition = (index: number, totalNodes: number, level: number) => {
    const maxNodesInLevel = Math.pow(2, level);
    const levelStartIndex = Math.pow(2, level) - 1;
    const positionInLevel = index - levelStartIndex;
    const width = 100;
    
    return {
      left: `${(positionInLevel + 0.5) * (width / maxNodesInLevel)}%`,
      top: `${level * 80}px`
    };
  };
  
  // Determine tree level for a node
  const getNodeLevel = (index: number) => {
    return Math.floor(Math.log2(index + 1));
  };
  
  // Check if node has parent (not root)
  const hasParent = (index: number) => index > 0;
  
  // Get parent index
  const getParentIndex = (index: number) => Math.floor((index - 1) / 2);
  
  // Render edges between nodes
  const renderEdges = () => {
    return tree.map((_, index) => {
      if (!hasParent(index)) return null;
      
      const parentIndex = getParentIndex(index);
      const nodeLevel = getNodeLevel(index);
      const parentLevel = getNodeLevel(parentIndex);
      
      const nodePos = getNodePosition(index, tree.length, nodeLevel);
      const parentPos = getNodePosition(parentIndex, tree.length, parentLevel);
      
      const isHighlighted = 
        (visited.includes(index) && visited.includes(parentIndex)) || 
        (current === index || current === parentIndex);
      
      return (
        <line
          key={`edge-${index}`}
          x1={nodePos.left.replace('%', '')}
          y1={parseInt(nodePos.top)}
          x2={parentPos.left.replace('%', '')}
          y2={parseInt(parentPos.top) + 30}
          stroke={isHighlighted ? "var(--primary)" : "var(--border)"}
          strokeWidth={isHighlighted ? 2 : 1}
        />
      );
    });
  };
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 relative">
      {searching !== undefined && (
        <div className="text-center mb-6">
          <span className="font-medium">Searching for: </span>
          <span className="font-mono bg-primary/20 px-2 py-1 rounded">{searching}</span>
        </div>
      )}
      
      <div className="w-full h-[300px] relative">
        <svg width="100%" height="100%" viewBox="0 0 100 300" preserveAspectRatio="xMidYMid meet">
          {renderEdges()}
        </svg>
        
        {tree.map((value, index) => {
          const nodeLevel = getNodeLevel(index);
          const position = getNodePosition(index, tree.length, nodeLevel);
          
          const isVisited = visited.includes(index);
          const isCurrent = index === current;
          const isFound = isCurrent && found;
          
          return (
            <div
              key={index}
              className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border ${
                isFound
                  ? 'bg-success/20 border-success animate-pulse'
                  : isCurrent
                    ? 'bg-warning/20 border-warning'
                    : isVisited
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border'
              } transition-colors`}
              style={{
                left: position.left,
                top: position.top
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
      
      {complete && (
        <div className="text-center mt-4 text-primary font-medium">
          Traversal complete!
        </div>
      )}
      
      {found !== undefined && (
        <div className={`text-center mt-4 font-medium ${found ? 'text-success' : 'text-destructive'}`}>
          {found ? 'Value found!' : 'Value not found'}
        </div>
      )}
    </div>
  );
};

export default TreeVisualizer;
