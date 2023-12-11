import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';

import { Command } from '../interfaces/Command';

import { AutocompleteCommandContext } from './Contexts/AutocompleteCommandContext';
import { CommandContext } from './Contexts/CommandContext';

export class YorSlashCommand implements Command {
  builder!:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute!: (context: CommandContext) => void | Promise<void>;
  autocomplete!: (context: AutocompleteCommandContext) => void | Promise<void>;
}
