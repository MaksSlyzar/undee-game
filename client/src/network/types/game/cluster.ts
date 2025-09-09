import { GameObjectBaseNetwork, PlayerEntityNetworkRecv } from "./game-object";

export type ClusterInitNetworkRecv = {
  id: string;
  entities: Array<GameObjectBaseNetwork>;
  map: null,
}

export type ClusterUpdateNetworkRecv = {
  id: string;
  entities: Array<GameObjectBaseNetwork>,
}

