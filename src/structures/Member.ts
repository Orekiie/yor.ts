import { APIInteractionGuildMember, GuildsAPI } from '@discordjs/core';

import { Guild } from './Guild';

export class Member {
  private API: GuildsAPI;

  public raw: APIInteractionGuildMember & { guildID: string };

  /**
   * Constructs a new instance of the constructor.
   *
   * @param {GuildsAPI} API - The API instance.
   * @param {string} guildID - The ID of the guild.
   * @param {APIInteractionGuildMember} member - The member object.
   */
  constructor(
    API: GuildsAPI,
    guildID: string,
    member: APIInteractionGuildMember,
  ) {
    this.API = API;

    this.raw = { ...member, guildID };
  }

  /**
   * Bans a user with optional additional data.
   *
   * @param {Parameters<typeof this.API.banUser>[2] & { reason: string }} data - The optional additional data for banning the user. It can include properties like `delete_message_seconds` and `reason`.
   * @return {Promise<void>} A promise that resolves when the user is successfully banned.
   */
  public async ban(
    data?: Parameters<typeof this.API.banUser>[2] & { reason: string },
  ): Promise<void> {
    return this.API.banUser(
      this.raw.guildID,
      this.raw.user.id,
      { delete_message_seconds: data?.delete_message_seconds },
      { reason: data?.reason },
    );
  }

  /**
   * Fetches a guild using the guild ID.
   *
   * @return {Promise<Guild>} A Promise that resolves with the fetched Guild object.
   */
  public async fetchGuild(): Promise<Guild> {
    return new Guild(this.API, await this.API.get(this.raw.guildID));
  }
}
