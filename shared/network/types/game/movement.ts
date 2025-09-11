import { Vector2d } from "../../../core/types/vector-2d";

export type MovementClient = {
  position?: Vector2d;
  selectItemIndex?: number;
  useItem?: UseItemClient;
};

export type UseItemClient = {
  itemAbility: number;
}
