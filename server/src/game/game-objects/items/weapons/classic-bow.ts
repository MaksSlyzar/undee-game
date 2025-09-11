import ItemWeapon from "@core/items/weapon";
import { ClassicBowServer } from "@shared/network/types/game/item/weapon";

class ClassicBow extends ItemWeapon {
  id = "classic-bow";
  damage: number = 10;

  constructor() {
    super();
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

