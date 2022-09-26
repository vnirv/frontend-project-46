import { program } from 'commander';
import path from 'path';
import fs from 'fs';

import diff from './diff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format' )
  .argument('<tree>', 'inital tree path')
  .argument('<compareTree>', 'compare tree path')
  .action((path1, path2) => {
    const [tree, compareTree] = [path1, path2]
    .map(p => path.resolve(process.cwd(), p))
    .map(p => fs.readFileSync(p).toString())
    .map(content => JSON.parse(content))

    const result = diff(tree, compareTree);

    console.log(result);
  })
  
program.parse();