import { Container, Graphics } from "pixi.js";

export default class TargetPointer extends Container {
  private circle: Graphics;
  private animationTime = 0;
  private isActive = false;
  private duration = 60; // total animation frames (≈1s at 60fps)

  constructor() {
    super();

    this.circle = new Graphics();
    this.circle.lineStyle(2, 0xff0000);
    this.circle.drawCircle(0, 0, 15);
    this.circle.endFill();

    this.addChild(this.circle);
    this.visible = false;
  }

  follow(x: number, y: number) {
    this.position.set(x, y);
    this.animationTime = 0;
    this.isActive = true;
    this.visible = true;
    this.scale.set(0); // start small
    this.alpha = 1;
  }

  update(delta: number) {
    if (!this.isActive) return;

    this.animationTime += delta;

    const progress = this.animationTime / this.duration;

    // Scale animation: grows then stabilizes
    const scale = Math.min(progress * 2, 1.5);
    this.scale.set(scale);

    // Fade out over time
    this.alpha = 1 - progress;

    if (progress >= 1) {
      this.isActive = false;
      this.visible = false;
    }
  }
}

