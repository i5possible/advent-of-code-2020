const { readData } = require("./readfile");
const input = readData("day24Input.txt");
const lines = input.split(/\n/);

const reg = /[n|s]?[e|w]/g;

const directions = lines[0].match(reg);

const evaluateDirection = (direction) => {
  let value;
  switch (direction) {
    case "ne":
      value = [0.5, 1];
      break;
    case "nw":
      value = [-0.5, 1];
      break;
    case "se":
      value = [0.5, -1];
      break;
    case "sw":
      value = [-0.5, -1];
      break;
    case "e":
      value = [1, 0];
      break;
    case "w":
      value = [-1, 0];
      break;
    default:
      value = [0, 0];
      break;
  }
  return value;
};

const addVector = (value1, value2) => {
  const [x1, y1] = value1;
  const [x2, y2] = value2;
  return [x1 + x2, y1 + y2];
};

const pointToString = (point) => {
  const [x, y] = point;
  return `${x},${y}`;
};
const evaluateSteps = (directions, map) => {
  // console.log(directions);
  let current = [0, 0];
  for (let index = 0; index < directions.length; index++) {
    const vector = directions[index];
    current = addVector(current, evaluateDirection(vector));
    console.log(vector, current);
  }
  map.set(pointToString(current), !map.get(pointToString(current)));
  // console.log(map);
  // console.log(current, map.get(pointToString(current)));
  return map;
};

const evaluateLines = (lines) => {
  const map = new Map();
  lines
    .map((line) => line.match(reg))
    .map((directions) => evaluateSteps(directions, map));
  console.log(map);
  let count = 0;
  map.forEach((value) => {
    console.log(value);
    if (value) {
      count++;
    }
  });
  console.log(count);
};

evaluateLines(lines);

// evaluateSteps(lines[5].match(reg), new Map());
// console.log("----------");
// evaluateSteps(lines[7].match(reg), new Map());
