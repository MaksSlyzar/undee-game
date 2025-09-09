import { Vector2d } from "@core/types/vector-2d"
import { GameObjectNetworkEmi } from "./game-object";

export interface PlayerNetworkEmi extends GameObjectNetworkEmi {
  name: string;
  type: "player-entity"
};


export interface PlayerUpdateNetworkEmi extends PlayerNetworkEmi {

};
