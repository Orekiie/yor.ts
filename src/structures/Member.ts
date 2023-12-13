import {
  APIInteractionGuildMember,
  GuildsAPI,
  RESTPutAPIGuildBanJSONBody,
} from '@discordjs/core/http-only';

import { Base } from './Base';
import { Guild } from './Guild';
import { User } from './User';
import { YorClient } from './YorClient';

export class Member extends Base {
  private API: GuildsAPI;

  public raw: APIInteractionGuildMember & { guildID: string };
  public user: User;

  /**
   * Constructs a new instance of the constructor.
   *
   * @param {YorClient} client - The client object.
   * @param {string} guildID - The ID of the guild.
   * @param {APIInteractionGuildMember} member - The member object.
   */
  constructor(
    client: YorClient,
    guildID: string,
    member: APIInteractionGuildMember,
  ) {
    super(client);

    this.API = client.api.guilds;

    this.raw = { ...member, guildID };
    this.user = new User(this.client, member.user);
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
    return new Guild(this.client, await this.API.get(this.raw.guildID));
  }
}
