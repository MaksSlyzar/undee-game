import { GameObjectServer } from "./game-object";
import { InventoryServer } from "./inventory";

export interface PlayerEntityServer extends GameObjectServer {
  name: string;
  type: "player-entity";
  hp: number;
  hpMax: number;
  angle: number;
  activity: "move" | "attack" | "idle";
  inventory: InventoryServer | null;
  // activeSlotItem: ItemServerBase
}

export interface PlayerUpdateServer extends PlayerEntityServer { }

