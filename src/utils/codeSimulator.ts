
export function simulateCustomCodeExecution(code: string, language: string) {
  let steps = [];
  let output = '';
  
  // Determine what kind of algorithm this is based on code analysis
  const isSort = code.includes('sort') || code.includes('swap');
  const isSearch = code.includes('search') || code.includes('find');
  
  if (language === 'js') {
    if (code.includes('for') || code.includes('while')) {
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
    if (code.includes('for') || code.includes('while')) {
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
  }
  
  if (isSort) {
    output = 'Sorting algorithm executed';
  } else if (isSearch) {
    output = 'Search algorithm executed';
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
