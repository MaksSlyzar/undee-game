import GameObject from "@core/game-object";
import { PlayerUpdateNetworkEmi } from "./player";

export type ClusterUpdateNetworkEmi = {
  id: string;
  entities: PlayerUpdateNetworkEmi,
}
