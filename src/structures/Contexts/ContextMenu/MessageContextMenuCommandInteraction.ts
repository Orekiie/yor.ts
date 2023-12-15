/* eslint-disable @typescript-eslint/no-useless-constructor */
import {
  APIMessage,
  APIMessageApplicationCommandInteraction,
} from '@discordjs/core/http-only';

import { YorClient } from '../../YorClient';

import { ContextMenuCommandInteraction } from './ContextMenuCommandInteraction';

export class MessageContextMenuCommandInteraction extends ContextMenuCommandInteraction {
  /**
   * Represents a message context menu command
   *
   * @param {YorClient} client - The client object.
   * @param {APIMessageApplicationCommandInteraction} data - The data object.
   */
  constructor(
    client: YorClient,
    data: APIMessageApplicationCommandInteraction,
  ) {
    super(client, data);
  }

  /**
   * Retrieves the target message from the resolved messages.
   *
   * @return {APIMessage | null} The target message, or null if not found.
   */
  public getTargetMessage(): APIMessage | null {
    const message = (this.raw as APIMessageApplicationCommandInteraction).data
      .resolved.messages[this.targetId];

    if (!message) {
      return null;
    }

    return message;
  }
}
