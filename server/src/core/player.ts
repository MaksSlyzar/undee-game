import { Socket } from "socket.io";
import { generateId } from "./generateId";
import PlayerEntity from "@game/game-objects/PlayerEntity";

export default class Player {
  public id: string;
  public socket: Socket;
  public playerEntity: PlayerEntity | null;

  constructor(socket: Socket) {
    this.socket = socket;
    this.id = generateId();
    this.playerEntity = null;
  }
}

