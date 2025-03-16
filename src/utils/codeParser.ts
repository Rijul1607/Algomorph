
export type CodeBlock = {
  language: string;
  filename: string;
  code: string;
};

export type ParsedCode = {
  tokens: Array<{
    type: 'keyword' | 'string' | 'function' | 'comment' | 'variable' | 'number' | 'operator' | 'tag' | 'plain';
    content: string;
  }>;
};

export type FileTreeItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  code?: string;
  children?: FileTreeItem[];
};

// Example file tree structure for demo
export const sampleFileTree: FileTreeItem[] = [
  {
    id: 'root',
    name: 'project',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
              {
                id: 'button',
                name: 'Button.tsx',
                type: 'file',
                language: 'tsx',
                code: `import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button 
      className={\`px-4 py-2 rounded-md bg-primary text-white \${className}\`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`
              },
              {
                id: 'card',
                name: 'Card.tsx',
                type: 'file',
                language: 'tsx',
                code: `import React from 'react';

const Card = ({ title, children, className }) => {
  return (
    <div className={\`rounded-lg p-4 shadow-subtle \${className}\`}>
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;`
              }
            ]
          },
          {
            id: 'pages',
            name: 'pages',
            type: 'folder',
            children: [
              {
                id: 'index',
                name: 'index.tsx',
                type: 'file',
                language: 'tsx',
                code: `import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <Card title="Getting Started">
        <p className="mb-4">This is a sample project to demonstrate the code visualizer.</p>
        <Button>Learn More</Button>
      </Card>
    </div>
  );
};

export default HomePage;`
              }
            ]
          },
          {
            id: 'utils',
            name: 'utils.ts',
            type: 'file',
            language: 'ts',
            code: `// Utility functions

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateTotal = (items: Array<{ price: number }>): number => {
  return items.reduce((total, item) => total + item.price, 0);
};`
          }
        ]
      },
      {
        id: 'package',
        name: 'package.json',
        type: 'file',
        language: 'json',
        code: `{
  "name": "code-visualizer-demo",
  "version": "1.0.0",
  "description": "A demo project for the code visualizer",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^13.4.0"
  }
}`
      }
    ]
  }
];

// Sample code for demo
export const sampleCode: CodeBlock = {
  language: 'tsx',
  filename: 'Button.tsx',
  code: `import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button 
      className={\`px-4 py-2 rounded-md bg-primary text-white \${className}\`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`
};

export const flattenFileTree = (tree: FileTreeItem[]): FileTreeItem[] => {
  let result: FileTreeItem[] = [];
  
  tree.forEach(item => {
    result.push(item);
    if (item.children) {
      result = [...result, ...flattenFileTree(item.children)];
    }
  });
  
  return result;
};

export const findFileById = (fileId: string): FileTreeItem | undefined => {
  const flattenedFiles = flattenFileTree(sampleFileTree);
  return flattenedFiles.find(file => file.id === fileId);
};
