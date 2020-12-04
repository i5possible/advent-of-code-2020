const fs = require('fs');
const readLines = (fileName, splitter = /\r?\n/) => {
    try {
        const data = fs.readFileSync(fileName, 'UTF-8');
        const lines = data.split(splitter);
        return lines;
    } catch (err) {
        console.error(err);
    }
}

const readData = fileName => {
    try {
        return fs.readFileSync(fileName, 'UTF-8');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    readLines,
    readData,
}
