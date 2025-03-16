
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
        id: 'examples',
        name: 'examples',
        type: 'folder',
        children: [
          {
            id: 'js-sample',
            name: 'async-example.js',
            type: 'file',
            language: 'js',
            code: `// Example of async JavaScript code
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function processData() {
  const data = await fetchData();
  if (data) {
    console.log('Data processed successfully');
    return data.map(item => item.value * 2);
  }
  return [];
}

// Call the async function
processData().then(result => console.log(result));`
          },
          {
            id: 'py-sample',
            name: 'function-example.py',
            type: 'file',
            language: 'py',
            code: `# Example Python function with loops and conditions

def process_data(items):
    """
    Process a list of items with various operations
    """
    results = []
    
    for i, item in enumerate(items):
        if item > 10:
            # Process large items
            results.append(item * 2)
        elif item > 5:
            # Process medium items
            results.append(item + 5)
        else:
            # Process small items
            results.append(item)
            
    return results

# Test data
test_data = [3, 7, 12, 5, 15]
processed = process_data(test_data)
print(f"Processed data: {processed}")

# Calculate total
total = sum(processed)
print(f"Total: {total}")
`
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
