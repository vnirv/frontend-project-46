import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

export const parceFiles = (filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath).toString();

    if (fullPath.endsWith('.json')) {
        return JSON.parse(content);
    }

    if (fullPath.endsWith('.yml') || fullPath.endsWith('.yaml')) {
        return yaml.load(content)
    }

    return {};
}