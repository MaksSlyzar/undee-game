import { GameObjectServer } from "./game-object";
import { InventoryServer } from "./inventory";
import { ItemBaseServer } from "./item/item";

export interface PlayerEntityServer extends GameObjectServer {
  name: string;
  type: "player-entity";
  hp: number;
  hpMax: number;
  angle: number;
  activity: "move" | "attack" | "idle";
  inventory: InventoryServer | null;
  hands: {
    activeSlotItem: ItemBaseServer;
    activeItemIndex: number;
  };
}

export interface PlayerUpdateServer extends PlayerEntityServer { }

