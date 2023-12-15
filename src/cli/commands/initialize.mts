import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import * as prompts from '@clack/prompts';
import colors from 'picocolors';

const templates = {
  workers: {
    javascript: 'https://github.com/cloudflare/worker-template',
    typescript: 'https://github.com/cloudflare/worker-typescript-template',
  },
};

export async function initialize() {
  const project = await prompts.group(
    {
      packageManager: () =>
        prompts.select({
          message: 'Choose a package manager',
          initialValue: 'npm',
          options: [
            { label: 'npm', value: 'npm' },
            { label: 'pnpm', value: 'pnpm' },
            { label: 'yarn', value: 'yarn' },
            { label: 'bun', value: 'bun' },
          ],
        }),
      path: () =>
        prompts.text({
          message: 'Where should we create your project?',
          placeholder: './sparkling-solid',
          defaultValue: process.cwd(),
          validate: (value) => {
            if (!value) return 'Please enter a path.';
            if (value[0] !== '.') return 'Please enter a relative path.';
          },
        }),
      name: () =>
        prompts.text({
          message: 'What is the name of your project?',
          placeholder: 'sparkling-solid',
          validate: (value) => {
            if (!value) return 'Please enter a name.';
          },
        }),
      language: () =>
        prompts.select({
          message: 'Choose a language',
          initialValue: 'javascript',
          options: [
            { label: 'JavaScript', value: 'javascript' },
            { label: 'TypeScript', value: 'typescript' },
          ],
        }),
      provider: () =>
        prompts.select({
          message: 'Choose a provider',
          initialValue: 'workers',
          options: [{ label: 'Cloudflare Workers', value: 'workers' }],
        }),
      install: () =>
        prompts.confirm({
          message: 'Install dependencies?',
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        prompts.cancel('Operation cancelled.');
        process.exit(0);
      },
    },
  );

  const loader = prompts.spinner();
  loader.start(colors.blue('Creating project...'));

  const cwd = path.resolve(project.path);
  if (!fs.existsSync(cwd)) {
    fs.mkdirSync(cwd, { recursive: true });
  }

  const packageManager = project.packageManager;
  loader.message(colors.yellow(`Using ${packageManager}...`));

  // based on language and provider git clone template
  const template =
    templates[project.provider as 'workers'][
      project.language as 'javascript' | 'typescript'
    ];
  execSync(`git clone ${template} ${cwd}`, {
    stdio: 'ignore',
  });

  const packageJsonPath = path.join(cwd, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.dependencies['yor.ts'] = '*';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } else {
    execSync(`${packageManager} init ${packageManager === 'npm' ? '-y' : ''}`, {
      cwd,
      stdio: 'ignore',
    });

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.dependencies['yor.ts'] = '*';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  if (project.install) {
    execSync(
      `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'}`,
      {
        cwd,
        stdio: 'inherit',
      },
    );
  }

  loader.stop();
}
