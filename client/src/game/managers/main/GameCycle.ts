import { Application } from "pixi.js";

class GameCycle {
  pixiApplication: Application | null = null;

  setup() {
    const canvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;

    this.pixiApplication = new Application({
      canvas: canvasElement
    });

    console.log(this.pixiApplication);
  }
}

export default new GameCycle();
