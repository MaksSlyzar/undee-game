import { Container } from "pixi.js";

export default abstract class GameObject extends Container {
  public xPos: number;
  public yPos: number;
  public id: string;

  constructor(id: string, x: number = 0, y: number = 0) {
    super();
    this.id = id;
    this.xPos = x;
    this.yPos = y;
    this.position.set(x, y);
  }

  abstract update(delta: number): void;

  destroy(options?: Parameters<Container["destroy"]>[0]) {
    super.destroy(options);
  }
}

