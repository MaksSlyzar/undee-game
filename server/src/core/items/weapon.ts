import PlayerEntity from "@game/game-objects/PlayerEntity";
import { ItemServer } from "@shared/network/types/game/item/item";
import { UseItemClient } from "@shared/network/types/game/movement";

export default abstract class ItemWeapon {
  abstract id: string;
  abstract damage: number;
  abilities: null = null;
  player: PlayerEntity;

  constructor(player: PlayerEntity) { this.player = player; };

  abstract attack(): void;
  abstract network(): ItemServer;
  abstract networkClient(data: UseItemClient): void;
  abstract update(): void;
}

