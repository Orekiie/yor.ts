import { ComponentContext } from '../structures/Contexts/ComponentContext';

export interface Component {
  id: string;
  execute: (context: ComponentContext) => Promise<void> | void;
}
