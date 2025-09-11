import ItemWeapon from "@core/items/weapon";
import { ClassicSwordServer } from "@shared/network/types/game/item/weapon";

class ClassicSword extends ItemWeapon {
  id: string = "classic-sword";
  damage: number = 2;

  attack(): void {
    // Implement attack logic here
  }

  network(): ClassicSwordServer {
    return {
      id: "classic-sword",
      damage: this.damage,
      amount: 1,
      name: "Classic Sword",
    };
  }
}

export default ClassicSword;

