import GameObject from "@core/game-object";
import { generateId } from "@core/generateId";
import Player from "./player";

export default class Cluster {
  id: string;
  name: string;
  entities: Record<string, GameObject<any>> = {};
  players: Record<string, Player> = {};

  constructor(name: string) {
    this.id = generateId();
    this.name = name;
  }

  addEntity(entity: GameObject<any>) {
    this.entities[entity.id] = entity;
  }

  removeEntity(entityId: string) {
    delete this.entities[entityId];
  }

  getAllEntities(): GameObject<any>[] {
    return Object.values(this.entities);
  }

  update(delta: number): void {
    for (let entityId in this.entities) {
      const entity = this.entities[entityId];

      entity.update(delta);
    }
  }
}

