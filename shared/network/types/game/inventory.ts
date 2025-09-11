import { ItemServer } from "./item/item";

export type InventoryServer = {
  activeSlotIndex: number;
  token: string;
  itemsArray: Array<null | ItemServer>;
};

