import Matter from "matter-js";
import Cluster from "@core/cluster";
import ClusterManager from "../cluster/ClusterManager";

class GameCycle {
  private engine: Matter.Engine;
  private lastTime: number = 0;
  private running: boolean = false;
  public clusterManager: ClusterManager = new ClusterManager();

  constructor() {
    this.engine = Matter.Engine.create();
    this.engine.gravity.y = 0;
    this.start();
  }

  start() {
    this.running = true;
    this.lastTime = Date.now();
    this.loop();
  }

  stop() {
    this.running = false;
  }

  private loop() {
    if (!this.running) return;

    const now = Date.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    Matter.Engine.update(this.engine, delta);

    this.clusterManager.update(delta);

    setTimeout(() => this.loop(), 30);
  }

  getEngine() {
    return this.engine;
  }
}

export default new GameCycle();
