import path from 'node:path';

const userInput = process.argv[2];

let inputIsFile;
path.extname(userInput) ? (inputIsFile = true) : (inputIsFile = false);

console.log(inputIsFile);
