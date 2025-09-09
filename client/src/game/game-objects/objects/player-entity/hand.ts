import { Vector2d } from "@core/types/vector-2d";
import { Container, Graphics } from "pixi.js";

export default class PlayerEntityHand extends Container {
  graphics: Graphics;
  shadow: Graphics;

  constructor(position: Vector2d) {
    super();

    // Shadow
    this.shadow = new Graphics();
    this.shadow.beginFill(0x000000, 0.3); // black with alpha for transparency
    this.shadow.drawCircle(0, 0, 8); // slightly bigger than hand
    this.shadow.endFill();
    this.shadow.position.set(0, 0); // offset for shadow effect
    this.addChild(this.shadow);

    // Hand
    this.graphics = new Graphics();
    this.graphics.beginFill(0x00f300); // hand color
    this.graphics.drawCircle(0, 0, 4);
    this.graphics.endFill();
    this.addChild(this.graphics);

    this.position.set(position.x, position.y);
  }
}

