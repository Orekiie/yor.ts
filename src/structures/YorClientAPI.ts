import {
  ApplicationCommandsAPI,
  ApplicationsAPI,
  ChannelsAPI,
  GuildsAPI,
  InteractionsAPI,
  UsersAPI,
  WebhooksAPI,
} from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';

export class YorClientAPI {
  public channels: ChannelsAPI;
  public guilds: GuildsAPI;
  public users: UsersAPI;
  public application: ApplicationsAPI;
  public applicationCommands: ApplicationCommandsAPI;
  public webhooks: WebhooksAPI;
  public interactions: InteractionsAPI;

  public rest: REST;

  constructor(rest: REST) {
    this.rest = rest;

    this.channels = new ChannelsAPI(this.rest);
    this.guilds = new GuildsAPI(this.rest);
    this.users = new UsersAPI(this.rest);
    this.application = new ApplicationsAPI(this.rest);
    this.applicationCommands = new ApplicationCommandsAPI(this.rest);
    this.webhooks = new WebhooksAPI(this.rest);
    this.interactions = new InteractionsAPI(this.rest, this.webhooks);
  }
}
