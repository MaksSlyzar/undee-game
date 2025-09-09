import Controller from "@core/controller";
import GuiManager from "@gui/GuiManager";
import { syncGameObjects } from "@network/sync/sync-game-objects";
import { InitNetworkRecv } from "@network/types/game/init";
import { UpdateNetworkRecv } from "@network/types/game/update";

export default class GameEventsController extends Controller {
  constructor() {
    super("game-event");
    this.setupRecv("init", (data: InitNetworkRecv) => this.init(data));
    this.setupRecv("update", (data: UpdateNetworkRecv) => this.update(data));
  }

  init(data: InitNetworkRecv) {
    GuiManager.changeTo("game-screen");
  }

  update(data: UpdateNetworkRecv) {
    syncGameObjects(data.cluster.entities);
  }
}
