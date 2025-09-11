import ItemWeapon from "@core/items/weapon";
import { ClassicSwordServer } from "@shared/network/types/game/item/weapon";
import { UseItemClient } from "@shared/network/types/game/movement";

class ClassicSword extends ItemWeapon {
  id: string = "classic-sword";
  damage: number = 2;
  lastTimeUsed: number = 0;

  attack(): void {
    this.player.activity = "attack";
    // Implement attack logic here
  }

  update(): void {
    if (this.player.activity == "attack") {
      if (Date.now() - this.lastTimeUsed > 800) {
        this.player.activity = "idle";
      }
    }
  }

  networkClient(data: UseItemClient): void {
    if (this.player.activity != "attack") {
      this.attack();
      this.lastTimeUsed = Date.now();
    }
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

