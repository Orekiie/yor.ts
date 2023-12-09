import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from '../interfaces/Command';

import { AutocompleteCommandContext } from './Contexts/AutocompleteCommandContext';
import { CommandContext } from './Contexts/CommandContext';

export class YorSlashCommand implements Command {
  builder!: SlashCommandBuilder;
  execute!: (context: CommandContext) => void | Promise<void>;
  autocomplete!: (context: AutocompleteCommandContext) => void | Promise<void>;
}
