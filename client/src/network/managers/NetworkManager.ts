import AuthController from "@network/controllers/AuthController";
import GameEventsController from "@network/controllers/GameEventsController";
import GameStatusController from "@network/controllers/GameStatusController";
import io, { Socket } from "socket.io-client";

class NetworkManager {
  private socket: Socket;
  authController: AuthController | null = null;
  gameStatusController: GameStatusController | null = null;
  gameEventsController: GameEventsController | null = null;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);


    this.socket.on("connect", () => {
      console.log("connected to server", this.socket.id);
      this.authController = new AuthController();
      this.gameStatusController = new GameStatusController();
      this.gameEventsController = new GameEventsController();
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

  }

  send(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  getSocket() {
    return this.socket;
  }
}

export default new NetworkManager("http://localhost:3000");

