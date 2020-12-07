const { readData } = require('./readfile');
const input = readData('day6Input.txt');
const groups = input.split(/\s\n/); 

const sum = (acc, cur) => acc + cur;

// question 1
// const countPresent = group => [...new Set(group.replace(/\n/g, ''))].length;
// const total = groups.map(countPresent).reduce((acc, cur) => acc + cur, 0);
// console.log(total);

// question 2
const all = 'abcdefghijklmnopqrstuvwxyz';
const countAllPresent = group => {
    const lines = group.split(/\n/g);
    let count = 0;
    for(let i = 0; i < all.length; i++) {
        let allPresent = true;
        for(let j = 0; j < lines.length; j++) {
            if (!lines[j].includes(all[i])) {
                allPresent = false;
                break;
            }
        }
        if (allPresent) {
            count++;
        }
    }
    lines.forEach(line => {
        const sorted = line.split("").sort().join("")
        // console.log(sorted);
    })
    // console.log(count);
    return count;
}
const total = groups.map(countAllPresent).reduce(sum, 0);
// const total = countAllPresent(groups[0]);
console.log(total);


