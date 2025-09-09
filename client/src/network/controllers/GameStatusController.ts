import Controller from "@core/controller";
import { GameStatusEmi } from "@network/types/game/game-status";

export default class GameStatusController extends Controller {
  constructor() {
    super("game-status");
  }

  changeGameStatus(data: GameStatusEmi) {
    this.emit("change-game-status", data);
    console.log("Join")
  }
}
