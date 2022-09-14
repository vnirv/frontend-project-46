import { program } from 'commander';
import path from 'path';
import fs from 'fs';

program
  .name('gendiff')
  .argument('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format' )
  
program.parse();

const [tree, compareTree] = ['./file1.json', './file2.json']
    .map(p => path.resolve(process.cwd(), p))
    .map(p => fs.readFileSync(p).toString())
    .map(content => JSON.parse(content))

const fileDiff = [];

Object.entries(tree).forEach(([key, value]) => {
    const compareValue = compareTree[key];

    delete compareTree[key];

    if (!compareValue) {
        fileDiff.push({ type: 'missing', value, key })

        return;
    }

    if (compareValue !== value) {
        fileDiff.push({ type: 'missing', value, key })
        fileDiff.push({ type: 'added', value: compareValue, key })

        return;
    }

    fileDiff.push({ type: 'equal', value: value, key })
});

Object.entries(compareTree).forEach(([key, value]) => {
    fileDiff.push({ type: 'added', value, key })
});


const typeToSignMap = {
    missing: '-',
    added: '+',
    equal: ' ',
}

const diffToJSON = (diff) => {
    const finalJSON = {};

    diff.forEach(item => {
        const sign = typeToSignMap[item.type];

        finalJSON[`${sign} ${item.key}`] = item.value
    })

    return finalJSON;
}

const json = diffToJSON(fileDiff);


const result = JSON
    .stringify(json, null, 4)
    .replaceAll('"', '')
    .replaceAll(',', '');


console.log(result);

export default