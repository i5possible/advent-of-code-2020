const { readData } = require('./readfile');
const input = readData('day10Input.txt');
// const input = readData('day10Input-simple1.txt');
// question 1: 35
// const input = readData('day10Input-simple2.txt');
// question 1: 220
const lines = input.split(/\n/);

const adapters = lines.map(x => parseInt(x)).sort((a, b) => a-b);

adapters.push(adapters[adapters.length-1]+3);
adapters.unshift(0);
// console.log(adapters)

// question 1
const getDifferencesProduct = (adapters) => {
    const differences = adapters.map((cur, idx, array) => {
        if (array.includes(cur-1) || cur === 1) {
            return 1;
        } if (!array.includes(cur-1) && !array.includes(cur-2)) {
            return 3;
        }
    })
    // console.log(differences);
    const product = differences.filter(x => x === 1).length * differences.filter(x => x === 3).length;
    console.log(product)
    return product;
}

// getDifferencesProduct(adapters);

// question 2
// use while to implement this;
const calPossibilities = n => {
    if (n === 2) {
        return 1;
    } else if (n === 3) {
        return 2;
    } else if (n === 4) {
        return 4;
    } else if (n < 2) {
        console.log('invalid input');
        return 0;
    }
    let res = calPossibilities(n-1) + calPossibilities(n-2) + calPossibilities(n-3);
    return res;
}

const countConstructiveAdaptor = adapters => {
    let adaptorInARowList = [];
    let i = 1;
    let currentCount = 1;
    for( i = 1; i < adapters.length; i++) {
        if (adapters[i] === adapters[i-1]+1) {
            currentCount++;
        } else {
            if (currentCount > 2) {
                adaptorInARowList.push(currentCount);
            }
            currentCount = 1;
        }
    } 
    return adaptorInARowList;
}

const adaptorGroups = countConstructiveAdaptor(adapters);
console.log(adaptorGroups);

let map = {
    3: 2,
    4: 4,
    5: 7,
}

const res = adaptorGroups.reduce((acc, cur) => {
    return acc *= map[cur];
},1);

console.log(res);