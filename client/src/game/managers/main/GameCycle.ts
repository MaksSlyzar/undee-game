import { Application, Sprite } from "pixi.js";
import AssetManager from "../assets/AssetsManager";
import setupAssets from "../assets/setup-assets";
import TileMap from "@game/game-objects/map/Tilemap";
import GameObject from "@core/game-object";

class GameCycle {
  pixiApplication: Application | null = null;
  assetsManager: AssetManager | null = null;
  map: TileMap | null = null;
  entities: Record<string, GameObject> = {};

  setupGameObjects() {
    const sprite = this.assetsManager?.getSprite("tile");
    if (sprite && this.pixiApplication) {
      this.pixiApplication.stage.addChild(sprite);
    }
    this.map = new TileMap(100, 100, 32);
    this.pixiApplication?.stage.addChild(this.map);
  }

  setup() {
    this.assetsManager = new AssetManager();
    this.pixiApplication = new Application();
    this.pixiApplication.init({
      resizeTo: window,
      backgroundColor: 0x00000
    }).then(() => {
      const gameView = document.getElementById("game-screen") as HTMLDivElement;
      if (this.pixiApplication) {
        gameView.appendChild(this.pixiApplication.canvas);
      }
      if (this.assetsManager)
        setupAssets(this.assetsManager).then(() => this.setupGameObjects());
    })
  }
}

export default new GameCycle();
