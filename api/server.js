const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "lets get this show on the road" });
});

module.exports = server;
