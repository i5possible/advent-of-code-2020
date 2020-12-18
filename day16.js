const { readData } = require('./readfile');
const input = readData('day16Input.txt');
// questions 1: 22000
// const input = readData('day16Input-simple.txt');
const lines = input.split(/\n\n/);

// console.log(lines[0]);
// console.log('------------');
// console.log(lines[1]);
// console.log('------------');
// console.log(lines[2]);

const parseRules = (line) => {
    const res = line.match(/(\d+-\d+)/g);
    return res.map(rule => rule.split('-').map(x => parseInt(x)).reduce((acc, cur) =>(acc.push(cur), acc), []))
}

const rules = lines[0].split(/\n/).map(line => parseRules(line))

// console.log(rules)

const sumFiltered = () => {
    const parseNumbers = line => line.split(/[\n,]/).map(x => parseInt(x));

    const numbers = parseNumbers(lines[2]);

    const filtered = numbers.filter(number => {
        return rules.flatMap(x=>x).every(rule => {
            const [min, max] = rule;
            return number < min || number > max;
        })
    })
    // console.log(numbers);
    // console.log(filtered)
    // question 1
    console.log(filtered.reduce((acc, cur) => acc+cur, 0));
}
const flattenRules = rules.flatMap(x=>x);
const tickets = lines[2].split(/\n/);
tickets.shift();
const notMatchGivenRule = (rule, number) => {
    const [min, max] = rule;
    return number < min || number > max;
}

const filteredTickets = tickets.map(row => row.split(/,/).map(x => parseInt(x))).filter(row => 
    !row.some(number => flattenRules.every(rule => notMatchGivenRule(rule, number)))
)

// console.log(tickets.length)
// console.log(filteredTickets.length)
sumFiltered()
// console.log(filteredTickets.flatMap(x => x).reduce((acc, cur) => acc+cur, 0));

const findColumnMatchedRules = (filteredTickets, rules) => {
    const columnMatchedRules = [];
    for (let i = 0; i < filteredTickets[0].length; i++) {
        const matchedRules = [];
        for(let j = 0; j < rules.length; j++) {
            let match = true;
            rule = rules[j];
            for (let k = 0; k < filteredTickets.length; k++) {
                const notMatch = notMatchGivenRule(rule[0], filteredTickets[k][i]) && notMatchGivenRule(rule[1], filteredTickets[k][i])
                if (notMatch) {
                    // console.log(i, j, rule, filteredTickets[k][i], notMatch)
                    match = false;
                }
            }
            if (match) {
                // console.log('match', i, j)
                matchedRules.push(j);
            }
        }
        columnMatchedRules.push(matchedRules);
    }
    return columnMatchedRules;
}
const columnMatchedRules = findColumnMatchedRules(filteredTickets, rules);

let finished = false;
let foundMapping = {};
while(!finished) {
    for (let i = 0; i < columnMatchedRules.length; i++) {
        if (Object.values(foundMapping).includes(i)) {
            continue;
        }
        const remain = columnMatchedRules[i].filter(rule => {
            // console.log(Object.keys(foundMapping), rule);
            return !Object.keys(foundMapping).map(x => parseInt(x)).includes(rule);
        });
        // console.log(i, remain.length)
        if (remain.length === 1) {
            foundMapping[remain[0]] = i;
            break;
        } 
    }
    // console.log(foundMapping)
    if (Object.values(foundMapping).length === columnMatchedRules.length) {
        finished = true;
    }
}

// console.log(foundMapping);

const myInput = lines[1].split(/\n/).slice(1)[0].split(/,/).map(x => parseInt(x));
// console.log(myInput)

let res = 1;
for (let i = 0; i < 6; i++) {
    let column = foundMapping[i];
    res *= myInput[column];
}
console.log(res);