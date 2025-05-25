
import React, { useEffect, useState, useRef } from 'react';
import { BarChart3, GitBranch, Hexagon, ChartLine,Github  } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
// import { ThemeToggle } from './ThemeToggle';

interface NetworkNode {
  x: number;
  y: number;
  size: number;
  depth: number; // Added depth for parallax effect
}

interface NetworkLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  depth: number; // Added depth for parallax effect
}

const HomePage = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [lines, setLines] = useState<NetworkLine[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
          depth: Math.random() * 0.9 + 0.1 // 0.1-1 depth (closer to 1 = closer to viewer)
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
              depth: (nodeA.depth + nodeB.depth) / 2 // Average depth of connected nodes
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

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;  // -0.5 to 0.5
        const y = (e.clientY - top) / height - 0.5;  // -0.5 to 0.5
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax offset based on node depth and mouse position
  const getParallaxOffset = (depth: number) => {
    const moveX = mousePosition.x * 30 * depth; // Adjust multiplier for effect intensity
    const moveY = mousePosition.y * 30 * depth;
    return { moveX, moveY };
  };

  return (
    <div className="network-background text-white" ref={containerRef}>
      {/* Network background effect */}
      {nodes.map((node, index) => {
        const { moveX, moveY } = getParallaxOffset(node.depth);
        return (
          <div 
            key={`node-${index}`} 
            className="network-node" 
            style={{ 
              left: `${node.x + moveX}%`, 
              top: `${node.y + moveY}%`, 
              width: `${node.size}px`,
              height: `${node.size}px`,
              opacity: 0.3 + node.depth * 0.7, // More opacity for nodes closer to viewer
              transition: 'transform 0.1s ease-out'
            }}
          />
        );
      })}
      
      {lines.map((line, index) => {
        const { moveX: moveX1, moveY: moveY1 } = getParallaxOffset(line.depth);
        return (
          <div 
            key={`line-${index}`} 
            className="network-line" 
            style={{ 
              left: `${line.x1 + moveX1}%`, 
              top: `${line.y1 + moveY1}%`, 
              width: `${Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2))}%`, 
              height: `${line.width}px`,
              transform: `rotate(${Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * 180 / Math.PI}deg)`,
              opacity: 0.1 + line.depth * 0.5,
              transition: 'transform 0.1s ease-out'
            }}
          />
        );
      })}
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <ChartLine className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">
  <span className="text-blue-500">Algo</span>
  <span className="text-white">Morph</span>
</span>
        </div>
        <a
  href="https://github.com/Rijul1607"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block text-black-800 hover:text-gray-600"
  style={{ width: '24px', height: '24px' }}
  aria-label="GitHub"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-full h-full"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.49 11.49 0 016 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.65.24 2.87.12 3.17.77.85 1.24 1.93 1.24 3.25 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.69.83.57A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
</a>

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
