const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/request' && req.method === 'POST') {
    const fileWriter = fs.createWriteStream('request.txt');
    req.pipe(fileWriter);
    res.end('File uploaded');
  }
});
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});


