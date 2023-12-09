"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pino_1 = __importDefault(require("pino"));
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const logger = (0, pino_1.default)({ level: 'info', timestamp: pino_1.default.stdTimeFunctions.isoTime });
const app = express();
const server = http.createServer(app);
const io = new socket_io_1.Server(server);
const port = 3000;
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
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
