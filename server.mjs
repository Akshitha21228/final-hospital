import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  return "text/plain; charset=utf-8";
}

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("Frontend index.html was not found.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const requestPath = req.url === "/" ? "/index.html" : String(req.url || "/index.html").split("?")[0];
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(root, safePath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, "index.html");
  if (!fs.existsSync(filePath)) filePath = path.join(root, "index.html");
  const body = fs.readFileSync(filePath);
  res.writeHead(200, {
    "Content-Type": contentType(filePath),
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0"
  });
  res.end(body);
});

server.on("error", (error) => {
  if (error?.code === "EPERM" || error?.code === "EACCES") {
      console.error(`Frontend server could not bind to port ${port}.`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`HOCC frontend ready at http://127.0.0.1:${port}`);
});
