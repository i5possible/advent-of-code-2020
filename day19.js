const { isArray, values } = require("lodash");
const _ = require("lodash");
const { readData } = require("./readfile");
const input = readData("day19Input.txt");
// const input = readData("day19InputSimple.txt");
const lines = input.split(/\n\n/);

const rules = lines[0].split(/\n/);
const messages = lines[1].split(/\n/);

// console.log(rules, messages);

const buildRuleMap = (rules) => {
  let ruleMap = new Map();
  rules.forEach((rule) => {
    const parts = rule.split(":");
    const index = parseInt(parts[0]);
    const value = _.trim(_.trim(parts[1]), '"');
    const values = ["a", "b"].includes(value)
      ? value
      : value.split(/\|/).map((x) => _.trim(x).split(" "));
    ruleMap.set(index, values);
  });
  return ruleMap;
};
const ruleMap = buildRuleMap(rules);
// console.log(ruleMap);

// get possible values for index
// ruleMap is an given map: Map()
// valuesMap is an object, cache the results
const getPossibleValues = (valuesMap, ruleMap, index) => {
  const calculated =
    !!valuesMap.get(index) && /^[a-z]+$/.test(valuesMap.get(index));
  if (calculated) {
    return valuesMap.get(index);
  }

  // console.log("rule", index, ruleMap.get(parseInt(index)));
  const rule = ruleMap.get(parseInt(index));
  if (!isArray(rule)) {
    valuesMap.set(index, rule);
    return rule;
  }
  // console.log("calculating", index);
  let results = rule.map((keys) => {
    const [key1, key2, key3] = keys;
    const values1 = getPossibleValues(valuesMap, ruleMap, key1);
    const values2 = getPossibleValues(valuesMap, ruleMap, key2);
    const values3 = getPossibleValues(valuesMap, ruleMap, key3);
    const possibleValues = [];
    for (let i = 0; i < values1.length; i++) {
      if (!values2) {
        possibleValues.push(values1[i]);
      } else if (!isArray(values2)) {
        possibleValues.push(values1[i] + values2);
      } else {
        for (let j = 0; j < values2.length; j++) {
          if (values3) {
            possibleValues.push(values1[i] + values2[j] + values3);
          } else {
            possibleValues.push(values1[i] + values2[j]);
          }
        }
      }
    }
    return possibleValues;
  });
  if (isArray(results) && isArray(results[0])) {
    results = results.reduce((acc, cur) => [...acc, ...cur], []);
  }
  // console.log("results", index, results);
  valuesMap.set(index, results);
  return results;
};
const valuesMap = new Map();
const possibleValues = getPossibleValues(valuesMap, ruleMap, 0);
// console.log(possibleValues);

const countMatches = (possibleValues, messages) => {
  let count = 0;
  messages.forEach((message) => {
    // console.log(message);
    if (possibleValues.includes(message)) {
      count++;
    }
  });
  console.log(count);
  return count;
};

// countMatches(possibleValues, messages);

const values31 = valuesMap.get("31");
const values42 = valuesMap.get("42");
const countMatchesUnderNewRule = (values31, values42, messages) => {
  let count = 0;
  messages.forEach((message) => {
    let count31 = 0;
    let count42 = 0;

    let end = 0;
    let match = true;
    for (i = 0; i < message.length; i = i + 8) {
      const shard = message.slice(i, i + 8);
      if (values42.includes(shard)) {
        count42++;
      } else {
        end = i;
        break;
      }
    }

    for (i = end; i < message.length; i = i + 8) {
      const shard = message.slice(i, i + 8);
      if (values31.includes(shard)) {
        count31++;
      } else {
        match = false;
      }
    }
    if (count42 > count31 && count31 > 0 && match) {
      // console.log(count42, count31);
      count++;
    }
  });
  console.log(count);
  return count;
};

countMatchesUnderNewRule(values31, values42, messages);
