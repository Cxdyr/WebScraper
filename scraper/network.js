import { fetchPage } from './fetch.js';
import { parsePage } from './parse.js';

// Function to create a layer object for each depth
function createLayer(depth, r_url, links) {
    return {
        layer: depth,
        root: r_url,
        links: links
    };
}

// Function to recursively traverse URLs and build layers
async function traverseUrlDepth(url, depth = 1, maxDepth = 3, visited = new Set(), r_url = url) {
    if (depth > maxDepth || visited.has(url)) {
        return []; // Stop if max depth is reached or URL is already visited
    }

    // Marks the URL as visited
    visited.add(url);

    const html = await fetchPage(url); // Fetches HTML content from the URL
    if (!html) return []; // If there's an issue with fetching, return empty

    const { links } = parsePage(html); // Parse the page and extract links
    const currentLayer = createLayer(depth, url, links); // Create a layer with the current depth and links

    let allLinks = [currentLayer]; // Initialize with the current layer

    // Process each link at the current depth
    for (const link of links) {
        const fullLink = new URL(link, url).href; // Resolve relative URLs to absolute URLs
        const childLinks = await traverseUrlDepth(fullLink, depth + 1, maxDepth, visited, r_url);
        allLinks = allLinks.concat(childLinks); // Merge the child links with the current results
    }

    return allLinks; // Return all layers
}

export { traverseUrlDepth };
