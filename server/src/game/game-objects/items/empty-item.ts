import { EmptyItemServer } from "@shared/network/types/game/item/item";
import { UseItemClient } from "@shared/network/types/game/movement";
import PlayerEntity from "../PlayerEntity";

class EmptyItem {
  id: string = "empty";
  player: PlayerEntity;

  constructor(player: PlayerEntity) {
    this.player = player;
  }

  networkClient(data: UseItemClient): void {
  }

  update() { }

  network(): EmptyItemServer {
    return {
      id: "empty",
      amount: 0,
      name: "Void"
    }
  }
}

export default EmptyItem;
