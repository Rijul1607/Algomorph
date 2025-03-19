
import React from 'react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

interface TreeVisualizerProps {
  data: {
    tree: number[] | TreeNode;
    current?: number;
    visited?: number[];
    comparing?: number[];
    found?: boolean;
    searching?: number;
    complete?: boolean;
  };
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ data }) => {
  const { tree, current, visited = [], comparing = [], searching, found, complete } = data;
  
  // Early return with a message if tree is undefined or empty
  if (!tree || (Array.isArray(tree) && tree.length === 0)) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="text-muted-foreground">No data available for visualization</div>
      </div>
    );
  }
  
  // For simplicity, we represent a tree as an array in level order traversal
  // Array representation: [root, left1, right1, left1-left, left1-right, right1-left, ...]
  const treeArray = Array.isArray(tree) ? tree : convertTreeToArray(tree as TreeNode);
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 overflow-auto">
      {searching !== undefined && (
        <div className="mb-4 text-center">
          <span className="font-medium">Searching for: </span>
          <span className="font-mono bg-primary/20 px-2 py-1 rounded">{searching}</span>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
        {/* Render levels of the tree */}
        {getTreeLevels(treeArray).map((level, levelIndex) => (
          <div key={levelIndex} className="flex justify-center w-full">
            {level.map((nodeIndex) => {
              if (nodeIndex >= treeArray.length || treeArray[nodeIndex] === null || treeArray[nodeIndex] === undefined) {
                // Empty placeholder for balanced tree visualization
                return <div key={`empty-${nodeIndex}`} className="w-10 h-10 mx-2 opacity-0"></div>;
              }
              
              const value = treeArray[nodeIndex];
              const isCurrent = nodeIndex === current;
              const isVisited = visited.includes(nodeIndex);
              const isComparing = comparing.includes(nodeIndex);
              const isFound = isCurrent && found;
              
              return (
                <div
                  key={nodeIndex}
                  className={`w-12 h-12 mx-2 flex items-center justify-center rounded-full border-2 ${
                    isFound
                      ? 'bg-success/20 border-success animate-pulse'
                      : isCurrent
                        ? 'bg-warning/20 border-warning'
                        : isVisited
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600'
                          : isComparing
                            ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-400 dark:border-purple-600'
                            : 'bg-muted border-border'
                  } transition-colors`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {found !== undefined && (
        <div className={`mt-6 text-center font-medium ${found ? 'text-success' : 'text-destructive'}`}>
          {found ? 'Target found!' : 'Target not found'}
        </div>
      )}
      
      {complete && (
        <div className="mt-6 text-center font-medium text-success">
          Traversal complete!
        </div>
      )}
    </div>
  );
};

// Convert a tree node to array representation (level order traversal)
function convertTreeToArray(root: TreeNode): number[] {
  if (!root) return [];
  
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    if (node) {
      result.push(node.value);
      queue.push(node.left || null);
      queue.push(node.right || null);
    } else {
      result.push(null);
    }
  }
  
  // Remove trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  
  return result.filter((val): val is number => val !== null);
}

// Group tree nodes by levels for rendering
function getTreeLevels(tree: number[]): number[][] {
  const levels: number[][] = [];
  let levelSize = 1;
  let index = 0;
  
  while (index < tree.length) {
    const level: number[] = [];
    
    for (let i = 0; i < levelSize && index < tree.length; i++) {
      level.push(index);
      index++;
    }
    
    levels.push(level);
    levelSize *= 2; // Each level has potentially twice as many nodes
  }
  
  return levels;
}

export default TreeVisualizer;
