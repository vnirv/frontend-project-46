import { program } from 'commander';
import { parceFiles } from './parcer.js';

import diff from './diff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <format>', 'output format' )
  .argument('<tree>', 'inital tree path')
  .argument('<compareTree>', 'compare tree path');
  
program.parse();

const { format = 'json' } = program.opts()
const [path1, path2] = program.args;

const [tree, compareTree] = [path1, path2].map(parceFiles);

const result = diff(tree, compareTree, format);

console.log(result);