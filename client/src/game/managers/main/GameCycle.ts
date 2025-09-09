import { Application, Container, Sprite } from "pixi.js";
import AssetManager from "../assets/AssetsManager";
import setupAssets from "../assets/setup-assets";
import TileMap from "@game/game-objects/map/Tilemap";
import GameObject from "@core/game-object";
import CanvasManager from "../events/canvas-manager";
import Camera from "@game/game-objects/map/camera";
class GameCycle {
  pixiApplication: Application | null = null;
  assetsManager: AssetManager | null = null;
  map: TileMap | null = null;
  entities: Record<string, GameObject> = {};
  canvasManager: CanvasManager | null = null;
  gameContainer: Container = new Container();
  camera: Camera | null = null;

  setupGameObjects() {

    this.map = new TileMap(100, 100, 32);
    this.gameContainer.addChild(this.map);

    this.pixiApplication?.stage.addChild(this.gameContainer);

    if (this.pixiApplication && this.gameContainer) {
      this.camera = new Camera(this.gameContainer,
        this.pixiApplication.canvas.width,
        this.pixiApplication.canvas.height
      );
    }

    this.startGameLoop();
  }

  setup() {
    this.assetsManager = new AssetManager();
    this.pixiApplication = new Application();
    this.pixiApplication.init({ resizeTo: window, backgroundColor: 0x00000 })
      .then(() => {
        const gameView = document.getElementById("game-screen") as HTMLDivElement;
        if (this.pixiApplication) {
          gameView.appendChild(this.pixiApplication.canvas);
          this.canvasManager = new CanvasManager(this.pixiApplication.canvas);
        }
        if (this.assetsManager)
          setupAssets(this.assetsManager)
            .then(() => this.setupGameObjects());
      })
  }

  startGameLoop() {
    this.pixiApplication?.ticker.add((delta) => {
      // Update all entities
      Object.values(this.entities).forEach(entity => entity.update?.(delta.deltaTime));

      // Update camera
      this.camera?.update();
    });
  }
}

export default new GameCycle();

