import { ItemBase } from "@core/types/items";
import Empty from "@game/game-objects/objects/player-entity/hand-items/empty";
import Sword from "@game/game-objects/objects/player-entity/hand-items/sword";
import GameCycle from "@game/managers/main/GameCycle";
import { InventoryServer } from "@shared/network/types/game/inventory";
import { ItemBaseServer } from "@shared/network/types/game/item/item";

export function syncInventory(data: InventoryServer) {

  if (!GameCycle.inventoryUI) return;

  const token = GameCycle.inventoryUI.token;

  if (token === data.token) return;
  GameCycle.inventoryUI.token = data.token;
  const items: ItemBase[] = [];

  data.itemsArray.forEach((item) => {
    items.push(syncItem(item));
  });

  GameCycle.inventoryUI.updateItems(items);
}

export function syncItem(data: ItemBaseServer) {
  switch (data.id) {
    case "classic-sword":
      return new Sword();
    default:
      return new Empty();
  }
}

