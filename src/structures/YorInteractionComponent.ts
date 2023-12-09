import { Component } from '../interfaces/Component';

import { ComponentContext } from './Contexts/ComponentContext';

export class YorInteractionComponent implements Component {
  id!: string;
  execute!: (context: ComponentContext) => void | Promise<void>;
}
