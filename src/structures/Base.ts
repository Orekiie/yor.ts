import { YorClient } from './YorClient';

export class Base {
  public client: YorClient;

  /**
   * Initializes a new instance of the constructor.
   *
   * @param {YorClient} client - The client object.
   */
  constructor(client: YorClient) {
    this.client = client;
  }
}
