const {
    readData
} = require('./readfile');
const input = readData('day18Input.txt');
// const input = readData('day18Input-simple.txt');
const lines = input.split(/\n/);

const isExpression = (line) => {
    const matches = line.match(/[+*()]/g);
    return matches && matches.length !== 0;
}
const hasAdd = (line) => {
    const matches = line.match(/\+/g);
    return matches && matches !== 0;
}

const evaluateSimpleExpression = (expression) => {
    let current = expression;
    const matches = current.match(/[+*()]/g);
    if (matches && matches.length > 0) {
        const numbers = current.split(/[\*\+]/g);
        if (matches.length !== numbers.length - 1) {
            console.log('Something wrong');
        }
        let total = parseInt(numbers[0]);
        for (let i = 0; i < matches.length; i++) {
            if (matches[i] === '*') {
                total *= parseInt(numbers[i + 1]);
            } else {
                total += parseInt(numbers[i + 1]);
            }
        }
        return total;
    } else {
        return parseInt(current);
    }
}


const evaluateExpressionAddFirst = (expression) => {
    let current = expression;
    const matches = current.match(/[+*]/g);
    if (matches && matches.length > 0) {
        const numbers = current.split(/[\*\+]/g).map(x => parseInt(x));
        if (matches.length !== numbers.length - 1) {
            console.log('Something wrong');
        }
        for (let i = 0; i < matches.length;) {
            // console.log(matches, numbers)
            if (matches[i] === '+') {
                numbers.splice(i, 2, numbers[i] + numbers[i + 1]);
                matches.splice(i, 1);
            } else {
                i++;
            }
        }
        for (let i = 0; i < matches.length;) {
            // console.log(matches, numbers)
            if (matches[i] === '*') {
                numbers.splice(i, 2, numbers[i] * numbers[i + 1]);
                matches.splice(i, 1);
            } else {
                i++;
            }
        }
        return numbers[0];
    } else {
        return parseInt(current);
    }
}

const evaluateExpression = (expression, addFirst) => {
    let current = expression;
    while (isExpression(current)) {
        // console.log(current);
        const right = current.indexOf(')');
        if (right > 0) {
            const left = current.lastIndexOf('(', right);
            // console.log(`right: ${right}, left: ${left}`);
            current = current.substring(0, left) + evaluateExpression(current.substring(left + 1, right), addFirst) + current.substring(right + 1);
        } else {
            if (addFirst) {
                return evaluateExpressionAddFirst(current);
            }
            return evaluateSimpleExpression(current);
        }
    }
}

// console.log(evaluateExpression(line));
const question1 = lines => lines.map(line => evaluateExpression(line, false)).reduce((acc, cur) => acc + cur, 0);
//7293529867931

const question2 = lines => lines.map(line => evaluateExpression(line, true)).reduce((acc, cur) => acc + cur, 0);
console.log(question1(lines));
console.log(question2(lines));