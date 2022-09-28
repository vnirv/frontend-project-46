
import gendiff from '../src/diff.js';


test('remplaced value', () => {
    const file1 = {name: 'meme', age: 0};
    const file2 = {name: 'meme', age: 2};
    const result = gendiff(file1, file2);
    
    expect(result).toMatchSnapshot();
});

test('added value', () => {
    const file1 = {name: 'meme'};
    const file2 = {name: 'meme', age: 1};
    const result = gendiff(file1, file2);
    expect(result).toMatchSnapshot();
});

test('deleted value', () => {
    const file1 = {name: 'meme', age: 0};
    const file2 = {name: 'meme'};
    const result = gendiff(file1, file2);
    expect(result).toMatchSnapshot();
});

test('deep structure', () => {
    const file1 = {name: 'meme', age: 0, state: {good: 'yes'}};
    const file2 = {name: 'meme', state: 'good'};
    const result = gendiff(file1, file2);
    expect(result).toMatchSnapshot();
});