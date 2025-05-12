
import React, { useEffect, useState } from 'react';
import { BarChart3, GitBranch, Hexagon, ChartLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

interface NetworkNode {
  x: number;
  y: number;
  size: number;
}

interface NetworkLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
}

const HomePage = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [lines, setLines] = useState<NetworkLine[]>([]);

  useEffect(() => {
    // Generate random network background
    const generateNetwork = () => {
      const newNodes: NetworkNode[] = [];
      const nodeCount = Math.floor(window.innerWidth / 50); // Adjust node density
      
      // Generate nodes
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          x: Math.random() * 100, // percentage
          y: Math.random() * 100, // percentage
          size: Math.random() * 4 + 2, // 2-6px
        });
      }
      
      setNodes(newNodes);
      
      // Generate connections between some nodes
      const newLines: NetworkLine[] = [];
      const connectionCount = nodeCount * 1.5;
      
      for (let i = 0; i < connectionCount; i++) {
        const nodeA = newNodes[Math.floor(Math.random() * newNodes.length)];
        const nodeB = newNodes[Math.floor(Math.random() * newNodes.length)];
        
        if (nodeA && nodeB && nodeA !== nodeB) {
          // Calculate distance to limit connections to nearby nodes
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
          );
          
          // Only create connections between relatively close nodes
          if (distance < 20) {
            const angle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);
            const length = Math.sqrt(
              Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
            );
            
            newLines.push({
              x1: nodeA.x,
              y1: nodeA.y,
              x2: nodeB.x,
              y2: nodeB.y,
              width: Math.random() * 0.8 + 0.2, // 0.2-1px
            });
          }
        }
      }
      
      setLines(newLines);
    };
    
    generateNetwork();
    
    // Regenerate on resize
    const handleResize = () => {
      generateNetwork();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="network-background text-white">
      {/* Network background effect */}
      {nodes.map((node, index) => (
        <div 
          key={`node-${index}`} 
          className="network-node" 
          style={{ 
            left: `${node.x}%`, 
            top: `${node.y}%`, 
            width: `${node.size}px`,
            height: `${node.size}px`
          }}
        />
      ))}
      
      {lines.map((line, index) => (
        <div 
          key={`line-${index}`} 
          className="network-line" 
          style={{ 
            left: `${line.x1}%`, 
            top: `${line.y1}%`, 
            width: `${Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2))}%`, 
            height: `${line.width}px`,
            transform: `rotate(${Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * 180 / Math.PI}deg)`
          }}
        />
      ))}
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <ChartLine className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Algorithm Visualizer</span>
        </div>
        <ThemeToggle />
      </header>
      
      {/* Hero section */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="mb-8">
          <ChartLine className="h-16 w-16 text-primary mx-auto mb-4" />
        </div>
        
        <h1 className="algorithmic-heading">
          <span className="text-white">ALGORITHM</span>
          <br />
          <span className="text-primary">VISUALIZER</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-3xl mb-8">
          Algorithm Visualizer is an interactive online platform that visualizes algorithms from code. 
          Currently these include Sorting, Tree Traversal, and Dynamic Programming Algorithms. 
          More algorithms will be coming soon!
        </p>
        
        <Button asChild size="lg" className="text-lg px-8 py-6 hover-glow">
          <Link to="/algorithms">Explore Algorithms</Link>
        </Button>
      </div>
      
      {/* Algorithm categories */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="algorithm-card">
            <BarChart3 className="algorithm-icon" />
            <h3 className="text-2xl font-bold mb-2">Sorting</h3>
            <p className="text-center text-gray-300">
              Visualize how different sorting algorithms organize data efficiently
            </p>
          </div>
          
          <div className="algorithm-card">
            <GitBranch className="algorithm-icon" />
            <h3 className="text-2xl font-bold mb-2">Tree Traversal</h3>
            <p className="text-center text-gray-300">
              Explore various ways to navigate and process tree data structures
            </p>
          </div>
          
          <div className="algorithm-card">
            <Hexagon className="algorithm-icon" />
            <h3 className="text-2xl font-bold mb-2">Dynamic Programming</h3>
            <p className="text-center text-gray-300">
              Learn how complex problems can be solved by breaking them into simpler subproblems
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to visualize algorithms?</h2>
        <Button asChild size="lg" className="text-lg px-8 hover-glow">
          <Link to="/algorithms">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
