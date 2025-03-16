
export type AlgorithmType = 
  | 'sorting' 
  | 'searching' 
  | 'graph' 
  | 'tree' 
  | 'dynamic-programming'
  | 'custom';

export type AlgorithmStep = {
  id: string;
  description: string;
  highlightedLines: number[];
  visualState: any;
};

export type Algorithm = {
  id: string;
  name: string;
  type: AlgorithmType;
  description: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  generateSteps: (input: any) => AlgorithmStep[];
  defaultInput: any;
};
