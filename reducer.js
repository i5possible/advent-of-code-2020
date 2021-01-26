const arrayReducer = (acc, cur) => [...acc, ...cur];

const addReducer = (acc, cur) => acc + cur;

module.exports = {
  addReducer,
  arrayReducer,
};
