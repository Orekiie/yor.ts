import {
  APIMessageComponentInteraction,
  ComponentType,
  InteractionsAPI,
} from '@discordjs/core';

import { BaseContext } from './BaseContext';

export class ComponentContext extends BaseContext {
  public readonly raw: APIMessageComponentInteraction;
  public readonly id: string;
  public readonly token: string;

  private API: InteractionsAPI;

  /**
   * Creates a new instance of the constructor.
   *
   * @param {InteractionsAPI} API - The API instance.
   * @param {APIMessageComponentInteraction} data - The data for the constructor.
   */
  constructor(API: InteractionsAPI, data: APIMessageComponentInteraction) {
    super();

    this.API = API;

    this.raw = data;
    this.id = data.id;
    this.token = data.token;
  }

  /**
   * Defer a message update.
   *
   * @return {Promise<void>} A promise that resolves when the message update is deferred.
   */
  public async defer(): Promise<void> {
    await this.API.deferMessageUpdate(this.id, this.token);
  }

  /**
   * Determines if the element is a button.
   *
   * @return {boolean} - Returns `true` if the element is a button, `false` otherwise.
   */
  public isButton(): boolean {
    return this.raw.data.component_type === ComponentType.Button;
  }

  /**
   * Determines if the select menu is of type string.
   *
   * @return {boolean} true if the select menu is of type string, false otherwise
   */
  public isStringSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.StringSelect;
  }

  /**
   * Checks if the component is a channel select menu.
   *
   * @return {boolean} - Returns true if the component is a channel select menu, otherwise false.
   */
  public isChannelSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.ChannelSelect;
  }

  /**
   * Determines if the select menu is mentionable.
   *
   * @return {boolean} True if the select menu is mentionable, false otherwise.
   */
  public isMentionableSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.MentionableSelect;
  }

  /**
   * Determines if the function is a role select menu.
   *
   * @return {boolean} True if the function is a role select menu, false otherwise.
   */
  public isRoleSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.RoleSelect;
  }

  /**
   * Determines whether the component type of the raw data is a UserSelect.
   *
   * @return {boolean} true if the component type is UserSelect, false otherwise
   */
  public isUserSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.UserSelect;
  }
}
