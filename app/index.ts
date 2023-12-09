import { Express, Request, Response } from "express";
const express = require("express");

import pino from "pino";
import * as http from "http";
import {Server} from "socket.io";

const logger = pino({ level: 'info', timestamp: pino.stdTimeFunctions.isoTime });
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html")
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  const client = socket.handshake.headers["user-agent"];
  const childLogger = logger.child({ client });
  childLogger.info("user connected");
  socket.on('user', (msg) => {
    childLogger.info(msg);
  });
  socket.on('disconnect', () => {
    childLogger.info("user disconnected");
  });
});

server.listen(3000, () => {
  logger.info(`listening on http://localhost:${port}`);
});