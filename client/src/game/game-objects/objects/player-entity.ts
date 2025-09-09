import { Graphics } from "pixi.js";
import GameObject from "@core/game-object";
import { PlayerEntityNetworkRecv } from "@network/types/game/game-object";
import { PlayerUI } from "@hud/player-ui";

export default class PlayerEntity extends GameObject {
  private graphics: Graphics;
  playerUi: PlayerUI;

  constructor(id: string, x: number = 0, y: number = 0) {
    super(id, x, y);
    this.playerUi = new PlayerUI("undefined", 70, 100);
    this.playerUi.position.y = -30;
    this.addChild(this.playerUi);

    this.graphics = new Graphics();
    this.graphics.beginFill(0x00ff00);
    this.graphics.drawCircle(0, 0, 16);
    this.graphics.endFill();

    this.addChild(this.graphics);
  }

  update(delta: number): void {
    // Example: move right every frame
    this.x += 1 * delta;
  }

  updateNetworkRecv(data: PlayerEntityNetworkRecv) {
    this.x = data.position.x;
    this.y = data.position.y;
  }
}

