import { ComponentContext } from '../structures/Context';

export interface Component {
  id: string;
  execute: (context: ComponentContext) => Promise<void> | void;
}
