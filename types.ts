
export interface ProductTemplate {
  id: string;
  name: string;
  category: 'Apparel' | 'Headwear' | 'Accessories';
  imageUrl: string;
  description: string;
}

export interface MockupResult {
  id: string;
  imageUrl: string;
  promptUsed: string;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  EDITING = 'EDITING',
  ERROR = 'ERROR'
}
