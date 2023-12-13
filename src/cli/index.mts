#!/usr/bin/env tsx

import * as prompts from '@clack/prompts';
import colors from 'picocolors';

import { initialize } from './commands/initialize.mjs';

async function main() {
  console.clear();

  prompts.intro(`${colors.bgRed(colors.black(' Yor CLI '))}`);

  const command = await prompts.select({
    message: 'Choose a command',
    options: [{ label: 'Initialize', value: 'init' }],
  });

  switch (command) {
    case 'init':
      await initialize();
      break;
  }

  prompts.outro(`${colors.bgRed(colors.black(' Goodbye! - Yor CLI '))}`);
}

main().catch(console.error);
