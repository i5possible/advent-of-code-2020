const { difference } = require('lodash');
const { readData } = require('./readfile');
const input = readData('day10Input.txt');
// const input = readData('day10Input-simple1.txt');
// question 1: 35
// const input = readData('day10Input-simple2.txt');
// question 1: 220
const lines = input.split(/\n/);

const adapters = lines.map(x => parseInt(x)).sort((a, b) => a-b);

adapters.push(adapters[adapters.length-1]+3);
// console.log(adapters)

// question 1
const differences = adapters.map((cur, idx, array) => {
    if (array.includes(cur-1) || cur === 1) {
        return 1;
    } if (!array.includes(cur-1) && !array.includes(cur-2)) {
        return 3;
    }
})

// console.log(differences);
console.log(differences.filter(x => x === 1).length * differences.filter(x => x === 3).length)
