import GameObject from "@core/game-object";
import PlayerEntity from "@game/game-objects/objects/player-entity";
import GameCycle from "@game/managers/main/GameCycle";
import { GameObjectNetworkRecv, PlayerEntityNetworkRecv } from "@network/types/game/game-object";

export function syncGameObjects(data: GameObjectNetworkRecv[]) {
  for (let objectId in data) {
    const object = data[objectId];
    switch (object.type) {
      case "player-entity":
        syncPlayerEntity(object as PlayerEntityNetworkRecv);
        break;
    }
  }
}

function syncPlayerEntity(data: PlayerEntityNetworkRecv) {
  let entity: PlayerEntity | null = null;
  for (let objectId in GameCycle.entities) {
    const object = GameCycle.entities[objectId];
    if (objectId == data.id) {
      entity = object as PlayerEntity;
    }
  }

  if (entity == null) {
    entity = new PlayerEntity(data.id, data.position.x, data.position.y);
    GameCycle.entities[data.id] = entity;
    GameCycle.pixiApplication?.stage.addChild(entity);
  }

  entity.updateNetworkRecv(data);
}
