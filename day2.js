const fs = require('fs');
const readInput = fileName => {
    try {
        const data = fs.readFileSync(fileName, 'UTF-8');
        const lines = data.split(/\r?\n/);
        return lines;
    } catch (err) {
        console.error(err);
    }
}

const input = readInput('day2Input.txt');

const result = input.map(line => {
    const regex = new RegExp(/(\d+)-(\d+) (\w): (\w+)/g);
    const match = regex.exec(line);
    const [, min, max, char, pwd] = match;
    // question 1
    // const count = pwd.split("").map(c => c === char).filter(Boolean).length
    // console.log(line, count)
    // return count >= min && count <= max;
    // question 2
    return Boolean(pwd[min - 1] === char ^ pwd[max - 1] === char)
}).filter(Boolean);

console.log(result.length);
