import { Container, Graphics } from "pixi.js";
import { ItemBase } from "@core/types/items"; // assume ItemBase extends Container
import PlayerEntity from "@game/game-objects/objects/player-entity";

interface InventoryOptions {
  rows: number;
  cols: number;
  slotSize: number;
  padding: number;
}

export default class InventoryUI extends Container {
  items: ItemBase[] = [];
  options: InventoryOptions;
  private slots: Graphics[] = [];
  private isVisible: boolean = false;
  token: string = "0000";
  activeSlotIndex: number = -1;
  playerEntity: PlayerEntity | null = null;

  constructor(options: InventoryOptions) {
    super();
    this.options = options;
    this.drawSlots();
  }

  private drawSlots() {
    const { rows, cols, slotSize, padding } = this.options;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const slot = new Graphics();

        slot.beginFill(0x1a1a1a, 0.9);
        slot.drawRoundedRect(0, 0, slotSize, slotSize, 6);
        slot.endFill();

        slot.lineStyle(2, 0x000000, 0.6);
        slot.moveTo(2, slotSize - 2);
        slot.lineTo(slotSize - 2, slotSize - 2);
        slot.lineTo(slotSize - 2, 2);

        slot.lineStyle(2, 0xffffff, 0.25);
        slot.drawRoundedRect(0, 0, slotSize, slotSize, 6);

        slot.x = c * (slotSize + padding);
        slot.y = r * (slotSize + padding);

        this.addChild(slot);
        this.slots.push(slot);
      }
    }
  }

  updateItems(newItems: Array<ItemBase | null>) {
    this.items.forEach((item) => this.removeChild(item));
    this.items = [];

    const { cols, slotSize, padding } = this.options;

    newItems.forEach((item, index) => {
      if (item == null)
        return;
      const row = Math.floor(index / cols);
      const col = index % cols;

      item.x = col * (slotSize + padding) + slotSize / 2;
      item.y = row * (slotSize + padding) + slotSize / 2;

      item.pivot.set(item.width / 2, item.height / 2);

      this.addChild(item);
      this.items.push(item);
    });
  }

  show() {
    this.visible = true;
    this.isVisible = true;
  }

  hide() {
    this.visible = false;
    this.isVisible = false;
  }

  toggle() {
    this.isVisible ? this.hide() : this.show();
  }
}

