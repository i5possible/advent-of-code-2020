const { readData } = require("./readfile");
const input = readData("day20Input.txt");
const tileBlocks = input.split(/\n\n/);
const _ = require("lodash");

const parseTile = (tileBlock) => {
  const reg = new RegExp(/Tile (\d{4}):/);
  const lines = tileBlock.split(/\n/);
  const matches = lines[0].match(reg);
  const id = parseInt(matches[1]);
  const body = lines.slice(1);
  return {
    id,
    body,
  };
};

/*
top, right, bottom, left
*/
const parseEdges = (tile) => {
  const length = tile.length;
  const top = tile[0].split("");
  const bottom = tile[length - 1].split("");
  let left = [];
  let right = [];

  for (i = 0; i < length; i++) {
    right.push(tile[i][length - 1]);
    left.push(tile[i][0]);
  }

  const edges = [
    top,
    right,
    bottom,
    left,
    getReversedStringArray(top),
    getReversedStringArray(right),
    getReversedStringArray(bottom),
    getReversedStringArray(left),
  ];
  // console.log(edges);
  const edgesValues = edges.map((edge) => countEdgeValue(edge));
  return edgesValues;
};

const getReversedStringArray = (array) => array.join("").split("").reverse();

const countEdgeValue = (edge) =>
  edge
    .map((i, index) => (i === "#" ? 1 << index : 0))
    .reduce((acc, cur) => acc + cur, 0);

const tiles = tileBlocks.map((tileBlock) => parseTile(tileBlock));

// tiles.forEach((tile) => console.log(tile.id, tile.tile));

const tileWithValues = tiles.map((tile) => ({
  id: tile.id,
  values: parseEdges(tile.body),
}));

// console.log(JSON.stringify(tileWithValues));

const findCornerTilesProduct = (tileWithValues) => {
  const allValues = tileWithValues
    .map((t) => t.values)
    .reduce((acc, cur) => [...acc, ...cur], []);
  const valueMap = _.groupBy(allValues, (x) => x);
  console.log(valueMap);
  const cornerTileIds = tileWithValues
    .filter((tile) => {
      const count = tile.values.filter((value) => valueMap[value].length === 1)
        .length;
      // console.log(tile.id, count);
      return count === 4;
    })
    .map((t) => t.id);
  // console.log(cornerTileIds);
  console.log(cornerTileIds.reduce((acc, cur) => acc * cur, 1));
  return cornerTileIds;
};

findCornerTilesProduct(tileWithValues);
