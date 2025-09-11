import { ItemServer } from "@shared/network/types/game/item/item";

export default abstract class ItemWeapon {
  abstract id: string;
  abstract damage: number;
  abilities: null = null;

  abstract attack(): void;
  abstract network(): ItemServer;
}

