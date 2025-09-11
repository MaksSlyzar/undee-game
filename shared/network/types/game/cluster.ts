import { PlayerUpdateServer } from "./player";

export type ClusterInitServer = {
  id: string;
  entities: Array<PlayerUpdateServer>;
  map: null;
};

export type ClusterUpdateServer = {
  id: string;
  entities: Array<PlayerUpdateServer>;
  playerEntity: PlayerUpdateServer | null;
};

