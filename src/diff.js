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

const JSONToString = (json) => {
    return JSON
    .stringify(json, null, 4)
    .replaceAll('"', '')
    .replaceAll(',', ''); 
}

const buildDiffList = (tree, compareTree) => {
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

    return fileDiff;
}

const diff = (tree, compareTree) => {
    const fileDiff = buildDiffList(tree, compareTree);
    const json = diffToJSON(fileDiff);

    return JSONToString(json);
}

export default diff;