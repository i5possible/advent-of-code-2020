const { readData } = require('./readfile');

const input = readData('day5Input.txt');
const lines = input.split(/\n/);

// const line = "FFFBBBFRRR";

const findSeat = line => {
    let rowRange = [0, 128];
    let columnRange = [0, 8];
    for(let i = 0; i < line.length; i++) {
        if (line[i] === 'F') {
            rowRange[1] -= (rowRange[1] - rowRange[0])/2;
        } else if(line[i] === 'B') {
            rowRange[0] += (rowRange[1] - rowRange[0])/2;
        } else if(line[i] === 'L') {
            columnRange[1] -= (columnRange[1] - columnRange[0])/2;
        } else if(line[i] === 'R') {
            columnRange[0] += (columnRange[1] - columnRange[0])/2;
        }
    }
    return [rowRange[0], columnRange[0], rowRange[0]*8 + columnRange[0]]
}

// console.log(findSeat(line));

// question 1
const findLargest = () => {
    return lines.map(findSeat).map(a => a[2]).sort((a,b) => b - a)[0]
}
// console.log(findLargest())
// question 2
const findMissing = () => {
    const sorted = lines.map(findSeat).map(a => a[2]).sort((a, b) => a - b);
    return sorted.find((x, i) => (x - i) != sorted[0]) - 1;
}
console.log(findMissing());
