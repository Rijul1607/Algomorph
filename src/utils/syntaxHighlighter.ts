
import { ParsedCode } from './codeParser';

// Simple syntax highlighter for demonstration
export const highlightCode = (code: string, language: string): ParsedCode => {
  // JavaScript & TypeScript keywords
  const jsKeywords = ['import', 'export', 'default', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'interface', 'type', 'from', 'async', 'await', 'try', 'catch', 'finally', 'switch', 'case', 'break', 'continue', 'this', 'super', 'new', 'typeof', 'instanceof'];
  
  // Python keywords
  const pyKeywords = ['def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'is', 'not', 'and', 'or', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'None', 'True', 'False', 'pass', 'break', 'continue', 'global', 'nonlocal', 'assert', 'del', 'yield'];
  
  // Common operators
  const operators = ['=>', '=', '+', '-', '*', '/', '>', '<', '>=', '<=', '===', '!==', '==', '!=', '&&', '||', '!', '{', '}', '(', ')', '[', ']', ';', ':', '.', ','];
  
  // Choose keywords based on language
  const keywords = language === 'py' ? pyKeywords : jsKeywords;

  // Split the code into lines to preserve indentation
  const lines = code.split('\n');
  
  // Process each line
  const tokens: ParsedCode['tokens'] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let j = 0;
    
    while (j < line.length) {
      // Check for comments
      if (line.substr(j, 2) === '//' || (language === 'py' && line[j] === '#')) {
        tokens.push({ type: 'comment', content: line.substr(j) });
        break; // Comment takes the rest of the line
      }
      
      // Check for string literals
      if (line[j] === '"' || line[j] === "'" || line[j] === '`') {
        const quote = line[j];
        let endIndex = line.indexOf(quote, j + 1);
        while (endIndex !== -1 && line[endIndex - 1] === '\\') {
          endIndex = line.indexOf(quote, endIndex + 1);
        }
        
        if (endIndex === -1) {
          // Unterminated string
          tokens.push({ type: 'string', content: line.substr(j) });
          break;
        }
        
        tokens.push({ type: 'string', content: line.substring(j, endIndex + 1) });
        j = endIndex + 1;
        continue;
      }
      
      // Check for numbers
      if (/^-?\d/.test(line.substr(j))) {
        let k = j;
        while (k < line.length && /[\d.]/.test(line[k])) {
          k++;
        }
        tokens.push({ type: 'number', content: line.substring(j, k) });
        j = k;
        continue;
      }
      
      // Check for keywords and functions
      let isMatched = false;
      
      // Check for keywords
      for (const keyword of keywords) {
        if (line.substr(j, keyword.length) === keyword && 
            (j + keyword.length === line.length || !/[\w$]/.test(line[j + keyword.length]))) {
          tokens.push({ type: 'keyword', content: keyword });
          j += keyword.length;
          isMatched = true;
          break;
        }
      }
      
      if (isMatched) continue;
      
      // Check for function declarations or calls
      let functionRegex = language === 'py' ? 
        /^([a-zA-Z_]\w*)\s*\(/ :    // Python
        /^([a-zA-Z_$][\w$]*)\s*\(/; // JavaScript
        
      const functionMatch = functionRegex.exec(line.substr(j));
      if (functionMatch) {
        tokens.push({ type: 'function', content: functionMatch[1] });
        j += functionMatch[1].length;
        continue;
      }
      
      // Check for operators
      for (const op of operators) {
        if (line.substr(j, op.length) === op) {
          tokens.push({ type: 'operator', content: op });
          j += op.length;
          isMatched = true;
          break;
        }
      }
      
      if (isMatched) continue;
      
      // Check for variables/identifiers
      const identifierRegex = language === 'py' ? 
        /^[a-zA-Z_]\w*/ :    // Python
        /^[a-zA-Z_$][\w$]*/; // JavaScript
        
      const identifierMatch = identifierRegex.exec(line.substr(j));
      if (identifierMatch) {
        tokens.push({ type: 'variable', content: identifierMatch[0] });
        j += identifierMatch[0].length;
        continue;
      }
      
      // Plain text (spaces and other characters)
      tokens.push({ type: 'plain', content: line[j] });
      j++;
    }
    
    // Add line break at the end of each line except the last one
    if (i < lines.length - 1) {
      tokens.push({ type: 'plain', content: '\n' });
    }
  }
  
  return { tokens };
};

export const languageToColor = (language: string): string => {
  const languageColors: Record<string, string> = {
    'js': '#f1e05a',
    'jsx': '#f1e05a',
    'ts': '#3178c6',
    'tsx': '#3178c6',
    'html': '#e34c26',
    'css': '#563d7c',
    'json': '#292929',
    'md': '#083fa1',
    'py': '#3572A5',
    'rb': '#701516',
    'go': '#00ADD8',
    'rust': '#dea584',
  };
  
  return languageColors[language] || '#6e6e6e';
};
