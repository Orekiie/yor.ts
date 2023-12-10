import { APIGuild, GuildsAPI } from '@discordjs/core/http-only';

export class Guild {
  private API: GuildsAPI;

  public raw: APIGuild;

  /**
   * Initializes a new instance of the Constructor class.
   *
   * @param {GuildsAPI} API - The GuildsAPI instance.
   * @param {APIGuild} data - The APIGuild data.
   */
  constructor(API: GuildsAPI, data: APIGuild) {
    this.API = API;

    this.raw = data;
  }
}
