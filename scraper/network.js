import { fetchPage } from './fetch.js';
import { parsePage } from './parse.js';

// Function to create a layer object for each depth
function createLayer(depth, links) {
    return {
        layer: depth,
        links: links
    };
}

// Function to recursively traverse URLs and build layers
async function traverseUrlDepth(url, depth = 1, maxDepth = 3, visited = new Set()) {
    if (depth > maxDepth || visited.has(url)) {
        return []; // Stop if max depth is reached or URL is already visited
    }

    // Marks the URL as visited
    visited.add(url);

    const html = await fetchPage(url); // Fetches HTML content from the URL
    if (!html) return []; // If there's an issue with fetching, return empty

    const { links } = parsePage(html); // Parse the page and extract links
    const currentLayer = createLayer(depth, links); // Create a layer with the current depth and links

    let allLinks = [currentLayer]; // Initialize with the current layer

    // Process each link at the current depth
    for (const link of links) {
        const fullLink = new URL(link, url).href; // Resolve relative URLs to absolute URLs
        const childLinks = await traverseUrlDepth(fullLink, depth + 1, maxDepth, visited);
        allLinks = allLinks.concat(childLinks); // Merge the child links with the current results
    }

    return allLinks; // Return all layers
}

export { traverseUrlDepth };
