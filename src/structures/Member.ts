import {
  APIInteractionGuildMember,
  GuildsAPI,
  RESTPutAPIGuildBanJSONBody,
} from '@discordjs/core/http-only';

import { Guild } from './Guild';
import { User } from './User';
import { YorClientAPI } from './YorClientAPI';

export class Member {
  private API: GuildsAPI;

  public raw: APIInteractionGuildMember & { guildID: string };
  public user: User;

  /**
   * Constructs a new instance of the constructor.
   *
   * @param {YorClientAPI} API - The API instance.
   * @param {string} guildID - The ID of the guild.
   * @param {APIInteractionGuildMember} member - The member object.
   */
  constructor(
    API: YorClientAPI,
    guildID: string,
    member: APIInteractionGuildMember,
  ) {
    this.API = API.guilds;

    this.raw = { ...member, guildID };
    this.user = new User(API.users, member.user);
  }

  /**
   * Bans a user with optional additional data.
   *
   * @param {RESTPutAPIGuildBanJSONBody & { reason: string }} data - The optional additional data for banning the user. It can include properties like `delete_message_seconds` and `reason`.
   * @return {Promise<void>} A promise that resolves when the user is successfully banned.
   */
  public async ban(
    data?: RESTPutAPIGuildBanJSONBody & { reason: string },
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
