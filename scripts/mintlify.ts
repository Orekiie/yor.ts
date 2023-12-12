/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import fs from 'node:fs';
import path from 'node:path';

const mintlify = require('../docs/mint.json');

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getPath = (file: fs.Dirent, prefix = ''): string | string[] => {
  if (file.isDirectory()) {
    const files = fs.readdirSync(`${prefix}${file.name}`, {
      withFileTypes: true,
    });
    return files
      .map((subFile) => getPath(subFile, `${prefix}${file.name}/`))
      .flat();
  }

  return `${prefix}${file.name}`;
};

const convertMdToMdx = (filePath: string) => {
  const data = fs.readFileSync(filePath, 'utf8');
  let newContent = `---\ntitle: Yor.ts | ${filePath
    .replace('temp/', '')
    .replace('.md', '')}\nicon: "code"\nsidebarTitle: ${filePath
    .split('/')
    .pop()
    ?.replace('.md', '')}\n---\n${data}`;
  const newFilePath = filePath.replace('.md', '.mdx');

  // update links
  newContent = newContent.replaceAll('.md', '');

  fs.writeFileSync(newFilePath, newContent);
  fs.rmSync(filePath);
};

const docs = mintlify;

const files = fs
  .readdirSync('temp', { recursive: true, withFileTypes: true })
  .map((file) => getPath(file, 'temp/'));

for (const file of files) {
  if (Array.isArray(file)) {
    file.forEach(convertMdToMdx);
  } else {
    try {
      convertMdToMdx(file);
    } catch (error) {
      continue;
    }
  }
}

function getAllFiles(dir: string, filesList = {}) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      filesList = getAllFiles(filePath, filesList);
    } else {
      const folderName =
        path.basename(dir) === 'temp' ? 'Yor.ts' : path.basename(dir);
      const fileNameWithoutExtension = path.parse(file).name;
      const group = filesList[folderName as keyof typeof filesList] || {
        group: capitalize(folderName),
        pages: [],
      };

      // @ts-expect-error - it does exist, i'm lazy to type it
      group.pages.push(
        folderName === 'Yor.ts'
          ? `docs/${fileNameWithoutExtension}`
          : `docs/${folderName}/${fileNameWithoutExtension}`,
      );
      filesList[folderName as keyof typeof filesList] = group;
    }
  });

  return filesList;
}

docs.navigation = [
  { group: 'Docs', pages: [...Object.values(getAllFiles('temp')).reverse()] },
  ...docs.navigation,
];

const uniqueGroups = {};
docs.navigation = docs.navigation.filter((item: { group: string }) => {
  if (!uniqueGroups[item.group as keyof typeof uniqueGroups]) {
    // @ts-expect-error - it does exist, i'm lazy to type it
    uniqueGroups[item.group as keyof typeof uniqueGroups] = true;
    return true;
  }
  return false;
});

fs.writeFileSync('docs/mint.json', JSON.stringify(docs, null, 2));

// actual docs are generated at temp direcory move them to docs cirectory
// we need to move all the files inside temp/** to docs/**
fs.cpSync('temp', 'docs/docs', { recursive: true });
fs.rmSync('temp', { recursive: true });
