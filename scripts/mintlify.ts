/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from 'node:fs';

const mintlify = require('./mint.json');

const getFilesAndFolder = (directory: string, files: string[] = []) => {
  let navigation = [] as { group?: string; pages: string[] }[];

  const filesAndFolders = fs.readdirSync(directory, { withFileTypes: true });

  for (const fileOrFolder of filesAndFolders) {
    if (fileOrFolder.isDirectory()) {
      navigation.push({
        group: fileOrFolder.name,
        pages: getFilesAndFolder(`${directory}/${fileOrFolder.name}`).flatMap(
          (group) => group.pages,
        ),
      });
    } else {
      navigation.push({
        pages: [fileOrFolder.name],
      });
    }
  }

  // get items without group and give them default group 'Yor.ts'
  navigation.forEach((item) => {
    if (!item.group) {
      item.group = 'Yor.ts';
    }
  });

  // remove duplicate groups and merge them in single item if same group
  const groups = new Set(navigation.map((item) => item.group));
  navigation = Array.from(groups).map((group) => {
    const pages = navigation
      .filter((item) => item.group === group)
      .flatMap((item) => item.pages);
    return { group, pages };
  });

  // remove pages that don't end with .md extension
  navigation.forEach((item) => {
    item.pages = item.pages
      .filter((page) => page.endsWith('.md'))
      .map((page) => {
        const fileName = page.replace('Yor.ts/', ''); // Remove .md extension
        return `${item.group}/${fileName}`;
      });
  });

  return navigation;
};

const docs = {
  ...mintlify,
  navigation: getFilesAndFolder('docs'),
};

fs.writeFileSync('docs/mint.json', JSON.stringify(docs, null, 2));
