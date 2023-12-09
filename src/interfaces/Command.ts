import { SlashCommandBuilder } from '@discordjs/builders';

import { AutocompleteCommandContext } from '../structures/Contexts/AutocompleteCommandContext';
import { CommandContext } from '../structures/Contexts/CommandContext';

export interface Command {
  builder: SlashCommandBuilder;
  execute: (context: CommandContext) => Promise<void> | void;
  autocomplete: (context: AutocompleteCommandContext) => Promise<void> | void;
}
