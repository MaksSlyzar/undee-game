import Controller from "@core/controller";
import { Logger } from "@core/logger";
import GameCycle from "@game/managers/main/GameCycle";
import { InitServer } from "@shared/network/types/game/init";
import { MovementClient } from "@shared/network/types/game/movement";
import { UpdateServer } from "@shared/network/types/game/update";
import { Socket } from "socket.io";

class GameEventsController extends Controller {
  logger: Logger;

  constructor() {
    super("game-event");
    this.logger = new Logger("GameEventsController");
  }

  update(socket: Socket, data: UpdateServer) {
    this.emit<UpdateServer>(socket, "update", data);
  }

  init(socket: Socket, data: InitServer) {
    this.emit<InitServer>(socket, "init", data);
  }

  movement(socket: Socket, data: MovementClient) {
    this.logger.info(`x:${data.position.x}, y:${data.position.y}`);

    const player = GameCycle.clusterManager.getPlayerBySocketId(socket.id);
    if (player && player.playerEntity) {
      player.playerEntity.networkClient(data);
    }
  }

  subscribe(socket: Socket) {
    this.setupRecv<MovementClient>(socket, "movement", (socket, data) => this.movement(socket, data));
  }
}

export default GameEventsController;

