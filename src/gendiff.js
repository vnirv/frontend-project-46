import { program } from 'commander';

program
  .name('gendiff')
  .argument('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format' )
  
program.parse();