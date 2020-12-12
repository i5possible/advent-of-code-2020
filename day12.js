const { readData } = require('./readfile');
const input = readData('day12Input.txt');
// const input = readData('day12Input-simple1.txt');
// 25, 256
const lines = input.split(/\n/);

const vectors = {
    E: [1,0],
    N: [0,1],
    W: [-1,0],
    S: [0,-1],
}

const degrees = {
    L: 1,
    R: -1,
}
const direction = ['E', 'N', 'W', 'S'];
const degreeToDirection = degree => direction[degree/90];

// direction.forEach(d => console.log(vectors[d]))
// [0,90,180,270].forEach(d => console.log(degreeToDirection(d)))

const findThePosition = lines => {
    let degree = 0;
    let pos = [0, 0];
    for(let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        let op = line[0];
        let value = parseInt(line.slice(1));
        let vector;
        switch (op) {
            case 'E':
            case 'N':
            case 'W':
            case 'S':
                vector = vectors[op];
                pos = [pos[0] + vector[0] * value, pos[1] + vector[1] * value];
                break;
            case 'L':
            case 'R':
                let opDegree = degrees[op];
                degree = (degree + opDegree * value + 360) % 360;
                break;
            case 'F':
                vector = vectors[degreeToDirection(degree)];
                pos = [pos[0] + vector[0] * value, pos[1] + vector[1] * value];
                break;
            default:
                break;
        }
        // console.log(pos, degree)
    }
    return pos;
}

const manhattanDistance = pos => Math.abs(pos[0]) + Math.abs(pos[1]);
// question1: 1221
// console.log(manhattanDistance(findThePosition(lines)));



// question2: 

const rotateWayPointVector = [
    [[1,0], [0,1]],
    [[0,-1], [1,0]],
    [[-1,0], [0,-1]],
    [[0,1], [-1,0]],
];

const getRotatedWayPoint = (wayPoint, vector) => [
    wayPoint[0] * vector[0][0] + wayPoint[1] * vector[0][1],
    wayPoint[0] * vector[1][0] + wayPoint[1] * vector[1][1],
]


const calculateWayPoint = (wayPoint, op, value) => {
    let vector;
    switch (op) {
        case 'E':
        case 'N':
        case 'W':
        case 'S':
            vector = vectors[op];
            wayPoint = [wayPoint[0] + vector[0] * value, wayPoint[1] + vector[1] * value];
            break;
        case 'L':
        case 'R':
            let opDegree = (degrees[op] * value + 360) % 360;
            vector = rotateWayPointVector[opDegree/90];
            wayPoint = getRotatedWayPoint(wayPoint, vector);
            break;
        default:
            break;
    }
    return wayPoint;
}
const findThePosition2 = lines => {
    let wayPoint = [10, 1];
    let pos = [0, 0];
    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i];
        let op = line[0];
        let value = parseInt(line.slice(1));
        switch (op) {
            case 'F':
                pos = [pos[0] + wayPoint[0] * value, pos[1] + wayPoint[1] * value];
                break;
            default:
                wayPoint = calculateWayPoint(wayPoint, op, value);
                break;
        }
        // console.log(wayPoint, pos);
    }
    return pos;
}

const finalPos = findThePosition2(lines);
// 59435
console.log(manhattanDistance(finalPos))