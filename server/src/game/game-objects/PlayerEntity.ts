import GameObject from "@core/game-object";
import { generateId } from "@core/generateId";
import Player from "@core/player";
import { PlayerUpdateNetworkEmi } from "@network/types/game/player";

class PlayerEntity extends GameObject<PlayerUpdateNetworkEmi> {
  player: Player;

  constructor(player: Player) {
    super(generateId());
    this.player = player;
  }

  update(delta: number): void {
  }

  start(): void {

  }

  networkUpdate(): PlayerUpdateNetworkEmi {
    return {
      id: this.id,
      name: "undefined",
      position: { x: 100, y: 200 },
      type: "player-entity"
    }
  }
}

export default PlayerEntity;
