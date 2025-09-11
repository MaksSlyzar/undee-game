import ItemWeapon from "@core/items/weapon";
import PlayerEntity from "@game/game-objects/PlayerEntity";
import { ClassicBowServer } from "@shared/network/types/game/item/weapon";
import { UseItemClient } from "@shared/network/types/game/movement";

class ClassicBow extends ItemWeapon {
  id = "classic-bow";
  damage: number = 10;

  constructor(player: PlayerEntity) {
    super(player);
  }

  update(): void {

  }

  networkClient(data: UseItemClient): void {

  }

  attack(): void {
    // Implement attack logic here
  }

  network(): ClassicBowServer {
    return {
      id: "classic-bow",
      damage: this.damage,
      amount: 1,
      name: "Classic Bow",
    };
  }
}

export default ClassicBow;

