import AuthController from "@network/controllers/AuthController";
import io, { Socket } from "socket.io-client";

class NetworkManager {
  private socket: Socket;
  authController: AuthController | null = null;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);


    this.socket.on("connect", () => {
      console.log("connected to server", this.socket.id);
      this.authController = new AuthController();
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

