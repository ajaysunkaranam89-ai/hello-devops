const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "dev";

let requestCount = 0;
const startTime = Date.now();

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/status", (req, res) => {
  requestCount += 1;
  res.json({
    message: "Hello from the DevOps pipeline!",
    hostname: os.hostname(),
    version: VERSION,
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    requestCount
  });
});

app.listen(PORT, () => {
  console.log(`hello-devops listening on port ${PORT}, version ${VERSION}`);
});
