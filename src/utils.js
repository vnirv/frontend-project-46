
export const typeToSignMap = {
    missing: '-',
    added: '+',
    equal: ' ',
}

export const isPlainObject = (smth) => typeof smth === 'object' && !Array.isArray(smth)

export const getType = ([value, compareValue]) => {
    if (!compareValue) return 'missing';
    if (!value) return 'added';
    if (value !== compareValue) return 'changed';
    return 'equal';
}