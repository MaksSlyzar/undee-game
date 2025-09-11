import Controller from "@core/controller";
import { GameStatusClient } from "@shared/network/types/game/game-status";

export default class GameStatusController extends Controller {
  constructor() {
    super("game-status");
  }

  changeGameStatus(data: GameStatusClient) {
    this.emit("change-game-status", data);
    console.log("Join")
  }
}
