const { readData } = require('./readfile');
const input = readData('day15Input.txt');
// const input = readData('day15Input-simple.txt');
const lines = input.split(/,/).map(x => parseInt(x));

// console.log(lines);



let q1 = 2020;
// 706
let q2 = 30000000;
const solveUseLastIndexOf = (q) => {
    let count = lines.length;
    let last = lines[lines.length-1];
    while(count < q) {
        const preIndex = lines.lastIndexOf(last, -2);
        let cur = 0;
        if (preIndex >= 0) {
            cur = count - preIndex - 1;
        }
        last = cur;
        lines.push(cur);
        // console.log(cur, map, preIndex);
        count++;
    }
    console.log(last)
}

/*
For example, suppose the starting numbers are 0,3,6:
Turn 1: The 1st number spoken is a starting number, 0.
Turn 2: The 2nd number spoken is a starting number, 3.
Turn 3: The 3rd number spoken is a starting number, 6.
Turn 4: Now, consider the last number spoken, 6. Since that was the first time the number had been spoken, the 4th number spoken is 0.
Turn 5: Next, again consider the last number spoken, 0. Since it had been spoken before, the next number to speak is the difference between the turn number when it was last spoken (the previous turn, 4) and the turn number of the time it was most recently spoken before then (turn 1). Thus, the 5th number spoken is 4 - 1, 3.
Turn 6: The last number spoken, 3 had also been spoken before, most recently on turns 5 and 2. So, the 6th number spoken is 5 - 2, 3.
Turn 7: Since 3 was just spoken twice in a row, and the last two turns are 1 turn apart, the 7th number spoken is 1.
Turn 8: Since 1 is new, the 8th number spoken is 0.
Turn 9: 0 was last spoken on turns 8 and 4, so the 9th number spoken is the difference between them, 4.
Turn 10: 4 is new, so the 10th number spoken is 0.

0,3,6,0,3,3,1,0,4,0
0 { '0': [ 1, 4 ], '3': [ 2 ], '6': [ 3 ] } 0
3 { '0': [ 1, 4 ], '3': [ 2, 5 ], '6': [ 3 ] } 1
3 { '0': [ 1, 4 ], '3': [ 5, 3 ], '6': [ 3 ] } 2
2 { '0': [ 1, 4 ], '2': [ 7 ], '3': [ 5, 3 ], '6': [ 3 ] } 5
0 { '0': [ 4, 0 ], '2': [ 7 ], '3': [ 5, 3 ], '6': [ 3 ] } 0
4 { '0': [ 4, 0 ], '2': [ 7 ], '3': [ 5, 3 ], '4': [ 9 ], '6': [ 3 ] } 4
0 { '0': [ 0, 0 ], '2': [ 7 ], '3': [ 5, 3 ], '4': [ 9 ], '6': [ 3 ] } 0
0

count = 3
last = 6
map[last] = [2]
cur = 0;
map[cur] = [1,4] map[cur].push(count+1)

count = 4
last = 0
map[last] = [1,4]
cur = 3
map[cur] = [2,5] map[cur].push(count+1)
*/
const solveUseMap = (q) => {
    let map = {};
    let count = 0;
    let last;
    let startTime = Date.now()
    while(count < q) {
        if (count < lines.length) {
            last = lines[count]
            map[last] = [++count];
            continue;
        }
        let cur = 0;
        let preIndex = 0;
        let existing = map[last];

        if (existing.length === 2) {
            preIndex = 0existing[0];
            cur = Math.abs(existing[1] - existing[0]);
        } 
        
        if (map[cur] === undefined){ 
            map[cur] = [count+1];
        } else if(map[cur].length === 2) {
            map[cur].shift();
            map[cur].push(count+1)
        } else {
            map[cur].push(count+1);
        }
        last = cur;
        // console.log(cur, map, preIndex);
        `adfadf
        adsfasdf
        `
        count++;
        if (count % 100000 === 0) {
            console.log(`count: ${count}, timeUsed: ${(Date.now() - startTime)/1000}`);
        }
    }
    console.log(last)
}

solveUseMap(q2)
