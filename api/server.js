const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.json({ api: "lets get this show on the road" });
});

module.exports = server;
