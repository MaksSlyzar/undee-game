import { Vector2d } from "@core/types/vector-2d";

export type GameObjectTypesNetworkRecv = "player-entity" | "box";

export interface GameObjectNetworkRecv {
  id: string,
  position: Vector2d,
  type: GameObjectTypesNetworkRecv
};

export interface PlayerEntityNetworkRecv extends GameObjectNetworkRecv {
  name: string,
  type: "player-entity"
};

export type GameObjectBaseNetwork = PlayerEntityNetworkRecv;
