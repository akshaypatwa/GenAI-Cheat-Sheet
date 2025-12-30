import { LucideIcon } from 'lucide-react';

export interface Concept {
  id: string;
  title: string;
  shortDefinition: string;
  example: string;
  uses: string[];
  category: 'Foundation' | 'Architecture' | 'Technique' | 'Parameter' | 'Risk' | 'Advanced';
  iconName: string; // Mapping string to icon component in UI
  color: string; // Tailwind color class prefix (e.g. "blue", "purple")
}

export interface ModalState {
  isOpen: boolean;
  concept: Concept | null;
  aiContent?: string | null;
  isLoadingAi?: boolean;
}
