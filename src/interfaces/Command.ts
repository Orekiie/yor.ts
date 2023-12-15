import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';

import { AutocompleteCommandContext } from '../structures/Contexts/AutocompleteCommandContext';
import { CommandContext } from '../structures/Contexts/CommandContext';
import { MessageContextMenuCommandInteraction } from '../structures/Contexts/ContextMenu/MessageContextMenuCommandInteraction';
import { UserContextMenuCommandInteraction } from '../structures/Contexts/ContextMenu/UserContextMenuCommandInteraction';

export interface Command {
  builder:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: (context: CommandContext) => Promise<void> | void;
  autocomplete: (context: AutocompleteCommandContext) => Promise<void> | void;
}

export interface ContextMenuCommand {
  builder: ContextMenuCommandBuilder;
}

export interface MessageContextMenuCommand extends ContextMenuCommand {
  execute: (
    context: MessageContextMenuCommandInteraction,
  ) => Promise<void> | void;
}

export interface UserContextMenuCommand extends ContextMenuCommand {
  execute: (context: UserContextMenuCommandInteraction) => Promise<void> | void;
}
