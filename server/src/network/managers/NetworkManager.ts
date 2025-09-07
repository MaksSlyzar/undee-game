import setupServer from "@network/setupServer";
import { Server } from "socket.io";
import AuthController from "./AuthController";
import GameEventsController from "./GameEventsController";

class NetworkManager {
  private io: Server;
  authController: AuthController | null = null;
  gameEventsController: GameEventsController | null = null;

  constructor() {
    const { io } = setupServer();
    this.io = io;

    this.setupListeners();
  }

  private setupListeners() {
    this.authController = new AuthController();
    this.gameEventsController = new GameEventsController();

    this.io.on("connection", (socket) => {
      console.log(`client connected: ${socket.id}`);
      this.authController?.subscribe(socket);

      socket.on("message", (data) => {
        console.log(`received: ${data}`);
      });

      socket.on("disconnect", () => {
        console.log(`client disconnected: ${socket.id}`);
      });
    });
  }

  broadcast(event: string, data: any) {
    this.io.emit(event, data);
  }

  sendTo(socketId: string, event: string, data: any) {
    const socket = this.io.sockets.sockets.get(socketId);
    if (socket) {
      socket.emit(event, data);
    }
  }

  getServer() {
    return this.io;
  }
}

export default new NetworkManager();

