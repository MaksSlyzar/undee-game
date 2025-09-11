import { Container, Graphics } from "pixi.js";

export default class Sword extends Container {
  blade: Graphics;
  accent: Graphics;
  shadow: Graphics;
  hilt: Graphics;

  id = "classic-sword";

  constructor(length: number = 40, width: number = 5, mainColor: number = 0xcccccc, accentColor: number = 0x555555) {
    super();

    // Shadow
    this.shadow = new Graphics();
    this.shadow.beginFill(0x000000, 0.3);
    this.shadow.moveTo(2, 2 - width / 2);
    this.shadow.lineTo(length + 2, 2 - width / 2);
    this.shadow.lineTo(length + 2, 2 + width / 2);
    this.shadow.lineTo(2, 2 + width / 2);
    this.shadow.closePath();
    this.shadow.endFill();
    this.addChild(this.shadow);

    // Blade with sharp tip
    this.blade = new Graphics();
    this.blade.beginFill(mainColor);
    this.blade.moveTo(0, -width / 2);
    this.blade.lineTo(length - width, -width / 2);
    this.blade.lineTo(length, 0);
    this.blade.lineTo(length - width, width / 2);
    this.blade.lineTo(0, width / 2);
    this.blade.closePath();
    this.blade.endFill();
    this.addChild(this.blade);

    // Accent stripe along flat side
    this.accent = new Graphics();
    this.accent.beginFill(accentColor);
    const stripeHeight = width / 4;
    this.accent.drawRect(0, -stripeHeight / 2, length - width, stripeHeight);
    this.accent.endFill();
    this.addChild(this.accent);

    // Hilt / base circle
    this.hilt = new Graphics();
    this.hilt.beginFill(0x222222);
    this.hilt.drawCircle(0, 0, width / 2);
    this.hilt.endFill();
    this.addChild(this.hilt);

    this.blade.pivot.set(0, 0);
    this.accent.pivot.set(0, 0);
    this.shadow.pivot.set(0, 0);
    this.hilt.pivot.set(0, 0);
  }
}

