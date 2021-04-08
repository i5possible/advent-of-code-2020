const { readData } = require("./readfile");
const _ = require("lodash");
// const input = readData('day23Input.txt');
// const array = "389125467".split("").map((x) => parseInt(x));
const array = "284573961".split("").map((x) => parseInt(x));
const debug = false;

const log = (param) => {
  if (debug) {
    console.log(param);
  }
};

const arrayToLinkedList = (array) => {
  if (array.length === 0) {
    return {};
  }
  const head = {
    value: array[0],
  };
  if (array.length === 1) {
    return head;
  }
  let prev = head;
  for (let i = 1; i < array.length; i++) {
    const node = {
      value: array[i],
      prev: prev,
    };
    prev.next = node;
    prev = node;
  }
  prev.next = head;
  head.prev = prev;
  return head;
};

const printNode = (node) => {
  log(node.value);
};

const buildMapForLinkedList = (linkedList) => {
  const map = new Map();
  walk(linkedList, (node) => map.set(node.value, node));
  return map;
};

const printMap = (map) => {
  for (let value of map.values()) {
    printNode(value);
  }
};

const walk = (linkedList, fun) => {
  const head = linkedList;
  let current = linkedList.next;
  fun(head);
  while (current && current !== head) {
    fun(current);
    current = current.next;
  }
};

/**
 * current -> destination
 * destination -> toMoveHead
 * toMoveEnd -> following
 *
 */

const moveIn = (current, toMoveHead, toMoveTail) => {
  toMoveTail.next = current.next;
  current.next = toMoveHead;
  toMoveHead.prev = current;
  toMoveTail.next.prev = toMoveTail;
  return current;
};

const moveOut = (current, following) => {
  current.next = following;
  following.prev = current;
  return current;
};

const move3Nodes = (current, destination) => {
  const toMoveHead = current.next;
  const toMoveTail = toMoveHead.next.next;
  const following = toMoveTail.next;
  moveOut(current, following);
  moveIn(destination, toMoveHead, toMoveTail);
  return current.next;
};

/**
 * smallestFour: 5,4,3,2
 * largestFour: 6,7,8,9
 */
const findDestination = (
  current,
  toMoveValueList,
  map,
  largestFour,
  smallestFour
) => {
  let value = current.value - 1;
  // log(`toMoveValueList: ${toMoveValueList}`);
  while (true) {
    if (toMoveValueList.includes(value)) {
      value -= 1;
      continue;
    }
    if (value < smallestFour[0]) {
      value = largestFour[0];
      continue;
    }
    break;
  }
  return map.get(value);
};

const findToMoveValueList = (current) => {
  return [
    current.next.value,
    current.next.next.value,
    current.next.next.next.value,
  ];
};

const getValuesAfter1 = (map) => {
  const node1 = map.get(1);
  const array = [];
  walk(node1, (x) => array.push(x.value));
  return array.join("").slice(1, array.length);
};

const run = (current, map, largestFour, smallestFour) => {
  const toMoveValueList = findToMoveValueList(current);
  const destination = findDestination(
    current,
    toMoveValueList,
    map,
    largestFour,
    smallestFour
  );
  log(
    `toMoveValueList: ${toMoveValueList}, destinationValue: ${destination.value}`
  );
  const next = move3Nodes(current, destination);
  return next;
};

const run100 = (array) => {
  let sorted = [...array].sort();

  let largestFour = sorted.slice(sorted.length - 4).reverse();
  let smallestFour = sorted.slice(0, 4);

  const linkedList = arrayToLinkedList(array);
  // walk(linkedList, printNode);
  // log("-----");
  const map = buildMapForLinkedList(linkedList);
  // printMap(map);
  // log("-----");

  let i = 0;
  let current = linkedList;
  while (i < 100) {
    current = run(current, map, largestFour, smallestFour);
    walk(current, printNode);
    i++;
    // log("-----");
  }
  let result = getValuesAfter1(map);
  console.log(result);
};

const generateNumberArray = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, i) => i + start);

const run1000000 = (array) => {
  let sorted = [...array].sort();
  let following = generateNumberArray(10, 1000000);

  let largestFour = following.slice(sorted.length - 4).reverse();
  let smallestFour = sorted.slice(0, 4);

  const linkedList = arrayToLinkedList([...array, ...following]);
  // walk(linkedList, printNode);
  // log("-----");
  const map = buildMapForLinkedList(linkedList);
  // printMap(map);
  // log("-----");

  let i = 0;
  let current = linkedList;
  while (i < 10000000) {
    current = run(current, map, largestFour, smallestFour);
    // walk(current, printNode);
    i++;
    // log("-----");
    if (i % 1000000 === 0) {
      console.log(`current: ${i}`);
    }
  }
  current = map.get(1);
  const next = current.next.value;
  const nextNext = current.next.next.value;
  console.log(next, nextNext, next * nextNext);
};

// console.log(array);
// run100(array);
run1000000(array);
