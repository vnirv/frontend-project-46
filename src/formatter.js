
const JSONToString = (json) => {
    return JSON
    .stringify(json, null, 4)
    .replaceAll('"', '')
    .replaceAll(',', ''); 
}

export default JSONToString;