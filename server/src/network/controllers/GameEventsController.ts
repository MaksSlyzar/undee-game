import Controller from "@core/controller";
import { Logger } from "@core/logger";
import { InitNetworkEmi } from "@network/types/game/init";
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

  init(socket: Socket, data: InitNetworkEmi) {
    this.emit<InitNetworkEmi>(socket, "init", data);
  }

  subscribe(socket: Socket) {
  }
}

export default GameEventsController;

