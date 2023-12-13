/* eslint-disable no-bitwise */
import { APIChannel, APIUser, UsersAPI } from '@discordjs/core/http-only';
import { BaseImageURLOptions, CDN, ImageURLOptions } from '@discordjs/rest';

import { Base } from './Base';
import { YorClient } from './YorClient';
import { YorClientError } from './YorClientError';

export class User extends Base {
  private API: UsersAPI;
  private CDN: CDN = new CDN();

  public raw: APIUser;

  /**
   * Constructor function.
   *
   * @param {UsersAPI} API - The UsersAPI instance.
   * @param {APIUser} data - The data for the APIUser.
   */
  constructor(client: YorClient, data: APIUser) {
    super(client);

    this.API = client.api.users;

    this.raw = data;
  }

  /**
   * Creates a direct message channel.
   *
   * @return {Promise<APIChannel>} A promise that resolves to the created direct message channel.
   */
  public async createDM(): Promise<APIChannel> {
    return this.API.createDM(this.raw.id);
  }

  /**
   * Generates the avatar URL for the user.
   *
   * @param {Readonly<ImageURLOptions>} options - The options for generating the avatar URL.
   * @return {string} The generated avatar URL.
   */
  public getAvatarURL(options?: Readonly<ImageURLOptions>): string | undefined {
    return this.raw.avatar
      ? this.CDN.avatar(this.raw.id, this.raw.avatar, options)
      : undefined;
  }

  /**
   * Retrieves the URL for the banner image.
   *
   * @param {Readonly<ImageURLOptions>} options - description of the options parameter
   * @return {string} the URL for the banner image
   */
  public getBannerURL(options?: Readonly<ImageURLOptions>): string | undefined {
    return this.raw.banner
      ? this.CDN.banner(this.raw.id, this.raw.banner, options)
      : undefined;
  }

  /**
   * Retrieves the URL of the avatar decoration based on the provided options.
   *
   * @param {Readonly<BaseImageURLOptions>} options - The options for the avatar decoration.
   * @return {string | undefined} The URL of the avatar decoration, or undefined if it is not available.
   */
  public getAvatarDecorationURL(
    options?: Readonly<BaseImageURLOptions>,
  ): string | undefined {
    return this.raw.avatar_decoration
      ? this.CDN.avatarDecoration(
          this.raw.id,
          this.raw.avatar_decoration,
          options,
        )
      : undefined;
  }

  /**
   * Calculates the timestamp when this object was created.
   *
   * @return {number} The timestamp in milliseconds.
   */
  public createdTimestamp(): number {
    try {
      const milliseconds = BigInt(parseInt(this.raw.id)) >> 22n;
      return new Date(Number(milliseconds) + 1420070400000).valueOf();
    } catch (error) {
      throw new YorClientError('Invalid snowflake');
    }
  }

  /**
   * Retrieves the creation date of the object.
   *
   * @return {Date} The creation date of the object.
   */
  public createdAt(): Date {
    return new Date(this.createdTimestamp());
  }

  /**
   * Checks if the user is a bot.
   *
   * @return {boolean} Whether the user is a bot.
   */
  public isBot(): boolean {
    return Boolean(this.raw.bot);
  }

  /**
   * Checks if the user is a system user.
   *
   * @return {boolean} Whether the user is a system user.
   */
  public isSystem(): boolean {
    return Boolean(this.raw.system);
  }
}
