import * as cheerio from 'cheerio'; // Import cheerio for parsing HTML

// Function to parse the HTML content of a page
function parsePage(html) {
    const $ = cheerio.load(html); // Load the HTML into cheerio

    // Extract text from paragraphs, h1, h2, h3 tags (the "boilerplate" content)
    const boilerplate = $('p, h1, h2, h3').text();

    // Extract links (href attributes) from <a> tags
    const links = [];

    // Loop through each <a> tag and extract the href attribute
    $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('http')) { // Only add absolute URLs
            links.push(href);
        }
    });

    // Return both the boilerplate text and the extracted links
    return { boilerplate, links };
}

export { parsePage };
