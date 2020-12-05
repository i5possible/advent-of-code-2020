const { readLines } = require('./readfile');

const input = readLines('day3Input.txt');

const countTreesEncountered = (input, slope) => {
    const length = input[0].length;
    const [right, down] = slope;
    let i = 0;
    let pos = 0;
    let count = 0;
    while (i < input.length) {
        if (input[i][pos] === '#') {
            count++;
        }
        pos = (pos + right) % length;
        i = i + down;
    }
    return count;
}

// question 1
console.log(countTreesEncountered(input, [3, 1]))

// question 2
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

const product = slopes.map(slope => countTreesEncountered(input, slope)).reduce((acc, cur) => acc * cur, 1);
console.log(product);
