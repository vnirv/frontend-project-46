import { getType, typeToSignMap } from "../utils.js";

const diffToJSON = (diff) => {
    const finalJSON = {};

    diff.forEach(item => {
        const type = getType(item.values);
        const [value, nextValue] = item.values;
        const sign = typeToSignMap[type];
        const children = item.children;

        if (children) {
            finalJSON[`  ${item.key}`] = diffToJSON(children);

            return;
        }
        
        
        if (type === 'changed') {
            finalJSON[`- ${item.key}`] = value;
            finalJSON[`+ ${item.key}`] = nextValue;
            
            return;
        }

        finalJSON[`${sign} ${item.key}`] = value
    })

    return finalJSON;
}

const diffToString = (diff) => {
    const json = diffToJSON(diff);

    return JSON
    .stringify(json, null, 4)
    .replaceAll('"', '')
    .replaceAll(',', ''); 
}

export default diffToString;