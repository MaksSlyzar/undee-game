import Controller from "@core/controller";
import { Logger } from "@core/logger";
import { NetworkLoginStatusTypeEmi, NetworkLoginTypeRecv } from "@network/types/auth/auth";
import { UpdateNetworkEmi } from "@network/types/game/update";
import { Socket } from "socket.io";

class GameEventsController extends Controller {
  logger: Logger;

  constructor() {
    super("game-event");
    this.logger = new Logger("GameEventsController");
  }

  update(socket: Socket, data: UpdateNetworkEmi) {
    this.emit<UpdateNetworkEmi>(socket, "update", data);
  }

  subscribe(socket: Socket) {
  }
}

export default GameEventsController;

