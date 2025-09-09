import { Container, Graphics, Text } from "pixi.js";

export class PlayerUI extends Container {
  private nicknameText: Text;
  private hpBarBackground: Graphics;
  private hpBarFill: Graphics;

  private _maxHp: number;
  private _hp: number;
  private _nickname: string;

  constructor(nickname: string, hp: number, maxHp: number) {
    super();

    this._nickname = nickname;
    this._hp = hp;
    this._maxHp = maxHp;

    // Nickname text
    this.nicknameText = new Text(this._nickname, {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 0xffffff,
      stroke: 0x000000,
    });
    this.nicknameText.anchor.set(0.5, 1); // center align, bottom
    this.nicknameText.y = -10; // position above player
    this.addChild(this.nicknameText);

    // HP bar background
    this.hpBarBackground = new Graphics();
    this.hpBarBackground.beginFill(0x444444);
    this.hpBarBackground.drawRect(-25, 0, 50, 6);
    this.hpBarBackground.endFill();
    this.addChild(this.hpBarBackground);

    // HP bar fill
    this.hpBarFill = new Graphics();
    this.addChild(this.hpBarFill);

    this.updateHpBar();
  }

  setHp(hp: number) {
    this._hp = Math.max(0, Math.min(hp, this._maxHp));
    this.updateHpBar();
  }

  setNickname(nickname: string) {
    this._nickname = nickname;
    this.nicknameText.text = nickname;
  }

  private updateHpBar() {
    const ratio = this._hp / this._maxHp;
    this.hpBarFill.clear();
    this.hpBarFill.beginFill(0xff0000);
    this.hpBarFill.drawRect(-25, 0, 50 * ratio, 6);
    this.hpBarFill.endFill();
  }
}

