import PlayerEntity from "../player-entity";

type AnimationFunction = (delta: number) => void;

export default class PlayerAnimation {
  player: PlayerEntity;
  private currentAnimation: AnimationFunction | null = null;
  private phase: number = 0;

  constructor(player: PlayerEntity) {
    this.player = player;
    this.setAnimation(this.stay); // start with stay animation
  }

  update(delta: number) {
    this.phase += delta;
    if (this.currentAnimation) this.currentAnimation(delta);
  }

  setAnimation(animation: AnimationFunction) {
    this.phase = 0;
    this.currentAnimation = animation;
  }

  private toFirstPosition() {
    this.player.leftHand.backPosition();
    this.player.rightHand.backPosition();
  }

  private stay: AnimationFunction = () => {
    if (!this.player.leftHand || !this.player.rightHand) return;
    this.player.leftHand.x = 0;
    this.player.rightHand.x = 0;
  };

  private idleSwing: AnimationFunction = (delta) => {
    if (!this.player.leftHand || !this.player.rightHand) return;
    const speed = 0.1;
    const amplitude = 5;
    const offset = Math.sin(this.phase * speed) * amplitude;
    this.player.leftHand.x = -offset;
    this.player.rightHand.x = offset;
  };


  private attack: AnimationFunction = (delta) => {
    if (!this.player.leftHand || !this.player.rightHand || !this.player.activeSlot) return;

    const radius = 12;
    const duration = 0.6;
    const progress = Math.min(this.phase / 60 / duration, 1);

    const startAngle = -Math.PI / 4;
    const endAngle = Math.PI / 4;

    // Розрахунок кута правої руки
    let angle: number;
    if (progress <= 0.5) {
      const p = progress / 0.5;
      angle = startAngle + (endAngle - startAngle) * p;
    } else {
      const p = (progress - 0.5) / 0.15;
      angle = endAngle + (startAngle - endAngle) * p;
    }

    this.player.rightHand.x = radius * Math.cos(angle);
    this.player.rightHand.y = -radius * Math.sin(angle);

    const leftRadius = radius;
    this.player.leftHand.x = -leftRadius * Math.cos(angle * 0.8);
    // this.player.leftHand.y = -leftRadius * Math.sin(angle * 0.8);

    this.player.activeSlot.rotation = -angle - Math.PI / 2;

    if (progress >= 1) {
      this.player.activeSlot.rotation = 0;
      this.toFirstPosition();
    }
  };

  public playAttack() {
    this.setAnimation(this.attack);
  }

  public playIdle() {
    this.setAnimation(this.idleSwing);
  }

  public playStay() {
    this.setAnimation(this.stay);
  }
}

