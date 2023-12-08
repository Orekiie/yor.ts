import { Component } from '../interfaces/Component';

import { ComponentContext } from './Context';

export class YorInteractionComponent implements Component {
  id!: string;
  execute!: (context: ComponentContext) => void | Promise<void>;
}
