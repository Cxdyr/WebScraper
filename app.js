import readline from 'readline';
import { traverseUrlDepth } from './scraper/network.js';
import fs from 'fs';

// Setup readline to get input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask the user for the starting URL
function askStartingUrl() {
    rl.question('Please enter the starting URL: ', async (startingUrl) => {
        const maxDepth = 3; // Define the maximum depth to crawl
        const allLayers = await traverseUrlDepth(startingUrl, 1, maxDepth);

        // Save the crawled data into a JSON file
        fs.writeFileSync('networkData.json', JSON.stringify(allLayers, null, 2));
        console.log('Data has been successfully written to networkData.json');

        rl.close(); // Close the input prompt
    });
}

askStartingUrl();
