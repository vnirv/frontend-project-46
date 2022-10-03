import diffToJSONString from './formatters/json.js'
import diffToPlainText from './formatters/plain.js'
import { isPlainObject } from './utils.js'

const buildDiffList = (tree, compareTree) => {
    const fileDiff = [];

    Object.entries(tree).forEach(([key, value]) => {
        const compareValue = compareTree[key];

        delete compareTree[key];

        if ([value, compareValue].every(isPlainObject)) {
            fileDiff.push({
                // type: 'equal',
                values: [value, compareValue],
                key,
                children: buildDiffList(value, compareValue),
            });

            return;
        }
        fileDiff.push({ values: [value, compareValue], key });
    });
    
    Object.entries(compareTree).forEach(([key, value]) => {
        fileDiff.push({ values: [undefined, value], key })
    });

    return fileDiff;
}


const diff = (tree, compareTree, format) => {
    const fileDiff = buildDiffList(tree, compareTree);

    switch(format) {
        case 'json': return diffToJSONString(fileDiff);
        case 'plain': return diffToPlainText(fileDiff);

        default: return 'no method to transform';
    }
}

export default diff;