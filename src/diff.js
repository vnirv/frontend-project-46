import JSONToString from '../src/formatter.js'

export const typeToSignMap = {
    missing: '-',
    added: '+',
    equal: ' ',
}

const diffToJSON = (diff) => {
    const finalJSON = {};

    diff.forEach(item => {
        const sign = typeToSignMap[item.type];

        const children = item.children;

        finalJSON[`${sign} ${item.key}`] = children ? diffToJSON(children) : item.value
    })

    return finalJSON;
}

const isPlainObject = (smth) => typeof smth === 'object' && !Array.isArray(smth)

const buildDiffList = (tree, compareTree) => {
    const fileDiff = [];

    Object.entries(tree).forEach(([key, value]) => {
        const compareValue = compareTree[key];

        delete compareTree[key];

        if ([value, compareValue].every(isPlainObject)) {
            fileDiff.push({
                type: 'equal',
                value,
                key,
                children: buildDiffList(value, compareValue),
            });

            return;
        }
    
        if (!compareValue) {
            fileDiff.push({ type: 'missing', value, key })
    
            return;
        }
    
        if (compareValue !== value) {
            fileDiff.push({ type: 'missing', value, key })
            fileDiff.push({ type: 'added', value: compareValue, key })
    
            return;
        }
    
        fileDiff.push({ type: 'equal', value, key })
    });
    
    Object.entries(compareTree).forEach(([key, value]) => {
        fileDiff.push({ type: 'added', value, key })
    });

    return fileDiff;
}


const diff = (tree, compareTree) => {
    const fileDiff = buildDiffList(tree, compareTree);

    const json = diffToJSON(fileDiff);

    return JSONToString(json);
}

export default diff;