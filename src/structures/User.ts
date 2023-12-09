import { APIChannel, APIUser, UsersAPI } from '@discordjs/core';

export class User {
  private API: UsersAPI;

  public raw: APIUser;

  /**
   * Constructor function.
   *
   * @param {UsersAPI} API - The UsersAPI instance.
   * @param {APIUser} data - The data for the APIUser.
   */
  constructor(API: UsersAPI, data: APIUser) {
    this.API = API;

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
}
