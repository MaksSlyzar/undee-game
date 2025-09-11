import GameObject from "@core/game-object";
import PlayerEntity from "@game/game-objects/objects/player-entity";
import GameCycle from "@game/managers/main/GameCycle";
import NetworkManager from "@network/managers/NetworkManager";
import { GameObjectBaseServer } from "@shared/network/types/game/game-object";
import { PlayerEntityServer } from "@shared/network/types/game/player";

export function syncGameObjects(data: GameObjectBaseServer[]) {
  for (const object of data) {
    switch (object.type) {
      case "player-entity":
        syncPlayerEntity(object as PlayerEntityServer);
        break;
    }
  }
}

function syncPlayerEntity(data: PlayerEntityServer) {
  let entity: PlayerEntity | null = null;

  for (const objectId in GameCycle.entities) {
    const object = GameCycle.entities[objectId];
    if (objectId === data.id) {
      entity = object as PlayerEntity;
      break;
    }
  }

  if (entity === null) {
    entity = new PlayerEntity(data.id, data.position.x, data.position.y);
    console.log(data);
    GameCycle.entities[data.id] = entity;
    GameCycle.gameContainer.addChild(entity);

    console.log(data.id, NetworkManager.gameEventsController?.playerId);

    if (data.id === NetworkManager.gameEventsController?.playerId) {
      GameCycle.camera?.follow(entity);
    }
  }

  entity.updateNetworkServer(data);
}

