import { APIModalSubmitInteraction } from '@discordjs/core';

import { BaseContext } from './BaseContext';

export class ModalContext extends BaseContext {
  public readonly raw: APIModalSubmitInteraction;

  /**
   * Initializes a new instance of the constructor.
   *
   * @param {APIModalSubmitInteraction} data - The data to initialize the instance with.
   */
  constructor(data: APIModalSubmitInteraction) {
    super();

    this.raw = data;
  }
}
