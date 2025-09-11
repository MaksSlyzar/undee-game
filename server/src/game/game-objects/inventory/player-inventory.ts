import { InventoryServer } from "@shared/network/types/game/inventory";
import ClassicSword from "../items/weapons/classic-sword";
import { generateId } from "@core/generateId";

export type ItemBase = ClassicSword;

export default class PlayerInventory {
  items: Record<string, ItemBase> = {};
  changedToken: string = generateId();
  itemsArray: Array<null | ItemBase> = [];

  constructor() {
    // Fill items array with 8 slots
    for (let i = 0; i < 8; i++) {
      this.itemsArray.push(null);
    }
  }

  addItemToInventory(item: ItemBase) {
    this.updateToken();

    let itemIndex = -1;
    for (let i = 0; i < this.itemsArray.length; i++) {
      if (this.itemsArray[i] == null) {
        this.itemsArray[i] = item;
        itemIndex = i;
        break;
      }
    }

    return itemIndex === -1 ? null : itemIndex;
  }

  updateToken() {
    this.changedToken = generateId();
  }

  network(): InventoryServer {
    const itemsData = this.itemsArray.map(item => (item ? item.network() : null));

    return {
      activeSlotIndex: 0,
      token: this.changedToken,
      itemsArray: itemsData
    };
  }
}

