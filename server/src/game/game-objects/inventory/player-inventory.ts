import { InventoryServer } from "@shared/network/types/game/inventory";
import { generateId } from "@core/generateId";
import { ItemBase } from "@core/items/items";
import PlayerEntity from "../PlayerEntity";

export default class PlayerInventory {
  items: Record<string, ItemBase> = {};
  changedToken: string = generateId();
  itemsArray: Array<ItemBase | null> = [];

  constructor(player: PlayerEntity) {
    // Fill items array with 8 slots
    for (let i = 0; i < 8; i++) {
      this.itemsArray.push(null);
    }
  }

  addItemToInventory(item: ItemBase) {
    this.updateToken();

    for (let i = 0; i < this.itemsArray.length; i++) {
      if (this.itemsArray[i] == null) {
        this.itemsArray[i] = item;

        return i;
      }
    }

    return -1;
  }

  getItemByIndex(index: number) {
    if (this.itemsArray.length <= index)
      return null;

    return this.itemsArray[index];
  }

  updateToken() {
    this.changedToken = generateId();
  }

  network(): InventoryServer {
    const itemsData = this.itemsArray.map(item => item ? item.network() : null);

    return {
      activeSlotIndex: 0,
      token: this.changedToken,
      itemsArray: itemsData
    };
  }
}

