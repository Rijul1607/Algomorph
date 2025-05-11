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
    if (isSort) {
      // Simulate Python sort
      steps = generatePythonSortSteps(code);
      output = 'Python sorting algorithm executed';
    } else if (isSearch) {
      // Simulate Python search
      steps = generatePythonSearchSteps(code);
      output = 'Python search algorithm executed';
    } else if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, language);
      output = 'Python tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, language);
      output = 'Python loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, language);
      output = 'Python conditional execution completed';
    } else if (code.includes('def')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, language);
      output = 'Python function execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, language);
      output = 'Python code execution completed';
    }
  } else if (language === 'cpp') {
    if (isSort) {
      // Simulate C++ sort
      steps = generateCppSortSteps(code);
      output = 'C++ sorting algorithm executed';
    } else if (isSearch) {
      // Simulate C++ search
      steps = generateCppSearchSteps(code);
      output = 'C++ search algorithm executed';
    } else if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, language);
      output = 'C++ tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, language);
      output = 'C++ loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, language);
      output = 'C++ conditional execution completed';
    } else if (code.includes('void') || code.includes('int') || code.includes('function')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, language);
      output = 'C++ function execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, language);
      output = 'C++ code execution completed';
    }
  } else if (language === 'java') {
    if (isSort) {
      // Simulate Java sort
      steps = generateJavaSortSteps(code);
      output = 'Java sorting algorithm executed';
    } else if (isSearch) {
      // Simulate Java search
      steps = generateJavaSearchSteps(code);
      output = 'Java search algorithm executed';
    } else if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, language);
      output = 'Java tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, language);
      output = 'Java loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, language);
      output = 'Java conditional execution completed';
    } else if (code.includes('void') || code.includes('int') || code.includes('public') || code.includes('private')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, language);
      output = 'Java method execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, language);
      output = 'Java code execution completed';
    }
  } else {
    // Default JavaScript
    if (isTree) {
      // Simulate tree operations
      steps = generateTreeSteps(code, 'js');
      output = 'Tree operations completed';
    } else if (code.includes('for') || code.includes('while')) {
      // Simulate loop execution
      steps = generateLoopSteps(code, 'js');
      output = 'Loop execution completed';
    } else if (code.includes('if') || code.includes('else')) {
      // Simulate conditional execution
      steps = generateConditionalSteps(code, 'js');
      output = 'Conditional execution completed';
    } else if (code.includes('function')) {
      // Simulate function execution
      steps = generateFunctionSteps(code, 'js');
      output = 'Function execution completed';
    } else if (code.includes('async') || code.includes('await')) {
      // Simulate async execution
      steps = generateAsyncSteps(code, 'js');
      output = 'Async execution completed';
    } else {
      // Generic execution
      steps = generateGenericSteps(code, 'js');
      output = 'Code execution completed';
    }
  }
  
  if (isSort) {
    output = language.toUpperCase() + ' sorting algorithm executed';
  } else if (isSearch) {
    output = language.toUpperCase() + ' search algorithm executed';
  } else if (isTree) {
    output = language.toUpperCase() + ' tree algorithm executed';
  }
  
  return { steps, output };
}

function generatePythonSortSteps(code: string) {
  // Sample data for visualization
  const array = [64, 34, 25, 12, 22, 11, 90];
  const steps = [];
  
  // Initial state
  steps.push({
    id: 'init',
    description: 'Initial array',
    visualState: {
      array: [...array],
      variables: { 'n': array.length },
      comparing: [],
      swapping: [],
      sorted: []
    }
  });
  
  // Simulate bubble sort steps
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // Comparing step
      steps.push({
        id: `compare-${i}-${j}`,
        description: `Comparing elements at indices ${j} and ${j+1}`,
        visualState: {
          array: [...array],
          variables: { 'i': i, 'j': j, 'n': array.length },
          comparing: [j, j+1],
          swapping: [],
          sorted: Array.from({length: i}, (_, idx) => array.length - 1 - idx)
        }
      });
      
      if (array[j] > array[j + 1]) {
        // Swap step
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        
        steps.push({
          id: `swap-${i}-${j}`,
          description: `Swapping elements at indices ${j} and ${j+1}`,
          visualState: {
            array: [...array],
            variables: { 'i': i, 'j': j, 'n': array.length },
            comparing: [],
            swapping: [j, j+1],
            sorted: Array.from({length: i}, (_, idx) => array.length - 1 - idx)
          }
        });
      }
    }
    
    // Mark element as sorted
    steps.push({
      id: `sorted-${i}`,
      description: `Element at index ${array.length - 1 - i} is now sorted`,
      visualState: {
        array: [...array],
        variables: { 'i': i, 'n': array.length },
        comparing: [],
        swapping: [],
        sorted: Array.from({length: i+1}, (_, idx) => array.length - 1 - idx)
      }
    });
  }
  
  // Final sorted array
  steps.push({
    id: 'final',
    description: 'Array is fully sorted',
    visualState: {
      array: [...array],
      variables: { 'n': array.length },
      comparing: [],
      swapping: [],
      sorted: Array.from({length: array.length}, (_, i) => i)
    }
  });
  
  return steps;
}

function generateCppSortSteps(code: string) {
  // Similar to Python sort steps but with C++ specific formatting
  const array = [64, 34, 25, 12, 22, 11, 90];
  const steps = [];
  
  // Initial state
  steps.push({
    id: 'init',
    description: 'Initial array',
    visualState: {
      array: [...array],
      variables: { 'size': array.length },
      comparing: [],
      swapping: [],
      sorted: []
    }
  });
  
  // Simulate selection sort steps for C++
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    
    steps.push({
      id: `outer-${i}`,
      description: `Outer loop iteration ${i+1}, looking for minimum element`,
      visualState: {
        array: [...array],
        variables: { 'i': i, 'minIndex': minIndex, 'size': array.length },
        comparing: [],
        swapping: [],
        sorted: Array.from({length: i}, (_, idx) => idx)
      }
    });
    
    for (let j = i + 1; j < array.length; j++) {
      // Comparing step
      steps.push({
        id: `compare-${i}-${j}`,
        description: `Comparing elements at indices ${minIndex} and ${j}`,
        visualState: {
          array: [...array],
          variables: { 'i': i, 'j': j, 'minIndex': minIndex, 'size': array.length },
          comparing: [minIndex, j],
          swapping: [],
          sorted: Array.from({length: i}, (_, idx) => idx)
        }
      });
      
      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          id: `update-min-${i}-${j}`,
          description: `Updating minimum index to ${j}`,
          visualState: {
            array: [...array],
            variables: { 'i': i, 'j': j, 'minIndex': minIndex, 'size': array.length },
            comparing: [],
            highlighted: [minIndex],
            sorted: Array.from({length: i}, (_, idx) => idx)
          }
        });
      }
    }
    
    // Swap step if needed
    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      
      steps.push({
        id: `swap-${i}`,
        description: `Swapping elements at indices ${i} and ${minIndex}`,
        visualState: {
          array: [...array],
          variables: { 'i': i, 'minIndex': minIndex, 'size': array.length },
          comparing: [],
          swapping: [i, minIndex],
          sorted: Array.from({length: i}, (_, idx) => idx)
        }
      });
    }
    
    // Mark element as sorted
    steps.push({
      id: `sorted-${i}`,
      description: `Element at index ${i} is now sorted`,
      visualState: {
        array: [...array],
        variables: { 'i': i, 'size': array.length },
        comparing: [],
        swapping: [],
        sorted: Array.from({length: i+1}, (_, idx) => idx)
      }
    });
  }
  
  // Final sorted array
  steps.push({
    id: 'final',
    description: 'Array is fully sorted',
    visualState: {
      array: [...array],
      variables: { 'size': array.length },
      comparing: [],
      swapping: [],
      sorted: Array.from({length: array.length}, (_, i) => i)
    }
  });
  
  return steps;
}

function generateJavaSortSteps(code: string) {
  // Similar to C++ sort steps but with Java specific formatting
  const array = [64, 34, 25, 12, 22, 11, 90];
  const steps = [];
  
  // Initial state
  steps.push({
    id: 'init',
    description: 'Initial array',
    visualState: {
      array: [...array],
      variables: { 'length': array.length },
      comparing: [],
      swapping: [],
      sorted: []
    }
  });
  
  // Simulate insertion sort steps for Java
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    
    steps.push({
      id: `outer-${i}`,
      description: `Outer loop iteration ${i}, processing element ${key}`,
      visualState: {
        array: [...array],
        variables: { 'i': i, 'key': key, 'j': j, 'length': array.length },
        comparing: [],
        highlighted: [i],
        sorted: Array.from({length: i}, (_, idx) => idx)
      }
    });
    
    while (j >= 0 && array[j] > key) {
      // Comparing step
      steps.push({
        id: `compare-${i}-${j}`,
        description: `Comparing elements at indices ${j} and key value ${key}`,
        visualState: {
          array: [...array],
          variables: { 'i': i, 'key': key, 'j': j, 'length': array.length },
          comparing: [j, i],
          swapping: [],
          sorted: Array.from({length: i}, (_, idx) => idx)
        }
      });
      
      // Move elements
      array[j + 1] = array[j];
      
      steps.push({
        id: `shift-${i}-${j}`,
        description: `Shifting element at index ${j} to position ${j+1}`,
        visualState: {
          array: [...array],
          variables: { 'i': i, 'key': key, 'j': j, 'length': array.length },
          comparing: [],
          swapping: [j, j+1],
          sorted: Array.from({length: i}, (_, idx) => idx)
        }
      });
      
      j = j - 1;
    }
    
    array[j + 1] = key;
    
    steps.push({
      id: `insert-${i}`,
      description: `Inserting key ${key} at position ${j+1}`,
      visualState: {
        array: [...array],
        variables: { 'i': i, 'key': key, 'j': j, 'length': array.length },
        comparing: [],
        highlighted: [j+1],
        sorted: Array.from({length: i+1}, (_, idx) => idx)
      }
    });
  }
  
  // Final sorted array
  steps.push({
    id: 'final',
    description: 'Array is fully sorted',
    visualState: {
      array: [...array],
      variables: { 'length': array.length },
      comparing: [],
      swapping: [],
      sorted: Array.from({length: array.length}, (_, i) => i)
    }
  });
  
  return steps;
}

function generatePythonSearchSteps(code: string) {
  // Sample data for visualization
  const array = [11, 22, 25, 34, 64, 90];
  const target = 25;
  const steps = [];
  
  // Initial state
  steps.push({
    id: 'init',
    description: 'Initial array and search target',
    visualState: {
      array: [...array],
      target: target,
      variables: { 'n': array.length, 'target': target },
      current: null,
    }
  });
  
  // Simulate binary search steps
  let left = 0;
  let right = array.length - 1;
  let found = false;
  
  steps.push({
    id: 'search-start',
    description: 'Starting binary search with left and right pointers',
    visualState: {
      array: [...array],
      target: target,
      variables: { 'left': left, 'right': right, 'target': target },
      left: left,
      right: right
    }
  });
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Calculate middle position
    steps.push({
      id: `mid-calc-${left}-${right}`,
      description: `Calculate middle position: (${left} + ${right}) / 2 = ${mid}`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'left': left, 'right': right, 'mid': mid, 'target': target },
        left: left,
        right: right,
        current: mid
      }
    });
    
    // Compare with target
    steps.push({
      id: `compare-${mid}`,
      description: `Comparing middle element ${array[mid]} with target ${target}`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'left': left, 'right': right, 'mid': mid, 'arr[mid]': array[mid], 'target': target },
        left: left,
        right: right,
        current: mid,
        checked: [mid]
      }
    });
    
    if (array[mid] === target) {
      found = true;
      
      steps.push({
        id: 'found',
        description: `Target ${target} found at index ${mid}!`,
        visualState: {
          array: [...array],
          target: target,
          variables: { 'left': left, 'right': right, 'mid': mid, 'target': target },
          left: left,
          right: right,
          current: mid,
          found: true
        }
      });
      
      break;
    } else if (array[mid] < target) {
      left = mid + 1;
      
      steps.push({
        id: `move-left-${left}`,
        description: `Middle element ${array[mid]} < target ${target}, moving left pointer to ${left}`,
        visualState: {
          array: [...array],
          target: target,
          variables: { 'left': left, 'right': right, 'mid': mid, 'target': target },
          left: left,
          right: right,
          checked: Array.from({length: mid + 1}, (_, i) => i)
        }
      });
    } else {
      right = mid - 1;
      
      steps.push({
        id: `move-right-${right}`,
        description: `Middle element ${array[mid]} > target ${target}, moving right pointer to ${right}`,
        visualState: {
          array: [...array],
          target: target,
          variables: { 'left': left, 'right': right, 'mid': mid, 'target': target },
          left: left,
          right: right,
          checked: Array.from({length: array.length - mid}, (_, i) => mid + i)
        }
      });
    }
  }
  
  if (!found) {
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array!`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'left': left, 'right': right, 'target': target },
        checked: Array.from({length: array.length}, (_, i) => i),
        found: false
      }
    });
  }
  
  return steps;
}

function generateCppSearchSteps(code: string) {
  // Similar to Python search but with C++ specific formatting
  const array = [11, 22, 25, 34, 64, 90];
  const target = 64;
  const steps = [];
  
  // Initial state for linear search in C++
  steps.push({
    id: 'init',
    description: 'Initial array and search target',
    visualState: {
      array: [...array],
      target: target,
      variables: { 'size': array.length, 'target': target },
      current: null,
    }
  });
  
  // Simulate linear search steps
  let found = false;
  let foundIndex = -1;
  
  for (let i = 0; i < array.length; i++) {
    steps.push({
      id: `check-${i}`,
      description: `Checking element at index ${i}: ${array[i]}`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'i': i, 'current': array[i], 'target': target },
        current: i,
        checked: Array.from({length: i}, (_, idx) => idx)
      }
    });
    
    if (array[i] === target) {
      found = true;
      foundIndex = i;
      
      steps.push({
        id: 'found',
        description: `Target ${target} found at index ${i}!`,
        visualState: {
          array: [...array],
          target: target,
          variables: { 'i': i, 'found': true, 'target': target },
          current: i,
          found: true
        }
      });
      
      break;
    }
  }
  
  if (!found) {
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array!`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'found': false, 'target': target },
        checked: Array.from({length: array.length}, (_, i) => i),
        found: false
      }
    });
  } else {
    steps.push({
      id: 'search-complete',
      description: `Search complete. Target ${target} found at index ${foundIndex}`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'result': foundIndex, 'target': target },
        current: foundIndex,
        found: true
      }
    });
  }
  
  return steps;
}

function generateJavaSearchSteps(code: string) {
  // Jump search implementation for Java
  const array = [11, 22, 25, 34, 64, 90];
  const target = 34;
  const steps = [];
  
  // Initial state
  steps.push({
    id: 'init',
    description: 'Initial array and search target',
    visualState: {
      array: [...array],
      target: target,
      variables: { 'length': array.length, 'target': target },
      current: null,
    }
  });
  
  // Jump search parameters
  const blockSize = Math.floor(Math.sqrt(array.length));
  let prev = 0;
  
  steps.push({
    id: 'block-size',
    description: `Calculating block size: sqrt(${array.length}) = ${blockSize}`,
    visualState: {
      array: [...array],
      target: target,
      variables: { 'length': array.length, 'blockSize': blockSize, 'target': target },
    }
  });
  
  // Finding the block
  let step = blockSize;
  while (step < array.length && array[step - 1] < target) {
    steps.push({
      id: `jump-${prev}-${step}`,
      description: `Jumping to index ${step}`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'prev': prev, 'step': step, 'target': target },
        current: step - 1,
        checked: Array.from({length: step}, (_, i) => i)
      }
    });
    
    prev = step;
    step += blockSize;
  }
  
  // Linear search within block
  let found = false;
  for (let i = prev; i < Math.min(step, array.length); i++) {
    steps.push({
      id: `check-${i}`,
      description: `Checking element at index ${i}: ${array[i]}`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'i': i, 'current': array[i], 'target': target },
        current: i,
        left: prev,
        right: Math.min(step, array.length) - 1
      }
    });
    
    if (array[i] === target) {
      found = true;
      
      steps.push({
        id: 'found',
        description: `Target ${target} found at index ${i}!`,
        visualState: {
          array: [...array],
          target: target,
          variables: { 'i': i, 'found': true, 'target': target },
          current: i,
          found: true
        }
      });
      
      break;
    }
  }
  
  if (!found) {
    steps.push({
      id: 'not-found',
      description: `Target ${target} not found in the array!`,
      visualState: {
        array: [...array],
        target: target,
        variables: { 'found': false, 'target': target },
        checked: Array.from({length: array.length}, (_, i) => i),
        found: false
      }
    });
  }
  
  return steps;
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
