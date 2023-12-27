import {
  APIGuildMember,
  APIInteractionGuildMember,
  GuildsAPI,
  RESTPatchAPIGuildMemberJSONBody,
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
  public nickname?: string;
  public joinedTimestamp?: number;

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

    this.nickname = this.raw.nick as string | undefined;
    this.joinedTimestamp = Date.parse(this.raw.joined_at);
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
   * Kick a member from the guild.
   *
   * @param {string} reason - The reason for the kick, optional.
   * @return {Promise<unknown>} A promise that resolves with the result of the kick.
   */
  public async kick(reason?: string): Promise<unknown> {
    return this.client.api.guilds.removeMember(
      this.raw.guildID,
      this.raw.user.id,
      { reason },
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

  /**
   * Returns the joined date of the user as a Date object.
   *
   * @return {Date | undefined} - The joined date of the user, or undefined if the joined timestamp is not set.
   */
  public joinedAt(): Date | undefined {
    return this.joinedTimestamp ? new Date(this.joinedTimestamp) : undefined;
  }

  /**
   * Returns the display name for the member.
   *
   * @return {string} The display name of the member.
   */
  public displayName(): string {
    return this.nickname ?? this.user.displayName();
  }

  /**
   * Edits a guild member.
   *
   * @param {RESTPatchAPIGuildMemberJSONBody & { reason?: string }} data - The data to edit the guild member with. It should include the reason as a string if provided.
   * @return {Promise<APIGuildMember>} A promise that resolves with the edited guild member object.
   */
  public edit({
    reason,
    ...data
  }: RESTPatchAPIGuildMemberJSONBody & {
    reason?: string;
  }): Promise<APIGuildMember> {
    return this.client.api.guilds.editMember(
      this.raw.guildID,
      this.user.raw.id,
      data,
      { reason },
    );
  }
}
