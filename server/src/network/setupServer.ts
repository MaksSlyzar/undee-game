import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export default function setupServer(port = 3000) {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" }
  });

  httpServer.listen(port, () => {
    console.log(`server running on port ${port}`);
  });

  return { io, httpServer };
}

