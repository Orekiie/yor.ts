import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandContext } from '../structures/Context';

export interface Command {
  builder: SlashCommandBuilder;
  execute: (context: CommandContext) => Promise<void> | void;
}
