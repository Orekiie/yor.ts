import { APIUserApplicationCommandInteraction } from '@discordjs/core';

import { User } from '../../User';
import { YorClient } from '../../YorClient';

import { ContextMenuCommandInteraction } from './ContextMenuCommandInteraction';

export class UserContextMenuCommandInteraction extends ContextMenuCommandInteraction {
  /**
   * Represents a user context menu command
   *
   * @param {YorClient} client - the YorClient object
   * @param {APIUserApplicationCommandInteraction} data - the APIUserApplicationCommandInteraction object
   */
  public constructor(
    client: YorClient,
    data: APIUserApplicationCommandInteraction,
  ) {
    super(client, data);
  }

  /**
   * Retrieves the target user from the resolved users in the APIUserApplicationCommandInteraction data.
   *
   * @return {User | null} The target user if found, otherwise null.
   */
  public targetUser(): User | null {
    const user = (this.raw as APIUserApplicationCommandInteraction).data
      .resolved.users[this.targetId];

    if (!user) {
      return null;
    }

    return new User(this.client, user);
  }
}
