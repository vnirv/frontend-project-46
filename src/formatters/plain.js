import { getType, typeToSignMap } from "../utils.js";


const genMessage = (key, values, type) => {
    const [value, compareValue] = values;   
    switch(type) {
        case 'added':
            return `Property '${key}' was added with value: '${compareValue}'`;
        case 'changed':
            return `Property '${key}' was updated. From '${value}' to '${compareValue}'`;
        default:
            return `Property '${key}' was removed`;
    }
}

const flattenDiff = (diff, prefix = '') => {
    const result = [];
    for (const item of diff) {
        const type = getType(item.values);
        if (item.children) {
            result.push(flattenDiff(item.children, `${prefix}${item.key}.`))

            continue;
        }

        if (type === 'equal') continue;

        result.push(genMessage(`${prefix}${item.key}`, item.values, type))
    }

    // result.forEach(console.log)

    // return result

    return result.join('\n');
}

export default flattenDiff;


// Property 'common.follow' was added with value: false
// Property 'common.setting2' was removed
// Property 'common.setting3' was updated. From true to null
// Property 'common.setting4' was added with value: 'blah blah'
// Property 'common.setting5' was added with value: [complex value]