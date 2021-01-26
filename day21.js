const { readData } = require("./readfile");
const input = readData("day21Input.txt");
// const input = readData("day21InputSimple.txt");
const lines = input.split(/\n/);
const _ = require("lodash");
const { intersection } = require("lodash");

const parseIngredientAndAllergens = (line) => {
  const parts = line.split(/ \(contains /);
  const ingredients = parts[0].split(" ");
  const allergens = parts[1].slice(0, parts[1].length - 1).split(", ");
  return [ingredients, allergens];
};

const knownAllergenToIngredientMap = {};
const parsed = lines
  .map((line) => parseIngredientAndAllergens(line))
  .sort((line1, line2) => line1[1].length - line2[1].length);

// console.log(parsed);

/**
 * find ingredient intersections for all allergen
 * determine the ingredient contains allergen if it's the only ingredient
 */
const allergens = [
  ...new Set(
    parsed.map((line) => line[1]).reduce((acc, cur) => [...acc, ...cur])
  ),
];

// console.log(allergens);

allergens.forEach((allergen) => {
  const ingredients = parsed
    .filter((line) => line[1].includes(allergen))
    .reduce((acc, cur) => {
      if (_.isEmpty(acc)) {
        return cur[0];
      } else {
        return _.intersection(acc, cur[0]);
      }
    }, []);
  //   console.log(ingredients);
  knownAllergenToIngredientMap[allergen] = ingredients;
});

// console.log(knownAllergenToIngredientMap);
const knownIngredients = [];
let isNotFinished = true;
while (isNotFinished) {
  isNotFinished = false;
  Object.keys(knownAllergenToIngredientMap).map((key) => {
    let ingredients = knownAllergenToIngredientMap[key];
    if (ingredients.length === 1) {
      if (!knownIngredients.includes(ingredients[0])) {
        knownIngredients.push(ingredients[0]);
      }
    } else {
      if (ingredients.length >= 2) {
        isNotFinished = true;
      }
      ingredients = _.difference(ingredients, knownIngredients);
      knownAllergenToIngredientMap[key] = ingredients;
    }
  });
}

console.log(knownAllergenToIngredientMap);
console.log(knownIngredients);

const count = parsed
  .map((line) => line[0].filter((i) => !knownIngredients.includes(i)).length)
  .reduce((acc, cur) => acc + cur, 0);

console.log(count);
const res = Object.keys(knownAllergenToIngredientMap)
  .sort()
  .map((x) => knownAllergenToIngredientMap[x])
  .join(",");

console.log(res);
