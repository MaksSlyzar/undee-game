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
    if (!this.player.leftHand || !this.player.rightHand) return;
    const speed = 0.2;
    const amplitude = 10;
    const leftOffset = Math.sin(this.phase * speed * Math.PI) * amplitude;
    const rightOffset = Math.sin(this.phase * speed * Math.PI / 2) * (amplitude / 2);
    this.player.leftHand.x = -leftOffset;
    this.player.rightHand.x = rightOffset;
    if (this.phase * speed > Math.PI * 2) this.setAnimation(this.stay);
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

