import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from '../interfaces/Command';

import { CommandContext } from './Context';

export class SlashCommand implements Command {
  builder!: SlashCommandBuilder;
  execute!: (context: CommandContext) => void | Promise<void>;
}
