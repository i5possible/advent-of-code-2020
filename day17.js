const { readData } = require('./readfile');
// const input = readData('day17Input.txt');
const input = readData('day17Input-simple.txt');
const lines = input.split(/\n/);

const isActive = (matrix, line, column) => {
    if (!matrix || line < 0 || column < 0 || line >= matrix.length || column >= matrix[0].length) {
        return false;
    }
    return matrix[line][column] === '#';
};

const expandMatrix = (current, upper, lower) => {
    const currentLength = current ? current.length + 2: lower.length + 2;
    const expanded = [];
    for(let i = 0; i < currentLength; i++) {
        let newLine = [];
        for(let j = 0; j < currentLength; j++) {
            let active = isActive(current, i-1, j-1);
            let count = 0;
            for (let k = i - 1; k <= i + 1; k++) {
                for (let l = j - 1; l <= j + 1; l++) {
                    if (k >= 0 && k <= currentLength && l >= 0 && l <= currentLength) {
                        // if (i === 0) {
                        //     console.log(i, j, k, l, isActive(current, k-1, l-1));
                        // }
                        if ((k !== i || l !== j) && isActive(current, k-1, l-1)) {
                            count++;
                        }
                        if (isActive(upper, k-1, l-1)) {
                            count++;
                        }
                        if (isActive(lower, k-1, l-1)) {
                            count++;
                        }
                    }
                }
            }
            // console.log(i, j, active, count);
            if ((active && (count === 2 || count === 3)) || (!active && count === 3)) {
                newLine.push('#');
            } else {
                newLine.push('.')
            }
        }
        expanded.push(newLine.join(''));
    }
    return expanded;
}

const printMatrix = (matrix) => {
    console.log('-----------')
    matrix.forEach(line => console.log(line))
}

const printCubes = (cubes) => {
    cubes.forEach(cube => printMatrix(cube));
}

const expandCubes = (cubes) => {
    let res = [];
    for(let i = 0; i <= cubes.length; i++) {
        const current = cubes[i];
        const upper = (i === cubes.length - 1) ? null: cubes[i+1];
        const lower = (i === 0) ? upper: cubes[i-1];
        res.push(expandMatrix(current, upper, lower));
    }
    return res;
}

// only count half
const countMatrix = (matrix) => {
    let count = 0;
    matrix.forEach(line => line.split('')
        .forEach(x => {
            if(x === '#') {
                count++;
            }
        })
    );
    return count;
}

const countCubes = (cubes) => cubes.map((matrix,i) => i === 0 ? countMatrix(matrix) : countMatrix(matrix) * 2).reduce((acc, cur) => acc + cur);

const question1 = () => {
    let i = 0; 
    let currentCubes = [lines];
    // printCubes(currentCubes);
    while(i < 6) {
        currentCubes = expandCubes(currentCubes);
        // printCubes(currentCubes);
        i++;
    }

    let total = countCubes(currentCubes);
    console.log(total)
}

// question1();
const expandDimensions = (dimensions) => {
    let res = [];
    for (let i = 0; i <= dimensions.length; i++) {
        const current = dimensions[i];
        const upper = (1 === dimensions.length - 1) ? null: dimensions[i+1]; 
        const lower = (1 === 0) ? upper: dimensions[i-1]; 
        res.push(expandCubes(current, upper, lower));
    }
    return res;
}

const expandCubes2 = (cubes, outer, inner) => {
    const currentLength = cubes ? cubes.length + 2: lower.length + 2;
    let res = [];
    for(let i = 0; i <= cubes.length; i++) {
        const current = cubes[i];
        const upper = (i === cubes.length - 1) ? null: cubes[i+1];
        const lower = (i === 0) ? upper: cubes[i-1];
        res.push(expandMatrix(current, upper, lower));
    }
    return res;
}


const countDimensions = (dimensions) => dimensions.map((cubes,i) => i === 0 ? countCubes(cubes) : countCubes(cubes) * 2).reduce((acc, cur) => acc + cur);

const question2 = () => {
    let i = 0; 
    let currentDimensions = [[lines]];
    while(i < 6) {
        currentDimensions = expandDimensions(currentDimensions);
        i++;
    }
    let total = countDimensions(currentDimensions);
    console.log(total);
}

// console.log(question2())

/*
01110
01121
13532
11321
12321
*/

/*
Before any cycles:

z=0
.#.
..#
###


After 1 cycle:

z=-1
#..
..#
.#.

z=0
#.#
.##
.#.

z=1
#..
..#
.#.


After 2 cycles:

z=-2
.....
.....
..#..
.....
.....

z=-1
..#..
.#..#
....#
.#...
.....

z=0
##...
##...
#....
....#
.###.

z=1
..#..
.#..#
....#
.#...
.....

z=2
.....
.....
..#..
.....
.....


After 3 cycles:

z=-2
.......
.......
..##...
..###..
.......
.......
.......

z=-1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=0
...#...
.......
#......
.......
.....##
.##.#..
...#...

z=1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=2
.......
.......
..##...
..###..
.......
.......
.......
*/