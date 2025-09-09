import Controller from "@core/controller";
import { Logger } from "@core/logger";
import { NetworkLoginStatusTypeEmi, NetworkLoginTypeRecv } from "@network/types/auth/auth";
import { Socket } from "socket.io";
import NetworkManager from "@network/managers/NetworkManager";

class AuthController extends Controller {
  logger: Logger;

  constructor() {
    super("auth");
    this.logger = new Logger("AuthController");
  }

  itAuthenticated(socket: Socket) {

  }

  login(socket: Socket, data: NetworkLoginTypeRecv) {
    this.emit<NetworkLoginStatusTypeEmi>(socket, "login-status", { "message": "successfully", connected: true });
    NetworkManager.gameStatusController?.subscribe(socket);

  }

  subscribe(socket: Socket) {
    this.setupRecv<NetworkLoginTypeRecv>(socket, "login", (socket: Socket, data) => this.login(socket, data));
  }
}

export default AuthController;
