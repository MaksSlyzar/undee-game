import { Container, Sprite } from "pixi.js";
import GameCycle from "@game/managers/main/GameCycle";

export default class TileMap extends Container {
  private rows: number;
  private cols: number;
  private tileSize: number;

  constructor(rows: number, cols: number, tileSize: number) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.tileSize = tileSize;

    this.build();
  }

  private build(): void {
    if (!GameCycle.assetsManager)
      return;

    const tex = GameCycle.assetsManager.get("tile");
    if (!tex) throw new Error("Tile texture not loaded: 'tile'");

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const sprite = new Sprite(tex);
        sprite.x = x * this.tileSize;
        sprite.y = y * this.tileSize;
        sprite.width = this.tileSize;
        sprite.height = this.tileSize;
        this.addChild(sprite);
      }
    }
  }
}

