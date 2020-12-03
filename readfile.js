const fs = require('fs');
const readInput = fileName => {
    try {
        const data = fs.readFileSync(fileName, 'UTF-8');
        const lines = data.split(/\r?\n/);
        return lines;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
  readInput,
}
