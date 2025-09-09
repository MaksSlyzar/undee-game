import GameObject from "@core/game-object";
import { generateId } from "@core/generateId";
import Player from "./player";
import { InitNetworkEmi } from "@network/types/game/init";
import NetworkManager from "@network/managers/NetworkManager";
import PlayerEntity from "@game/game-objects/PlayerEntity";
import { UpdateNetworkEmi } from "@network/types/game/update";
import GameEventsController from "@network/controllers/GameEventsController";

export default class Cluster {
  id: string;
  name: string;
  entities: Record<string, GameObject<any>> = {};
  players: Record<string, Player> = {};

  constructor(name: string) {
    this.id = generateId();
    this.name = name;
  }

  addPlayer(player: Player) {
    const entity = new PlayerEntity(player);
    this.entities[entity.id] = entity;
    player.playerEntity = entity;
    NetworkManager.gameEventsController?.init(player.socket, this.initNetwork(player));
    entity.start(this);
  }

  initNetwork(player: Player): InitNetworkEmi {
    const playerEntityId = player.playerEntity?.id;
    return {
      cluster: {
        entities: [],
        id: this.id,
        map: null
      },
      playerId: playerEntityId ? playerEntityId : "0000"
    }
  }

  updateNetwork(): UpdateNetworkEmi {
    const entitiesData = [];
    for (let entityId in this.entities) {
      entitiesData.push(this.entities[entityId].networkUpdate());
    }
    return {
      cluster: {
        entities: entitiesData,
        id: this.id
      }
    }
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

    const updateData = this.updateNetwork();
    for (let playerId in this.players) {
      const player = this.players[playerId];
      NetworkManager.gameEventsController?.update(player.socket, updateData);
    }
  }
}

