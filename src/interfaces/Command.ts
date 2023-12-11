import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';

import { AutocompleteCommandContext } from '../structures/Contexts/AutocompleteCommandContext';
import { CommandContext } from '../structures/Contexts/CommandContext';

export interface Command {
  builder:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: (context: CommandContext) => Promise<void> | void;
  autocomplete: (context: AutocompleteCommandContext) => Promise<void> | void;
}
