import { ItemServer } from "./item";

export interface ItemWeaponServer extends ItemServer {
  damage: number;
}

export interface ClassicSwordServer extends ItemWeaponServer {
  id: "classic-sword";
}

export interface ClassicBowServer extends ItemWeaponServer {
  id: "classic-bow";
}

