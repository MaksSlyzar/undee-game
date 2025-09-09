import Matter from "matter-js";
import Cluster from "./cluster";

export default abstract class GameObject<NwType> {
  public id: string;
  public body?: Matter.Body;

  constructor(id: string) {
    this.id = id;
  }

  abstract start(cluster: Cluster): void;

  abstract update(delta: number): void;

  abstract networkUpdate(): NwType;
}

