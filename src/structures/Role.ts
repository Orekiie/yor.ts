import { APIRole, GuildsAPI } from '@discordjs/core/http-only';

import { Base } from './Base';
import { YorClient } from './YorClient';

export class Role extends Base {
  private API: GuildsAPI;

  public raw: APIRole;

  /**
   * Constructor function for the APIRole class.
   *
   * @param {YorClient} client - The YorClient instance.
   * @param {APIRole} data - The APIRole data.
   */
  constructor(client: YorClient, data: APIRole) {
    super(client);

    this.API = client.api.guilds;

    this.raw = data;
  }
}
