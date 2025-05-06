const http = require('http');
const fs = require('fs');
const path = require('path');
const { serveFile } = require('./utils/fileUtils');
const { log } = require('./utils/logger');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Log the incoming request
  log(`${req.method} ${req.url}`);

  // Handle the root URL or explicit requests for index.html
  if (req.url === '/' || req.url === '/index.html') {
    serveFile(res, 'public/index.html', 'text/html');
  } 
  // Handle requests for CSS files
  else if (req.url.endsWith('.css')) {
    serveFile(res, path.join('public', req.url), 'text/css');
  } 
  // Handle requests for JavaScript files
  else if (req.url.endsWith('.js')) {
    serveFile(res, path.join('public', req.url), 'text/javascript');
  } 
  // Handle requests for image files
  else if (req.url.match(/\.(jpg|jpeg|png|gif)$/)) {
    const extension = path.extname(req.url).substring(1);
    serveFile(res, path.join('public', req.url), `image/${extension}`);
  } 
  // Handle 404 for all other requests
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    log(`Error 404: Resource not found ${req.url}`);
  }
});

server.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});