const fs = require('fs');
const readInput = () => {
    try {
        const data = fs.readFileSync('day1Input.txt', 'UTF-8');
        const lines = data.split(/\r?\n/);
        return lines.map(a => parseInt(a));
    } catch (err) {
        console.error(err);
    }
}

const input = readInput().sort((a, b) => a - b);

let i = 0;
let found = false;

while (i < input.length && !found) {
    let j = input.length - 1;
    while (i < j) {
        let k = input.length - 1;
        while (k > j) {
            let sum = input[i] + input[j] + input[k];
            if (sum === 2020) {
                console.log(input[i], input[j], input[k]);
                console.log(input[i] * input[j] * input[k]);
                found = true;
                break;
            }
            if (sum < 2020) {
                break;
            }
            k--;
        }
        j--;
    }
    i++;
}

