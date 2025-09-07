import Controller from "@core/controller";
import { Logger } from "@core/logger";
import { NetworkLoginStatusTypeEmi, NetworkLoginTypeRecv } from "@network/types/auth/auth";
import { Socket } from "socket.io";
import NetworkManager from "./NetworkManager";

class AuthController extends Controller {
  logger: Logger;

  constructor() {
    super("auth");
    this.logger = new Logger("AuthController");
  }

  login(socket: Socket, data: NetworkLoginTypeRecv) {
    this.emit<NetworkLoginStatusTypeEmi>(socket, "login-status", { "message": "successfully", connected: true });
  }

  subscribe(socket: Socket) {
    this.setupRecv<NetworkLoginTypeRecv>(socket, "login", (socket: Socket, data) => this.login(socket, data));
  }
}

export default AuthController;
