const { readData } = require('./readfile');
const input = readData('day8Input.txt');
const lines = input.split(/\n/);

// question 1
const runBeforeInfiniteLoop = (lines) => {
    let accumulator = 0;
    let executed = {};

    let i = 0; 
    let last = false;
    while (i < lines.length) {
        // console.log(i, executed[i], lines[i], accumulator);
        if (executed[i]) {
            break;
        }
        if (i === lines.length-1) {
            console.log('Last cmd');
            last = true;
        }
        const curLine = lines[i];
        const [op, param] = curLine.split(" ");
        executed[i] = true;
        if(op === "acc") {
            accumulator = eval(`${accumulator}${param}`);
            i++;
        } else if(op === "jmp") {
            i = eval(`${i}${param}`);
        } else {
            i++;
        }
    }

    // console.log(accumulator);
    // 1134
    return last? [accumulator, true]: accumulator;
}
// runBeforeInfiniteLoop(lines);

const findBadLine = (lines) => {
    let executed = {};

    let i = 0; 
    let lastJmp = 0;
    while (i < lines.length) {
        // console.log(i, executed[i], lines[i], accumulator);
        if (executed[i]) {
            break;
        }
        const curLine = lines[i];
        const [op, param] = curLine.split(" ");
        executed[i] = true;
        if(op === "acc") {
            i++;
        } else if(op === "jmp") {
            if(param[0] === '-') {
                // console.log(i, lines[i])
                lastJmp = i;
            }
            i = eval(`${i}${param}`);
        } else {
            i++;
        }
    }
    return lastJmp;
}

const badLine = findBadLine(lines);
console.log('badLine'+badLine);
runBeforeInfiniteLoop(lines.map((x, i) => {
    if (i === badLine) {
        console.log(x)
        return x.replace('jmp', 'nop')
    }
    return x;
}))

let j = 0; 
while (j < lines.length) {
    let res;
    if (lines[j].slice(0,3) === 'jmp') {
        res = runBeforeInfiniteLoop(lines.map((x, i) => {
            if (i === j) {
                return x.replace('jmp', 'nop')
            }
            return x;
        }))
    }
    if (lines[j].slice(0,3) === 'nop') {
        res = runBeforeInfiniteLoop(lines.map((x, i) => {
            if (i === j) {
                return x.replace('nop', 'jmp')
            }
            return x;
        }))
    }
    if(typeof res === 'object') {
        console.log('found');
        console.log(res);
    }
    j++;
}
