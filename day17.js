const { readData } = require('./readfile');
const input = readData('day17Input.txt');
// const input = readData('day17Input-simple.txt');
const lines = input.split(/\n/);

const isActive = (matrix, line, column) => {
    if (!matrix || line < 0 || column < 0 || line >= matrix.length || column >= matrix[0].length) {
        return false;
    }
    return matrix[line][column] === '#';
};

const expandMatrix = (current, upper, lower) => {
    const matrixLength = current ? current.length + 2: lower.length + 2;
    const expanded = [];
    for(let i = 0; i < matrixLength; i++) {
        let newLine = [];
        for(let j = 0; j < matrixLength; j++) {
            let active = isActive(current, i-1, j-1);
            let count = 0;
            for (let k = i - 1; k <= i + 1; k++) {
                for (let l = j - 1; l <= j + 1; l++) {
                    if (k >= 0 && k <= matrixLength && l >= 0 && l <= matrixLength) {
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
    matrix.forEach(line => console.log(line))
}

const printCubes = (cubes) => {
    console.log('-----------')
    cubes.forEach((cube, index) => {
        console.log(`cube: ${index}`);
        printMatrix(cube);
    })
}

const printDimensions = (dimensions) => {
    dimensions.forEach((dimension, index) => {
        console.log(`dimension: ${index}`);
        printCubes(dimension);
    console.log('')
    })
}

const expandCubes = (cubes) => {
    let res = [];
    for(let i = 0; i <= cubes.length; i++) {
        const current = cubes[i];
        const upper = cubes[i+1];
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

question1();


/* question2:
1. dimension: -i 0 i;
2. cube: -i 0 i;
3. matrix: (n-1) + 2

*/
const expandDimensions = (dimensions) => {
    let res = [];
    for (let i = 0; i <= dimensions.length; i++) {
        const current = dimensions[i];
        const upper = dimensions[i+1]; 
        const lower = (i === 0) ? upper: dimensions[i-1]; 
        res.push(expandCubes2(current, upper, lower));
    }
    return res;
}

const isActiveInCub = (current, layer, line, column) => {
    layer = Math.abs(layer);
    if (!current || layer >= current.length || line < 0 || column < 0 || line >= current[0].length || column >= current[0][0].length) {
        return false;
    }
    return current[layer][line][column] === '#';
};

const expandCubes2 = (current, upper, lower) => {
    const cubesLength = current ? current.length + 1: lower.length + 1;
    const matrixLength = current ? current[0].length + 2: lower[0].length + 2;
    const expanded = [];
    for(let c = 0; c < cubesLength; c++) {
        let newCube = [];
        for(let i = 0; i < matrixLength; i++) {
            let newLine = [];
            for(let j = 0; j < matrixLength; j++) {
                let active = isActiveInCub(current, c, i-1, j-1);
                let count = 0;
                for (let cc = c - 1; cc <= c + 1; cc++) {
                    for (let k = i - 1; k <= i + 1; k++) {
                        for (let l = j - 1; l <= j + 1; l++) {
                            if (cc <= cubesLength && k >= 0 && k <= matrixLength && l >= 0 && l <= matrixLength) {
                                // if (i === 0) {
                                //     console.log(i, j, k, l, isActive(current, k-1, l-1));
                                // }
                                if ((c !== cc || k !== i || l !== j) && isActiveInCub(current, cc, k-1, l-1)) {
                                    count++;
                                }
                                if (isActiveInCub(upper, cc, k-1, l-1)) {
                                    count++;
                                }
                                if (isActiveInCub(lower, cc, k-1, l-1)) {
                                    count++;
                                }
                            }
                        }
                    }
                }
                // console.log(c, i, j, active, count);
                if ((active && (count === 2 || count === 3)) || (!active && count === 3)) {
                    newLine.push('#');
                } else {
                    newLine.push('.')
                }
            }
            newCube.push(newLine.join(''));
        }
        expanded.push(newCube);
    }
    return expanded;
}


const countDimensions = (dimensions) => dimensions.map((cubes,i) => i === 0 ? countCubes(cubes) : countCubes(cubes) * 2).reduce((acc, cur) => acc + cur);

const question2 = () => {
    let i = 0; 
    let currentDimensions = [[lines]];
    while(i < 6) {
        currentDimensions = expandDimensions(currentDimensions);
        // printDimensions(currentDimensions);
        i++;
    }
    let total = countDimensions(currentDimensions);
    console.log(total);
}

question2()

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