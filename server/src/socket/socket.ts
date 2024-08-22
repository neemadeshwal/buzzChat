import { Server } from "socket.io";

import express from "express";

import { createServer } from "node:http";
import { CLIENT_URL } from "../constants";

const app = express();
//This creates an HTTP server using Node.js's createServer function and passes the Express application instance 
//(app) to it. This server will handle HTTP requests and responses.
const server = createServer(app);


// This creates a new Server instance from socket.io and attaches it to the HTTP server (server). 
//This allows the HTTP server to handle WebSocket connections as well.
const io = new Server(server, {
    cors: {
        origin: [CLIENT_URL as string], methods: ["GET", "POST"]
    },
});


export { app, server, io }