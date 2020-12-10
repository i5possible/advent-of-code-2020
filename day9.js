const { readData } = require('./readfile');
// const input = readData('day9Input-simple.txt');
// let n = 5;
// 127
const input = readData('day9Input.txt');
let n = 25;
const lines = input.split(/\n/).map(x => parseInt(x));

// console.log(lines);

const findInvalid = () => {
    const initMap = (lines, n) => {
        let sumMap = {};
        for (let i = 0; i < n; ++i) {
            for (let j = i + 1; j < n; ++j) {
                let sum = lines[i] + lines[j];
                sumMap[sum] = sumMap[sum] ? sumMap[sum] + 1 : 1;
            }
        }
        return sumMap;
    }
    let sumMap = initMap(lines, n);
    // console.log(sumMap)

    for (let i = n; i < lines.length; i++) {
        // console.log(sumMap, lines[i])
        if (!sumMap[lines[i]] || sumMap[lines[i]] === 0) {
            console.log(lines[i]);
            // question1: 144381670
            break;
        }
        for (let j = i - n + 1; j < i; j++) {
            let toRemoveSum = lines[i - n] + lines[j];
            // console.log('--------------')
            // console.log(toRemoveSum, sumMap[toRemoveSum]);
            sumMap[toRemoveSum]--;
            // console.log(toRemoveSum, sumMap[toRemoveSum]);
            // console.log('--------------')
            let toAddSum = lines[i] + lines[j];
            sumMap[toAddSum] = sumMap[toAddSum] ? sumMap[toAddSum] + 1 : 1;
        }
    }
}

// findInvalid();

let invalid = 144381670;
// let invalid = 127;
let i = 0, j = 1;
let sum = lines[i] + lines[j];
while(j < lines.length && i < j && sum != invalid) {
    // console.log(i, lines[i], j,  lines[j], sum)
    if (sum < invalid) {
        ++j;
        sum = sum + lines[j];
    } else if (sum > invalid) {
        sum = sum - lines[i];
        ++i;
    }
}
// console.log(i, lines[i], j,  lines[j], sum)

const sorted = lines.slice(i, j+1).sort((a, b) => a-b);
// console.log(sorted)
console.log(sorted.shift()+sorted.pop())
// 20532569
