import GameObject from "@core/game-object";
import { PlayerUpdateNetworkEmi } from "./player";

export type ClusterInitNetworkEmi = {
  id: string;
  entities: Array<PlayerUpdateNetworkEmi>;
  map: null,
}

export type ClusterUpdateNetworkEmi = {
  id: string;
  entities: Array<PlayerUpdateNetworkEmi>,
}
