import { Vector2d } from "@core/types/vector-2d"

export type PlayerNetworkEmi = {
  position: Vector2d,
  id: string,
  name: string,
};


export interface PlayerUpdateNetworkEmi extends PlayerNetworkEmi {

};
