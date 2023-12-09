/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from 'node:fs';

const mintlify = require('../docs/mint.json');

const getFilesAndFolder = (directory: string, files: string[] = []) => {
  let navigation = [] as { group?: string; pages: string[] }[];

  const filesAndFolders = fs.readdirSync(directory, { withFileTypes: true });

  for (const fileOrFolder of filesAndFolders) {
    if (fileOrFolder.isDirectory()) {
      const group = fileOrFolder.name;
      const pages = getFilesAndFolder(
        `${directory}/${fileOrFolder.name}`,
      ).flatMap((group) => group.pages);
      navigation.push({ group, pages });
    } else if (fileOrFolder.name.endsWith('.md')) {
      const fileName = fileOrFolder.name.replace('.md', '');
      const group = directory.split('/').pop() || 'Yor.ts'; // Get the directory name
      navigation.push({
        group: group === 'docs' ? 'Yor.ts' : group,
        pages: [group === 'docs' ? `${fileName}` : `${group}/${fileName}`],
      });
    }
  }

  // Remove duplicate groups and merge them into a single item if they have the same group
  const groups = new Set(navigation.map((item) => item.group));
  navigation = Array.from(groups).map((group) => {
    const pages = navigation
      .filter((item) => item.group === group)
      .flatMap((item) => item.pages);
    return { group, pages };
  });

  return navigation;
};

const docs = {
  ...mintlify,
  navigation: getFilesAndFolder('docs'),
};

fs.writeFileSync('docs/mint.json', JSON.stringify(docs, null, 2));

// actual docs are generated at temp direcory move them to docs cirectory
// we need to move all the files inside temp/** to docs/**
fs.cpSync('temp', 'docs', { recursive: true });
fs.rmSync('temp', { recursive: true });
