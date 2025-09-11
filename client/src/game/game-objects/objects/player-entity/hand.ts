import { Vector2d } from "@core/types/vector-2d";
import { Container, Graphics } from "pixi.js";

export default class PlayerEntityHand extends Container {
  graphics: Graphics;
  shadow: Graphics;
  firstPosition: Vector2d;

  constructor(position: Vector2d) {
    super();
    this.firstPosition = position;

    this.shadow = new Graphics();
    this.shadow.beginFill(0x000000, 0.3);
    this.shadow.drawCircle(0, 0, 8);
    this.shadow.endFill();
    this.shadow.position.set(0, 0);
    this.addChild(this.shadow);

    this.graphics = new Graphics();
    const outerRadius = 4;
    const innerRadius = 2;

    this.graphics.beginFill(0x00f300);
    this.graphics.drawCircle(0, 0, outerRadius);
    this.graphics.endFill();

    this.graphics.beginFill(0x000000, 0);
    this.graphics.drawCircle(0, 0, innerRadius);
    this.graphics.endFill();

    this.addChild(this.graphics);

    this.position.set(position.x, position.y);
  }

  backPosition() {
    this.x = this.firstPosition.x;
    this.y = this.firstPosition.y;
  }
}

