import Matter from "matter-js";

export default abstract class GameObject<NwType> {
  public id: string;
  public body?: Matter.Body;

  constructor(id: string) {
    this.id = id;
  }

  abstract start(): void;

  abstract update(delta: number): void;

  abstract networkUpdate(): NwType;
}

