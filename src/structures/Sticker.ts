import { APISticker, StickerType } from '@discordjs/core';

import { Base } from './Base';
import { User } from './User';
import { YorClient } from './YorClient';

export class Sticker extends Base {
  public raw: APISticker;
  public id: string;
  public name: string;
  public tags?: string;
  public type?: StickerType;
  public creator?: User;
  public available?: boolean;

  /**
   * Represents a sticker on the Discord platform.
   *
   * @param {YorClient} client - The YorClient instance.
   * @param {APISticker} data - The APISticker object.
   */
  constructor(client: YorClient, data: APISticker) {
    super(client);

    this.raw = data;
    this.id = this.raw.id;
    this.name = this.raw.name;
    this.available = this.raw.available;
    this.tags = this.raw.tags;
    this.type = this.raw.type;
    this.creator = this.raw.user
      ? new User(this.client, this.raw.user)
      : undefined;
  }
}
