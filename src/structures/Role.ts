import { APIRole, GuildsAPI } from '@discordjs/core/http-only';

export class Role {
  private API: GuildsAPI;

  public raw: APIRole;

  constructor(API: GuildsAPI, data: APIRole) {
    this.API = API;

    this.raw = data;
  }
}
