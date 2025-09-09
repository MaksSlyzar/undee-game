import GameObject from "@core/game-object";
import PlayerEntity from "@game/game-objects/objects/player-entity";
import GameCycle from "@game/managers/main/GameCycle";
import NetworkManager from "@network/managers/NetworkManager";
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
    GameCycle.gameContainer.addChild(entity);
    console.log(data.id, NetworkManager.gameEventsController?.playerId)
    if (data.id == NetworkManager.gameEventsController?.playerId) {
      GameCycle.camera?.follow(entity);
      console.log("follow")
    }
  }

  entity.updateNetworkRecv(data);
}
