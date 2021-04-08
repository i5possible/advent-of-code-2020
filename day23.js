const { readData } = require("./readfile");
const _ = require("lodash");
// const input = readData('day23Input.txt');
const array = "389125467".split("").map((x) => parseInt(x));
// const array = "284573961".split("").map((x) => parseInt(x));
const debug = false;

const log = (param) => {
  if (debug) {
    console.log(param);
  }
};

// when the target is less than the smallest value, use the largest.
// when the target is the picked value, minus one.
// if wrapped when pick the value, only move the number picked at the last.
const manipulateArray = (array, largestFour, smallestFour, index) => {
  log(index);
  const current = array[index];
  const followingThreeCups = [];
  let i = index + 1;
  let j = 0;
  let picked = 0;
  log(current);
  log(array);
  while (j < 3) {
    if (i === array.length) {
      picked = 3 - j;
      i = 0;
    }
    followingThreeCups.push(...array.splice(i, 1));
    j++;
  }
  log(followingThreeCups);
  let target = current - 1;
  // console.log(`original: ${target}`);
  while (followingThreeCups.includes(target)) {
    target -= 1;
  }
  // console.log(`middle: ${target}`);
  if (target < _.difference(smallestFour, followingThreeCups)[0]) {
    target = _.difference(largestFour, followingThreeCups)[0];
  }
  log(`actual: ${target}`);
  const start = array.indexOf(target) + 1;
  log(start, index);
  array.splice(start, 0, ...followingThreeCups);
  if (start <= index) {
    // const toMove = array.splice(0, 3 - picked);
    // array.splice(array.length, 0, ...toMove);
    return index + 1 + 3 - picked;
  }
  return index + 1;
};

const getTheOrder = (array) => {
  let i = 0;
  let target = -1;
  let result = [];
  while (i !== target) {
    if (target !== -1) {
      result.push(array[i]);
    }
    if (array[i] === 1) {
      target = i;
    }
    i++;
    i = i % array.length;
  }
  console.log(result.join(""));
  return result;
};

const question1 = () => {
  let sorted = [...array].sort();
  // console.log(array);
  // console.log(sorted);

  let largestFour = sorted.slice(sorted.length - 4).reverse();
  let smallestFour = sorted.slice(0, 4);
  // console.log(smallestFour, largestFour);
  let i = 0;
  let j = 0;
  while (j < 100) {
    log(`${j} ----------------`);
    const next = manipulateArray(array, largestFour, smallestFour, i);
    i = next % array.length;
    j++;
  }

  getTheOrder(array);
};

const paddingNumbers = (init, target) => {
  const result = [...init];
  let current = init.length + 1;
  while (current <= target) {
    result.push(current);
    current++;
  }
  return result;
};

const printValueNextToOne = (array) => {
  const index = array.indexOf(1);
  console.log((index + 1) % array.length, (index + 2) % array.length);
};

const question2 = () => {
  const paddedArray = paddingNumbers(array, 1000000);
  const smallestFour = [1, 2, 3, 4];
  const largestFour = [1000000, 999999, 999998, 999997];
  let i = 0;
  let j = 0;
  while (j < 100000) {
    if (j % 10000 === 0) {
      console.log(`processed: ${j}`);
    }
    manipulateArray(paddedArray, largestFour, smallestFour, i);
    i = (i + 1) % array.length;
    j++;
  }
  printValueNextToOne(paddedArray);
};

// question1();
// question2();
