#!/usr/bin/env node
/* Minimal static server — no dependencies. Serves the repo root so /index.html
   works exactly as it will on GitHub Pages. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const port = process.env.PORT || 8080;
const TYPES = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.json':'application/json',
  '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml',
  '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  /* keep requests inside the repo */
  const file = path.join(root, path.normalize(rel).replace(/^(\.\.[\/\\])+/, ''));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('Not found: ' + rel); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream'});
    res.end(buf);
  });
}).listen(port, () => console.log('TRANCE LAB  →  http://localhost:' + port));
