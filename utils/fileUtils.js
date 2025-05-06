const fs = require('fs');
const path = require('path');
const { log } = require('./logger');

/**
 * Serves a file with appropriate headers
 * @param {Object} res - The HTTP response object
 * @param {string} filePath - Path to the file to serve
 * @param {string} contentType - The content type header value
 */
function serveFile(res, filePath, contentType) {
  const absolutePath = path.resolve(filePath);
  
  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        log(`Error 404: File not found ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        // Server error
        log(`Error 500: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }
    
    // Set cache control headers for static content
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': 'max-age=86400', // Cache for 1 day
      'Content-Length': data.length,
      'X-Content-Type-Options': 'nosniff', // Security header
      'X-Frame-Options': 'DENY' // Security header
    };
    
    res.writeHead(200, headers);
    res.end(data);
    log(`Successfully served ${filePath}`);
  });
}

module.exports = { serveFile };