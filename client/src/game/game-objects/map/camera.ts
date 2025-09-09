import { Container } from "pixi.js";

export default class Camera {
  public container: Container;
  public viewportWidth: number;
  public viewportHeight: number;

  private target?: Container;
  private lerp: number;

  constructor(container: Container, viewportWidth: number, viewportHeight: number, lerp: number = 0.1) {
    this.container = container;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.lerp = lerp;
  }

  follow(target: Container) {
    this.target = target;
  }

  update() {
    if (!this.target) return;

    const desiredX = -this.target.x + this.viewportWidth / 2;
    const desiredY = -this.target.y + this.viewportHeight / 2;

    this.container.x += (desiredX - this.container.x) * this.lerp;
    this.container.y += (desiredY - this.container.y) * this.lerp;
  }

  setZoom(scale: number) {
    this.container.scale.set(scale);
  }
}

