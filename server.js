import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

const PORT = process.env.PORT;
const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const server = http.createServer(async(req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, 'public', 'index.html');
        console.log(filePath);
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, 'public', 'about.html');
      } else {
        throw new Error("File not found");
      }
      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }

  // res.setHeader("Content-Type", "text/html");
  // res.statusCode = 404; it gives 404 error
  // res.end('<h1>Hello World!</h1>'); // text/html de Hello World! döner.
  // text/plain de <h1>Hello World!</h1> döner.

  // res.writeHead(500, { "Content-Type": "application/json" }); // 500 error
  //   res.end(JSON.stringify({ message: "Server Error!" })); // 500
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
