import { Socket } from "socket.io";


export default class Controller {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  setupRecv<T>(socket: Socket, eventName: string, cb: (socket: Socket, data: T) => void) {
    socket.on(`${this.path}:${eventName}`, (data: T) => {
      cb(socket, data);
    });
  }

  emit<T>(socket: Socket, eventName: string, data: T) {
    socket.emit(`${this.path}:${eventName}`, data);
  }

}


