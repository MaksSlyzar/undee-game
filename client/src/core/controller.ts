import NetworkManager from "@network/managers/NetworkManager";

export default class Controller {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  setupRecv<T>(eventName: string, cb: (data: T) => void) {
    NetworkManager.on(`${this.path}:${eventName}`, (data: T) => {
      cb(data);
    });
  }

  emit<T>(eventName: string, data: T) {
    NetworkManager.send(`${this.path}:${eventName}`, data);
  }
}

