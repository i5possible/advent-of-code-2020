const prompt = require('prompt-sync')({sigint:false});
 
const name = prompt('What is your name?');
console.log(`Hey there ${name}`);
