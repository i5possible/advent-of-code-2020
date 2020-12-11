const { readData } = require('./readfile');
const input = readData('day11Input.txt');
// const input = readData('day11InputSimple.txt');
// 37
const lines = input.split(/\n/);
// 2261

const print = lines => {
    lines.forEach(x => console.log(x));
    console.log('')
}

const equals = (before, current) => {
    for (let i = 0; i < before.length; i++) {
        for (let j = 0; j < before[i].length; j++) {
            if (before[i][j] !== current[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// print(lines);

// question 1;
const flip = (lines) => {
    let res = [];
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let flippedLine = [];
        for(let j = 0; j < line.length; j++) {
            if (line[j] === '.') {
                flippedLine.push('.')
                continue;
            }
            let occupied = 0;
            for (let k = i - 1; k <= i + 1; k++) {
                if (k < 0 || k >= lines.length) {
                    continue;
                }
                for (let l = j - 1; l <= j + 1 ; l++) {
                    if (j < 0 || j >= line.length) {
                        continue;
                    }
                    if (k === i && l === j) {
                        continue;
                    }
                    if (lines[k][l] === '#') {
                        occupied++;
                    }
                }
            }
            // console.log(i, j, line[j], occupied);
            if ((line[j] === '#' && occupied >= 4) || (line[j] === 'L' && occupied !== 0)) {
                flippedLine.push("L");
            } else {
                flippedLine.push("#")
            }
        }
        res.push(flippedLine.join(""));
    }
    return res;
}
// let changed = true;
// let current = lines;
// let before;
// while(changed) {
//     before = current;
//     current = flip(before);
//     changed = !equals(before, current);
//     // print(current);
// }

const countOccupied = lines => lines.join("").split("").map(x => x === '#' ? 1 : 0).reduce((acc, cur) => acc + cur, 0);

// console.log(countOccupied(current));

// question 2

const flipFirstInEightDirection = (lines) => {
    let res = [];
    let vectors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let flippedLine = [];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '.') {
                flippedLine.push('.')
                continue;
            }
            let occupied = 0;
            for (let k = 0; k < vectors.length; k++) {
                let x = i + vectors[k][0];
                let y = j + vectors[k][1];
                while(x >= 0 && x < lines.length && y >= 0 && y < line.length) {
                    if (lines[x][y] === '#') {
                        occupied++;
                        break;
                    } else if (lines[x][y] === 'L') {
                        break;
                    }
                    x += vectors[k][0];
                    y += vectors[k][1];
                }
            }
            // console.log(i, j, line[j], occupied);
            if ((line[j] === '#' && occupied >= 5) || (line[j] === 'L' && occupied !== 0)) {
                flippedLine.push("L");
            } else {
                flippedLine.push("#")
            }
        }
        res.push(flippedLine.join(""));
    }
    return res;
}

let changed = true;
let current = lines;
let before;
while(changed) {
    before = current;
    current = flipFirstInEightDirection(before);
    changed = !equals(before, current);
    // print(current);
}

console.log(countOccupied(current));