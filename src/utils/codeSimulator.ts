export function simulateCustomCodeExecution(code: string, language: string) {
  let steps = [];
  let output = '';
  
  // Determine what kind of algorithm this is based on code analysis
  const isSort = code.includes('sort') || code.includes('swap');
  const isSearch = code.includes('search') || code.includes('find');
  const isTree = code.includes('tree') || (code.includes('node') && (code.includes('left') || code.includes('right')));
  
  if (language === 'js') {
    if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, language);
      output = 'Tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, language);
      output = 'Loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, language);
      output = 'Conditional execution completed';
    } else if (code.includes('function')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, language);
      output = 'Function execution completed';
    } else if (code.includes('async') || code.includes('await')) {
      // Simulate async execution
      steps = generateAsyncSteps(code, language);
      output = 'Async execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, language);
      output = 'Code execution completed';
    }
  } else if (language === 'py') {
    if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, language);
      output = 'Tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, language);
      output = 'Loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, language);
      output = 'Conditional execution completed';
    } else if (code.includes('def')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, language);
      output = 'Function execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, language);
      output = 'Code execution completed';
    }
  } else if (language === 'cpp') {
    if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, language);
      output = 'Tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, language);
      output = 'Loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, language);
      output = 'Conditional execution completed';
    } else if (code.includes('void') || code.includes('int') || code.includes('function')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, language);
      output = 'Function execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, language);
      output = 'Code execution completed';
    }
  }
  
  if (isSort) {
    output = 'Sorting algorithm executed';
  } else if (isSearch) {
    output = 'Search algorithm executed';
  } else if (isTree) {
    output = 'Tree algorithm executed';
  }
  
  return { steps, output };
}

function generateLoopSteps(code: string, language: string) {
  const lines = code.split('\n');
  const steps = [];
  let loopStartLine = 0;
  
  // Find loop start line
  for (let i = 0; i < lines.length; i++) {
    if ((language === 'js' && (lines[i].includes('for') || lines[i].includes('while'))) ||
        (language === 'py' && (lines[i].includes('for') || lines[i].includes('while')))) {
      loopStartLine = i + 1;
      break;
    }
  }
  
  // Generate loop execution steps
  steps.push({
    id: 'loop-start',
    type: 'loop-start',
    line: loopStartLine,
    content: 'Loop initialized',
    description: 'Loop initialized'
  });
  
  // Simulate iterations
  for (let i = 0; i < 3; i++) {
    steps.push({
      id: `loop-iteration-${i}`,
      type: 'loop-iteration',
      line: loopStartLine,
      iteration: i + 1,
      content: `Iteration ${i + 1}`,
      description: `Iteration ${i + 1}`
    });
    
    // Add some variable assignment steps inside the loop
    steps.push({
      id: `variable-assignment-${i}`,
      type: 'variable',
      line: loopStartLine + 1,
      name: 'i',
      value: i,
      content: `i = ${i}`,
      description: `Variable i assigned value ${i}`
    });
  }
  
  steps.push({
    id: 'loop-end',
    type: 'loop-end',
    line: loopStartLine + 2,
    content: 'Loop completed',
    description: 'Loop completed'
  });
  
  return steps;
}

function generateConditionalSteps(code: string, language: string) {
  const lines = code.split('\n');
  const steps = [];
  let conditionLine = 0;
  
  // Find condition start line
  for (let i = 0; i < lines.length; i++) {
    if ((language === 'js' && lines[i].includes('if')) ||
        (language === 'py' && lines[i].includes('if'))) {
      conditionLine = i + 1;
      break;
    }
  }
  
  // Generate condition execution steps
  steps.push({
    id: 'condition-eval',
    type: 'condition',
    line: conditionLine,
    result: true,
    content: 'Condition evaluated to true',
    description: 'Condition evaluated to true'
  });
  
  steps.push({
    id: 'condition-block',
    type: 'execution',
    line: conditionLine + 1,
    content: 'If block executed',
    description: 'If block executed'
  });
  
  return steps;
}

function generateFunctionSteps(code: string, language: string) {
  const lines = code.split('\n');
  const steps = [];
  let functionStartLine = 0;
  let functionName = language === 'js' ? 'myFunction' : 'my_function';
  
  // Find function start line and name
  for (let i = 0; i < lines.length; i++) {
    if ((language === 'js' && lines[i].includes('function')) ||
        (language === 'py' && lines[i].includes('def'))) {
      functionStartLine = i + 1;
      // Try to extract function name from code
      const match = language === 'js' ? 
        lines[i].match(/function\s+(\w+)/) : 
        lines[i].match(/def\s+(\w+)/);
      if (match && match[1]) {
        functionName = match[1];
      }
      break;
    }
  }
  
  // Generate function execution steps
  steps.push({
    id: 'function-declaration',
    type: 'function-declaration',
    line: functionStartLine,
    name: functionName,
    content: `Function ${functionName} declared`,
    description: `Function ${functionName} declared`
  });
  
  steps.push({
    id: 'function-call',
    type: 'function-call',
    line: lines.length - 2, // Assuming function call is near the end
    name: functionName,
    content: `Called function ${functionName}`,
    description: `Called function ${functionName}`
  });
  
  steps.push({
    id: 'function-execution',
    type: 'function-execution',
    line: functionStartLine + 1,
    content: 'Inside function body',
    description: 'Executing function body'
  });
  
  steps.push({
    id: 'function-return',
    type: 'return',
    line: functionStartLine + 2,
    value: 'result',
    content: 'Returned result',
    description: 'Function returned result'
  });
  
  return steps;
}

function generateAsyncSteps(code: string, language: string) {
  const lines = code.split('\n');
  const steps = [];
  let asyncStartLine = 0;
  
  // Find async function start line
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('async')) {
      asyncStartLine = i + 1;
      break;
    }
  }
  
  // Generate async execution steps
  steps.push({
    id: 'async-start',
    type: 'async-start',
    line: asyncStartLine,
    content: 'Async function started',
    description: 'Async function started'
  });
  
  steps.push({
    id: 'await-operation',
    type: 'await',
    line: asyncStartLine + 2,
    content: 'Awaiting asynchronous operation',
    description: 'Awaiting asynchronous operation'
  });
  
  steps.push({
    id: 'async-resume',
    type: 'async-resume',
    line: asyncStartLine + 3,
    content: 'Async operation completed, execution resumed',
    description: 'Async operation completed, execution resumed'
  });
  
  steps.push({
    id: 'async-return',
    type: 'return',
    line: asyncStartLine + 4,
    value: 'data',
    content: 'Returned data from async function',
    description: 'Returned data from async function'
  });
  
  return steps;
}

function generateGenericSteps(code: string, language: string) {
  const lines = code.split('\n');
  const steps = [];
  
  // Generate simple execution steps
  steps.push({
    id: 'code-start',
    type: 'execution',
    line: 1,
    content: 'Code execution started',
    description: 'Code execution started'
  });
  
  // Add a step for each meaningful code line (skip comments and empty lines)
  let stepLine = 2;
  for (let i = 1; i < Math.min(5, lines.length - 1); i++) {
    const line = lines[i];
    if ((language === 'js' && line.trim() && !line.trim().startsWith('//')) ||
        (language === 'py' && line.trim() && !line.trim().startsWith('#'))) {
      steps.push({
        id: `code-line-${i}`,
        type: 'execution',
        line: i + 1,
        content: `Executing: ${line.trim()}`,
        description: `Executing: ${line.trim()}`
      });
      stepLine++;
    }
  }
  
  steps.push({
    id: 'code-end',
    type: 'execution',
    line: stepLine,
    content: 'Code execution completed',
    description: 'Code execution completed'
  });
  
  return steps;
}

function generateTreeSteps(code: string, language: string) {
  const steps = [];
  
  // Detect tree operation type
  const isTraversal = code.includes('traversal') || code.includes('traverse');
  const isInsertion = code.includes('insert') || code.includes('add');
  const isSearch = code.includes('search') || code.includes('find');
  
  // Sample tree for visualization
  const tree = [10, 5, 15, 3, 7, 12, 18];
  
  // Initial step
  steps.push({
    id: 'tree-init',
    type: 'tree-init',
    line: 1,
    content: 'Tree initialized',
    description: 'Tree initialized',
    visualState: {
      tree: tree
    }
  });
  
  if (isTraversal) {
    // Simulate traversal
    const traversalSteps = [
      {
        id: 'visit-root',
        type: 'tree-visit',
        line: 3,
        node: 0,
        content: 'Visit root node (10)',
        description: 'Visit root node (10)',
        visualState: {
          tree: tree,
          current: 0,
          visited: [0]
        }
      },
      {
        id: 'visit-left',
        type: 'tree-visit',
        line: 4,
        node: 1,
        content: 'Visit left child (5)',
        description: 'Visit left child (5)',
        visualState: {
          tree: tree,
          current: 1,
          visited: [0, 1]
        }
      },
      {
        id: 'visit-left-left',
        type: 'tree-visit',
        line: 5,
        node: 3,
        content: 'Visit left-left child (3)',
        description: 'Visit left-left child (3)',
        visualState: {
          tree: tree,
          current: 3,
          visited: [0, 1, 3]
        }
      },
      {
        id: 'visit-left-right',
        type: 'tree-visit',
        line: 6,
        node: 4,
        content: 'Visit left-right child (7)',
        description: 'Visit left-right child (7)',
        visualState: {
          tree: tree,
          current: 4,
          visited: [0, 1, 3, 4]
        }
      },
      {
        id: 'visit-right',
        type: 'tree-visit',
        line: 7,
        node: 2,
        content: 'Visit right child (15)',
        description: 'Visit right child (15)',
        visualState: {
          tree: tree,
          current: 2,
          visited: [0, 1, 3, 4, 2]
        }
      },
      {
        id: 'visit-right-left',
        type: 'tree-visit',
        line: 8,
        node: 5,
        content: 'Visit right-left child (12)',
        description: 'Visit right-left child (12)',
        visualState: {
          tree: tree,
          current: 5,
          visited: [0, 1, 3, 4, 2, 5]
        }
      },
      {
        id: 'visit-right-right',
        type: 'tree-visit',
        line: 9,
        node: 6,
        content: 'Visit right-right child (18)',
        description: 'Visit right-right child (18)',
        visualState: {
          tree: tree,
          current: 6,
          visited: [0, 1, 3, 4, 2, 5, 6]
        }
      },
      {
        id: 'traversal-complete',
        type: 'tree-complete',
        line: 10,
        content: 'Traversal complete',
        description: 'Traversal complete',
        visualState: {
          tree: tree,
          visited: [0, 1, 3, 4, 2, 5, 6],
          complete: true
        }
      }
    ];
    
    steps.push(...traversalSteps);
  } else if (isSearch) {
    // Simulate search operation
    const searchValue = 15;
    
    steps.push({
      id: 'search-start',
      type: 'tree-search',
      line: 3,
      content: `Searching for value ${searchValue}`,
      description: `Searching for value ${searchValue}`,
      visualState: {
        tree: tree,
        searching: searchValue
      }
    });
    
    steps.push({
      id: 'compare-root',
      type: 'tree-compare',
      line: 4,
      content: `Compare with root (10)`,
      description: `Compare with root (10)`,
      visualState: {
        tree: tree,
        current: 0,
        searching: searchValue
      }
    });
    
    steps.push({
      id: 'go-right',
      type: 'tree-direction',
      line: 5,
      content: `${searchValue} > 10, go right`,
      description: `${searchValue} > 10, go right`,
      visualState: {
        tree: tree,
        current: 2,
        searching: searchValue
      }
    });
    
    steps.push({
      id: 'found',
      type: 'tree-found',
      line: 6,
      content: `Found ${searchValue}!`,
      description: `Found ${searchValue}!`,
      visualState: {
        tree: tree,
        current: 2,
        searching: searchValue,
        found: true
      }
    });
  } else if (isInsertion) {
    // Simulate insertion operation
    const insertValue = 9;
    
    steps.push({
      id: 'insert-start',
      type: 'tree-insert',
      line: 3,
      content: `Inserting value ${insertValue}`,
      description: `Inserting value ${insertValue}`,
      visualState: {
        tree: tree,
      }
    });
    
    steps.push({
      id: 'compare-root',
      type: 'tree-compare',
      line: 4,
      content: `Compare with root (10)`,
      description: `Compare with root (10)`,
      visualState: {
        tree: tree,
        current: 0,
      }
    });
    
    steps.push({
      id: 'go-left',
      type: 'tree-direction',
      line: 5,
      content: `${insertValue} < 10, go left`,
      description: `${insertValue} < 10, go left`,
      visualState: {
        tree: tree,
        current: 1,
      }
    });
    
    steps.push({
      id: 'compare-left',
      type: 'tree-compare',
      line: 6,
      content: `Compare with node (5)`,
      description: `Compare with node (5)`,
      visualState: {
        tree: tree,
        current: 1,
      }
    });
    
    steps.push({
      id: 'go-right-from-left',
      type: 'tree-direction',
      line: 7,
      content: `${insertValue} > 5, go right`,
      description: `${insertValue} > 5, go right`,
      visualState: {
        tree: tree,
        current: 4,
      }
    });
    
    const newTree = [...tree, 9];
    
    steps.push({
      id: 'inserted',
      type: 'tree-inserted',
      line: 8,
      content: `Inserted ${insertValue}`,
      description: `Inserted ${insertValue}`,
      visualState: {
        tree: newTree,
        current: 7,
      }
    });
  } else {
    // Generic tree operations
    steps.push({
      id: 'tree-operation',
      type: 'tree-generic',
      line: 3,
      content: 'Performing tree operation',
      description: 'Performing tree operation',
      visualState: {
        tree: tree,
        current: 0,
      }
    });
    
    steps.push({
      id: 'tree-complete',
      type: 'tree-complete',
      line: 5,
      content: 'Tree operation complete',
      description: 'Tree operation complete',
      visualState: {
        tree: tree,
        visited: [0, 1, 2],
        complete: true
      }
    });
  }
  
  return steps;
}
