import { ContextMenuCommandBuilder } from '@discordjs/builders';

import {
  MessageContextMenuCommand,
  UserContextMenuCommand,
} from '../interfaces/Command';

import { MessageContextMenuCommandInteraction } from './Contexts/ContextMenu/MessageContextMenuCommandInteraction';
import { UserContextMenuCommandInteraction } from './Contexts/ContextMenu/UserContextMenuCommandInteraction';

export class YorMessageContextMenuCommand implements MessageContextMenuCommand {
  builder!: ContextMenuCommandBuilder;
  execute!: (
    context: MessageContextMenuCommandInteraction,
  ) => void | Promise<void>;
}

export class YorUserContextMenuCommand implements UserContextMenuCommand {
  builder!: ContextMenuCommandBuilder;
  execute!: (
    context: UserContextMenuCommandInteraction,
  ) => void | Promise<void>;
}
