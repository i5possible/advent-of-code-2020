const { readData } = require("./readfile");
const reducer = require("./reducer");
const input = readData("day22Input.txt");
// const input = readData("day22InputSimple.txt");
// const input = readData("day22InputInfinite.txt");
const lines = input.split(/\n\n/);
const _ = require("lodash");

const parsePlayer = (input) => {
  return input
    .split(/\n/)
    .slice(1)
    .map((x) => parseInt(x))
    .reverse();
};

const player1 = parsePlayer(lines[0]);
const player2 = parsePlayer(lines[1]);

const getWinnerScore = (player1, player2) => {
  const score = [player1, player2]
    .filter((x) => x.length !== 0)[0]
    .map((x, i) => x * (i + 1))
    .reduce(reducer.addReducer, 0);
  console.log(score);
  return score;
};

const playGame1 = (player1, player2) => {
  while (player1.length !== 0 && player2.length !== 0) {
    const card1 = player1.pop();
    const card2 = player2.pop();
    if (card1 > card2) {
      player1.unshift(card1);
      player1.unshift(card2);
    } else {
      player2.unshift(card2);
      player2.unshift(card1);
    }
  }
  console.log(player1, player2);
  getWinnerScore(player1, player2);
};

// playGame1(player1, player2);

const playGame2 = (player1, player2, rootLevel) => {
  console.log("##########");
  //   console.log(player1);
  //   console.log(player2);
  const played = [];
  while (player1.length !== 0 && player2.length !== 0) {
    console.log("------------");
    console.log(player1);
    console.log(player2);
    if (
      played.find(
        (game) =>
          _.xor(game[0], player1).length === 0 &&
          _.xor(game[1], player2).length === 0
      )
    ) {
      if (rootLevel) {
        getWinnerScore(player1, player2);
      }
      return true;
    }
    played.push([[...player1], [...player2]]);
    const card1 = player1.pop();
    const card2 = player2.pop();
    let isPlayer1Win;
    if (card1 <= player1.length && card2 <= player2.length) {
      isPlayer1Win = playGame2(
        [...player1.slice(player1.length - card1)],
        [...player2.slice(player2.length - card2)],
        false
      );
    } else {
      isPlayer1Win = card1 > card2;
    }
    if (isPlayer1Win) {
      player1.unshift(card1);
      player1.unshift(card2);
    } else {
      player2.unshift(card2);
      player2.unshift(card1);
    }
  }
  if (rootLevel) {
    getWinnerScore(player1, player2);
  }
  return player1.length !== 0;
};
playGame2(player1, player2, true);
