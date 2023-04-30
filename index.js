// Import required modules
import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';

// Declare variable for user input
const userInput = process.argv[2];

// API call parameter
const apiURL = 'http://text-processing.com/api/sentiment/';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

// Check if there is a user input at all
if (!process.argv[2]) {
  console.log('User input is missing.');
  console.log('You can add it after calling "node index.js"');
  console.log('Examples:');
  console.log('1) node index.js test');
  console.log('2) node index.js "this is an awesome text"');
  console.log('3) node index.js example.txt');
  process.argv[2] = 'test';
} else {
  // Check if user input is a text or a file-reference
  let inputIsFile;
  path.extname(userInput) ? (inputIsFile = true) : (inputIsFile = false);

  // Asyn function for calling the API
  async function callAPI(input) {
    // Declaring input as value for 'text in the options body (required for the API Call)
    options.body = new URLSearchParams({ text: input });

    // Logging the input
    console.log('Sentiment Analysis of: ' + options.body.get('text'));

    // Calling the API
    const response = await fetch(apiURL, options);
    const data = await response.json();
    console.log('*** Result ***');

    if (data.label === 'pos') {
      console.log(
        `With a probability of ${Math.round(
          data.probability.pos * 100,
        )}%, the sentiment of your input is ${data.label}itive.`,
      );
    } else if (data.label === 'neg') {
      console.log(
        `With a probability of ${Math.round(
          data.probability.neg * 100,
        )}%, the sentiment of your input is ${data.label}ative.`,
      );
    } else if (data.label === 'neutral') {
      console.log(
        `With a probability of ${Math.round(
          data.probability.neutral * 100,
        )}%, the sentiment of your input is ${data.label}.`,
      );
    }
  }

  // Setup API call with CLI or file
  if (inputIsFile) {
    // Input is a file
    console.log('*** API call with file ***');

    // Read file from root directory
    fs.readFile(userInput, 'utf8', async (err, fileContent) => {
      // If something goes wrong...
      if (err) {
        console.error(err);
        return;
      }

      // Call API with read content
      console.log('File read successfully...');
      await callAPI(fileContent);
    });
  } else {
    // If input is no file, call API with command line input
    console.log('*** API call with CLI input ***');
    await callAPI(userInput);
  }
}
