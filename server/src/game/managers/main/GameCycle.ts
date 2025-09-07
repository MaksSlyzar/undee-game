import Matter from "matter-js";
import Cluster from "@core/cluster";

export default class GameCycle {
  private engine: Matter.Engine;
  private clusters: Record<string, Cluster> = {};
  private lastTime: number = 0;
  private running: boolean = false;

  constructor() {
    this.engine = Matter.Engine.create();
    this.start();
  }

  addCluster(cluster: Cluster) {
    this.clusters[cluster.id] = cluster;
  }

  removeCluster(clusterId: string) {
    delete this.clusters[clusterId];
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

    for (const cluster of Object.values(this.clusters)) {
      cluster.update(delta);
    }

    setImmediate(() => this.loop());
  }

  getEngine() {
    return this.engine;
  }
}

