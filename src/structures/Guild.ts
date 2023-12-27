import {
  APIAuditLog,
  APIGuild,
  APIGuildOnboarding,
  APIGuildPreview,
  APIGuildWelcomeScreen,
  APIGuildWidget,
  APISticker,
  APITemplate,
  APIWebhook,
  GuildFeature,
  GuildPremiumTier,
  RESTGetAPIAuditLogQuery,
  RESTGetAPIGuildIntegrationsResult,
  RESTGetAPIGuildTemplatesResult,
  RESTGetAPIGuildVanityUrlResult,
  RESTPatchAPIGuildJSONBody,
  RESTPostAPIGuildChannelJSONBody,
} from '@discordjs/core/http-only';

import { Base } from './Base';
import { Channel } from './Channel';
import { Emoji } from './Emoji';
import { Role } from './Role';
import { Sticker } from './Sticker';
import { User } from './User';
import { YorClient } from './YorClient';

export class Guild extends Base {
  public id: string;
  public features: GuildFeature[];
  public premiumTier: GuildPremiumTier;
  public joinedTimestamp?: number;
  public roles: Role[];
  public emojis: Emoji[];
  public stickers: Sticker[];

  public raw: APIGuild;

  /**
   * Initializes a new instance of the Constructor class.
   *
   * @param {YorClient} client - The client object.
   * @param {APIGuild} data - The APIGuild data.
   */
  constructor(client: YorClient, data: APIGuild) {
    super(client);

    this.raw = data;
    this.id = this.raw.id;

    if ('joined_at' in data) {
      /**
       * The timestamp the client user joined the guild at
       * @type {number}
       */
      this.joinedTimestamp = Date.parse(data.joined_at as string);
    }

    this.features = this.raw.features;
    this.premiumTier = this.raw.premium_tier;
    this.roles = this.raw.roles.map((role) => new Role(this.client, role));
    this.emojis = this.raw.emojis.map((emoji) => new Emoji(this.client, emoji));
    this.stickers = this.raw.stickers.map(
      (sticker) => new Sticker(this.client, sticker),
    );
  }

  /**
   * Returns the date when the user joined.
   *
   * @return {Date | undefined} The date when the user joined, or undefined if no joined timestamp is available.
   */
  public joinedAt(): Date | undefined {
    return this.joinedTimestamp ? new Date(this.joinedTimestamp) : undefined;
  }

  /**
   * Calculates and returns the maximum bitrate for audio streaming based on the guild's premium tier and features.
   *
   * @return {number} The maximum bitrate in bits per second.
   */
  public maximumBitrate(): number {
    if (this.features.includes(GuildFeature.VIPRegions)) {
      return 384_000;
    }

    switch (this.premiumTier) {
      case GuildPremiumTier.Tier1:
        return 128_000;
      case GuildPremiumTier.Tier2:
        return 256_000;
      case GuildPremiumTier.Tier3:
        return 384_000;
      default:
        return 96_000;
    }
  }

  /**
   * Retrieves the integrations for the guild.
   *
   * @return {Promise<RESTGetAPIGuildIntegrationsResult>} A promise that resolves with the result of the API call.
   */
  public async getIntegrations(): Promise<RESTGetAPIGuildIntegrationsResult> {
    return this.client.api.guilds.getIntegrations(this.id);
  }

  /**
   * Fetches the templates for the guild.
   *
   * @return {Promise<RESTGetAPIGuildTemplatesResult>} The result of the fetch operation.
   */
  public async fetchTemplates(): Promise<RESTGetAPIGuildTemplatesResult> {
    return this.client.api.guilds.getTemplates(this.id);
  }

  /**
   * Fetches the welcome screen for the guild.
   *
   * @return {Promise<APIGuildWelcomeScreen>} A promise that resolves to the welcome screen for the guild.
   */
  public async fetchWelcomeScreen(): Promise<APIGuildWelcomeScreen> {
    return this.client.api.guilds.getWelcomeScreen(this.id);
  }

  /**
   * Creates a template for the guild.
   * @param {string} name The name for the template
   * @param {string} [description] The description for the template
   * @returns {Promise<APITemplate>}
   */
  async createTemplate(
    name: string,
    description: string,
  ): Promise<APITemplate> {
    return this.client.api.guilds.createTemplate(this.id, {
      name,
      description,
    });
  }

  /**
   * Obtains a guild preview for this guild from Discord.
   * @returns {Promise<APIGuildPreview>}
   */
  public async fetchPreview(): Promise<APIGuildPreview> {
    return this.client.api.guilds.getPreview(this.id);
  }

  /**
   * Retrieves the vanity URL of the guild.
   *
   * @return {Promise<RESTGetAPIGuildVanityUrlResult>} The result of the API call
   */
  public async fetchVanity(): Promise<RESTGetAPIGuildVanityUrlResult> {
    return this.client.api.guilds.getVanityURL(this.id);
  }

  /**
   * Fetches the webhooks.
   *
   * @return {Promise<APIWebhook[]>} The webhooks.
   */
  public async fetchWebhooks(): Promise<APIWebhook[]> {
    return this.client.api.guilds.getWebhooks(this.id);
  }

  /**
   * Fetches the stickers.
   *
   * @return {Promise<APISticker[]>} The result of the API call.
   */
  public async fetchStickers(): Promise<APISticker[]> {
    return this.client.api.guilds.getStickers(this.id);
  }

  /**
   * Fetches the widget for the guild.
   *
   * @return {Promise<APIGuildWidget>} The guild widget.
   */

  public async fetchWidget(): Promise<APIGuildWidget> {
    return this.client.api.guilds.getWidget(this.id);
  }

  /**
   * Fetches the audit logs for the API.
   *
   * @param {RESTGetAPIAuditLogQuery} options - Optional query parameters for the audit log request.
   * @return {Promise<Omit<APIAuditLog, 'users'> & { users: User[] }>} A promise that resolves to the audit logs along with the users associated with the logs.
   */
  public async fetchAuditLogs(
    options?: RESTGetAPIAuditLogQuery,
  ): Promise<Omit<APIAuditLog, 'users'> & { users: User[] }> {
    const logs = await this.client.api.guilds.getAuditLogs(this.id, options);

    return {
      ...logs,
      users: logs.users.map((user) => new User(this.client, user)),
    };
  }

  /**
   * Fetches the onboarding data for the guild.
   *
   * @return {Promise<APIGuildOnboarding>} - The onboarding data for the guild.
   */
  public async fetchOnboarding(): Promise<APIGuildOnboarding> {
    return this.client.api.guilds.getOnboarding(this.id);
  }

  /**
   * Edits the guild with the given data.
   *
   * @param {RESTPatchAPIGuildJSONBody} data - The data to edit the guild with.
   * @return {Promise<Guild>} A promise that resolves with the edited guild.
   */
  public async edit(data: RESTPatchAPIGuildJSONBody): Promise<Guild> {
    const newGuild = await this.client.api.guilds.edit(this.id, data);
    return new Guild(this.client, newGuild);
  }

  /**
   * Creates a channel with the given data and reason.
   *
   * @param {RESTPostAPIGuildChannelJSONBody & { reason?: string }} data - The data for creating the channel.
   * @return {Promise<Channel>} A promise that resolves when the channel is created.
   */
  public async createChannel({ reason, ...data, }: RESTPostAPIGuildChannelJSONBody & { reason?: string }): Promise<Channel> {
    const newChannel = await this.client.api.guilds.createChannel(this.id, data, { reason });
    return new Channel(this.client, newChannel);
  }
}
