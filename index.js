// Import required modules
import fs from 'node:fs';
import path from 'node:path';

// Declare variable for user input
const userInput = process.argv[2];

// Check if user input is a text or a file-reference
let inputIsFile;
path.extname(userInput) ? (inputIsFile = true) : (inputIsFile = false);

console.log('Input is a file: ' + inputIsFile);

// Setup API call with CLI or file
if (inputIsFile) {
  // Input is a file
  console.log('*** API call with file ***');

  // Read file from root directory
  await fs.readFile(userInput, 'utf8', (err, fileContent) => {
    // If something goes wrong...
    if (err) {
      console.error(err);
      return;
    }

    // Call API with read content
    console.log('File read successfully...');
    callAPI(fileContent);
  });
} else {
  // If input is no file, call API with command line input
  console.log('*** API call with CLI input ***');
  callAPI(userInput);
}

// Function for calling the API
function callAPI(input) {
  const content = input;
  console.log('Trying to input: ' + content);
}
