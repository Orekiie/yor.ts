/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { APIEmoji } from '@discordjs/core';
import { formatEmoji } from '@discordjs/formatters';
import { BaseImageURLOptions } from '@discordjs/rest';

import { Base } from './Base';
import { User } from './User';
import { YorClient } from './YorClient';
import { YorClientError } from './YorClientError';

export class Emoji extends Base {
  public raw: APIEmoji;
  public id: string;
  public name: string;
  public roles?: string[];
  public creator?: User;
  public requireColons?: boolean;
  public managed?: boolean;
  public animated?: boolean;
  public available?: boolean;

  /**
   * Represents an emoji on the Discord platform.
   *
   * @extends {Base}
   * @param {YorClient} client - The client object.
   * @param {APIEmoji} data - The APIEmoji data.
   *
   */
  constructor(client: YorClient, data: APIEmoji) {
    super(client);

    this.raw = data;

    this.id = this.raw.id as string;
    this.animated = this.raw.animated;
    this.name = this.raw.name as string;
    this.available = this.raw.available;
    this.managed = this.raw.managed;
    this.roles = this.raw.roles;
    this.creator = this.raw.user
      ? new User(this.client, this.raw.user)
      : undefined;
  }

  /**
   * The identifier of this emoji, used for message reactions
   *
   * @return {string} The identifier string for the object.
   */
  public identifier(): string {
    if (this.id) return `${this.animated ? 'a:' : ''}${this.name}:${this.id}`;
    return encodeURIComponent(this.name);
  }

  /**
   * Generates the URL of the image with the given options.
   *
   * @param {BaseImageURLOptions} options - Optional options for generating the image URL.
   * @return {string} The generated image URL.
   */
  public imageURL(options?: BaseImageURLOptions): string {
    return this.id && this.client.rest.cdn.emoji(this.id, options);
  }

  /**
   * Returns a string representation of the emoji
   *
   * @return {string} The string representation of the emoji
   */
  public toString(): string {
    return this.id ? formatEmoji(this.id, this.animated) : this.name;
  }

  /**
   * Returns the created timestamp as a Date object.
   *
   * @return {number} The created timestamp.
   */
  public createdTimestamp(): number {
    try {
      const milliseconds = BigInt(parseInt(this.id)) >> 22n;
      return new Date(Number(milliseconds) + 1420070400000).valueOf();
    } catch (error) {
      throw new YorClientError('Invalid snowflake');
    }
  }

  /**
   * Returns the creation date of the object.
   *
   * @return {Date} The creation date of the object.
   */
  public createdAt(): Date {
    return new Date(this.createdTimestamp());
  }
}
