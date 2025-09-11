import { Vector2d } from "../../../core/types/vector-2d";
import { PlayerEntityServer } from "./player";

export type GameObjectServer = {
  id: string;
  position: Vector2d;
};

export type GameObjectBaseServer = PlayerEntityServer;
