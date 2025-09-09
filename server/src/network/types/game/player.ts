import { Vector2d } from "@core/types/vector-2d"
import { GameObjectNetworkEmi } from "./game-object";

export interface PlayerNetworkEmi extends GameObjectNetworkEmi {
  name: string;
  type: "player-entity";
  hp: number;
  hpMax: number;
  angle: number;
  activity: "move" | "attack" | "idle"
};


export interface PlayerUpdateNetworkEmi extends PlayerNetworkEmi {

};
