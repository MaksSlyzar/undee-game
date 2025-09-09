import Controller from "@core/controller"
import { Logger } from "@core/logger";
import Player from "@core/player";
import GameCycle from "@game/managers/main/GameCycle";
import NetworkManager from "@network/managers/NetworkManager";
import { GameStatusRecv } from "@network/types/game/game-status";
import { Socket } from "socket.io";

export default class GameStatusController extends Controller {
  logger: Logger;

  constructor() {
    super("game-status");
    this.logger = new Logger("GameStatusController");
  }

  private changeGameStatusRecv(socket: Socket, data: GameStatusRecv) {
    if (data.type == "connect") {
      const clusters = GameCycle.clusterManager.getAllClusters();
      console.log(clusters);
      if (clusters.length >= 1) {
        NetworkManager.gameEventsController?.subscribe(socket);
        const player = new Player(socket);
        GameCycle.clusterManager.addPlayerToCluster(clusters[0].id, player);
      }
    }
  }

  subscribe(socket: Socket) {
    this.setupRecv<GameStatusRecv>(socket, "change-game-status", (socket: Socket, data) => this.changeGameStatusRecv(socket, data));
  }
}
