import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import * as prompts from '@clack/prompts';
import colors from 'picocolors';

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
      tools: () =>
        prompts.multiselect({
          message: 'Select additional tools.',
          initialValues: ['prettier', 'eslint'],
          options: [
            { value: 'prettier', label: 'Prettier', hint: 'recommended' },
            { value: 'eslint', label: 'ESLint', hint: 'recommended' },
          ],
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
      srcDirectory: () =>
        prompts.confirm({
          message: 'Include src directory?',
          initialValue: true,
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

  project.tools.push('yor.ts');

  const packageJsonPath = path.join(cwd, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.devDependencies = packageJson.devDependencies || {};
    project.tools.forEach((tool: string) => {
      packageJson.devDependencies[tool] = '*';
    });
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } else {
    execSync(`${packageManager} init ${packageManager === 'npm' ? '-y' : ''}`, {
      cwd,
      stdio: 'ignore',
    });

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.devDependencies = packageJson.devDependencies || {};
    project.tools.forEach((tool: string) => {
      packageJson.devDependencies[tool] = '*';
    });
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  if (project.srcDirectory) {
    fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
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
