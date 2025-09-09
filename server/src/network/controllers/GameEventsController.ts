import Controller from "@core/controller";
import { Logger } from "@core/logger";
import GameCycle from "@game/managers/main/GameCycle";
import { InitNetworkEmi } from "@network/types/game/init";
import { MovementNetworkRecv } from "@network/types/game/movement";
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

  movement(socket: Socket, data: MovementNetworkRecv) {
    this.logger.info(`x:${data.position.x}, y:${data.position.y}`);

    const player = GameCycle.clusterManager.getPlayerBySocketId(socket.id);
    if (player && player.playerEntity) {
      player.playerEntity.networkRecv(data);
    }
  }

  subscribe(socket: Socket) {
    this.setupRecv<MovementNetworkRecv>(socket, "movement", (socket, data) => this.movement(socket, data));
  }
}

export default GameEventsController;

