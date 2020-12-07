const { readData } = require('./readfile');

const input = readData('day7Input.txt');
// const input = readData('day7Input-simple.txt');
// const input = readData('day7Input-q2.txt');
const lines = input.split(/\n/);

const line = `muted gold bags contain 1 wavy red bag, 3 mirrored violet bags, 5 bright gold bags, 5 plaid white bags. `;

const parseLine = line => {
    const [parentBag, children] = line.split(' bags contain ');
    // console.log(parentBag);
    let childrenBags = [];
    if (children && !children.includes('no other bags')) {
        childrenBags = children ? children.trimEnd()
            .split(/,|\./)
            .map(child => child.replace(/bags?/, ''))
            .map(child => child.trim())
            .filter(Boolean)
            .map(child => [child.slice(2), child.slice(0, 1)]) : [];
    }
    // console.log(childrenBags);
    return [parentBag, childrenBags];
}

// const parsedLine = parseLine(line);
// console.log(parsedLine)

const parsedLines = lines.map(parseLine);
// console.log(JSON.stringify(parsedLines));

// const colors = parsedLines.map(line => line[0]);

const isNotEmpty = list => list && list.length > 0;

const bagMap = {};
parsedLines.forEach(line => {
    const [parentBag, childrenBags] = line;
    bagMap[parentBag] = childrenBags;
})
const colors = Object.keys(bagMap)
// console.log(colors)
// console.log(bagMap)

const countBagsContainTargetBag = toFindBag => {
    let count = 0;
    for (let i = 0; i < colors.length; i++) {
        // console.log('')
        const line = parsedLines[i];
        let [, childrenBags] = line;
        let found = false;
        while (isNotEmpty(childrenBags)) {
            let bags = [];
            // console.log('childrenBags', childrenBags)
            for (let i = 0; i < childrenBags.length; i++) {
                const [bagName] = childrenBags[i];
                // console.log('bagName', bagName, bagName === toFindBag)
                if (bagName === toFindBag) {
                    found = true;
                    break;
                }
                if (isNotEmpty(bagMap[bagName])) {
                    bags = [...bags, ...bagMap[bagName]];
                }
            }
            if (found) {
                break;
            }
            childrenBags = bags;
        }
        if (found) {
            count++;
        }
    }
    return count;
}

// question 1
const toFindBag = 'shiny gold';
// const count = countBagsContainTargetBag(toFindBag);

// console.log(count);
// 103

// question 2
let count = 1;
const getBagsCount = (bagName, count) => {
    let childrenBagsWithCount = bagMap[bagName];
    // console.log(bagName, count, childrenBagsWithCount);
    return childrenBagsWithCount.map(line => {
        let [child, childCount] = line;
        return getBagsCount(child, count * childCount);
    }).reduce((acc, cur) => acc + cur, count);
}
const total = getBagsCount(toFindBag, count);
console.log(total-1);
// 1469