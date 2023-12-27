#!/usr/bin/env node

import * as prompts from '@clack/prompts';
import colors from 'picocolors';

import { initialize } from './commands/initialize.mjs';

const links = [
  {
    title: 'Documentation',
    url: 'https://yor.mintlify.app/',
  },
  {
    title: 'Guide',
    url: 'https://yor.mintlify.app/guide',
  },
  {
    title: 'Blog',
    url: 'https://yor.mintlify.app/blog',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/mintlify/yor',
  },
  {
    title: 'Discord Server',
    url: 'https://discord.gg/HXVMArbsX7',
  },
];

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

  prompts.note(
    `${links
      .map(
        (link) =>
          `${colors.bold(colors.red(link.title))}: ${colors.bold(
            colors.underline(link.url),
          )}`,
      )
      .join('\n')}`,
    colors.red('Links'),
  );

  prompts.outro(`${colors.bgRed(colors.black(' Goodbye! - Yor CLI '))}`);
}

main().catch(console.error);
