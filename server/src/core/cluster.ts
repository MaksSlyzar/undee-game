import GameObject from "@core/game-object";
import { generateId } from "@core/generateId";
import Player from "./player";
import { InitServer } from "@shared/network/types/game/init";
import NetworkManager from "@network/managers/NetworkManager";
import PlayerEntity from "@game/game-objects/PlayerEntity";
import { UpdateServer } from "@shared/network/types/game/update";
import ClassicSword from "@game/game-objects/items/weapons/classic-sword";
import { Socket } from "socket.io";

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

    NetworkManager.gameEventsController?.init(
      player.socket,
      this.initNetwork(player)
    );

    entity.start(this);
  }

  initNetwork(player: Player): InitServer {
    const playerEntityId = player.playerEntity?.id;
    return {
      playerId: playerEntityId ?? "0000",
    };
  }

  updateNetwork(socketId: string): UpdateServer {
    const entitiesData = Object.values(this.entities).map(entity =>
      entity.networkUpdate()
    );

    let playerData = null;
    for (const playerId in this.players) {
      const player = this.players[playerId];
      if (player.socket.id === socketId && player.playerEntity) {
        playerData = player.playerEntity.networkUpdate(true);
      }
    }

    return {
      cluster: {
        entities: entitiesData,
        id: this.id,
        playerEntity: playerData,
      },
    };
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
    for (const entity of Object.values(this.entities)) {
      entity.update(delta);
    }

    for (const player of Object.values(this.players)) {
      const updateData = this.updateNetwork(player.socket.id);
      NetworkManager.gameEventsController?.update(player.socket, updateData);
    }
  }
}

