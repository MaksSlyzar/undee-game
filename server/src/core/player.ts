import { Socket } from "socket.io";
import { generateId } from "./generateId";

export default class Player {
  public id: string;
  public socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
    this.id = generateId();
  }
}

