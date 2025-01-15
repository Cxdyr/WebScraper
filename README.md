# Web Scraper

This project is a web scraper that recursively fetches links from a given URL and stores the crawled data in a JSON file. The scraper uses Node.js with several key modules including `node-fetch` for making HTTP requests, `cheerio` for parsing HTML, and `readline` for handling user input.

## Features
- Crawl URLs to a specified depth and extract all links.
- Store the crawled data in a JSON file for further processing.

## Prerequisites

Before using this project, you need to have the following installed:

- **[Node.js](https://nodejs.org/)** (v16 or higher)
- **npm** (Node package manager, comes with Node.js)

You can verify that Node.js and npm are installed by running:

```bash
node -v
npm -v
```

## Cloning and running

You can clone the program using git clone - (depending on the cloning method)   
Then to run the program install the dependencies using
- **npm install**
  
Run the program using

- **npm start**
  
Then enter your starting URL: Please enter the starting URL: https://example.com

The resulting scrapped web pages will be stored in the json file in root directory
