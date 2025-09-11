import Controller from "@core/controller";
import GameCycle from "@game/managers/main/GameCycle";
import GuiManager from "@gui/GuiManager";
import { syncGameObjects } from "@network/sync/sync-game-objects";
import { syncInventory } from "@network/sync/sync-inventory";
import { SyncPlayer } from "@network/sync/sync-player";
import { InitServer } from "@shared/network/types/game/init";
import { MovementClient } from "@shared/network/types/game/movement";
import { UpdateServer } from "@shared/network/types/game/update";

export default class GameEventsController extends Controller {
  playerId: string | null = null;

  constructor() {
    super("game-event");

    this.setupRecv("init", (data: InitServer) => this.init(data));
    this.setupRecv("update", (data: UpdateServer) => this.update(data));
  }

  private init(data: InitServer) {
    this.playerId = data.playerId;
    GuiManager.changeTo("game-screen");
  }

  private update(data: UpdateServer) {
    syncGameObjects(data.cluster.entities);

    if (data.cluster.playerEntity?.inventory) {
      syncInventory(data.cluster.playerEntity.inventory);
    }
  }

  public movement(data: MovementClient) {
    this.emit<MovementClient>("movement", data);
  }
}

