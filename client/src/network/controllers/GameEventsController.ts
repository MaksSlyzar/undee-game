import Controller from "@core/controller";
import GuiManager from "@gui/GuiManager";
import { syncGameObjects } from "@network/sync/sync-game-objects";
import { InitNetworkRecv } from "@network/types/game/init";
import { MovementNetworkEmi } from "@network/types/game/movement";
import { UpdateNetworkRecv } from "@network/types/game/update";

export default class GameEventsController extends Controller {
  playerId: string | null = null;

  constructor() {
    super("game-event");
    this.setupRecv("init", (data: InitNetworkRecv) => this.init(data));
    this.setupRecv("update", (data: UpdateNetworkRecv) => this.update(data));
  }

  init(data: InitNetworkRecv) {
    this.playerId = data.playerId;
    GuiManager.changeTo("game-screen");
  }

  update(data: UpdateNetworkRecv) {
    syncGameObjects(data.cluster.entities);
  }

  movement(data: MovementNetworkEmi) {
    this.emit<MovementNetworkEmi>("movement", data);
  }
}
