const express = require("express");
const proxy = require("express-http-proxy");
const ConsistentHashing = require("consistent-hashing");

const app = express();
const port = 3000;

// List of server URLs
const servers = [
  "http://localhost:8000",
  "http://localhost:8001",
  "http://localhost:8002",
];

// Create a consistent hashing ring
const ring = new ConsistentHashing(servers);

// Middleware to determine the target server and proxy the request
app.use((req, res, next) => {
  //   const clientIP = req.ip;
  const clientIP = req.headers["x-forwarded-for"] || req.ip;
  const serverUrl = ring.getNode(clientIP);

  // Use express-http-proxy to forward the request to the target server
  return proxy(serverUrl)(req, res, next);
});

app.listen(port, () => {
  console.log(`Consistent hashing server listening on port ${port}`);
});
