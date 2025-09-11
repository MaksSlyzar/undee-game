type KeyCallback = (event: KeyboardEvent) => void;
type MouseCallback = (event: MouseEvent) => void;

export default class CanvasManager {
  private keyDownCallbacks: KeyCallback[] = [];
  private mouseClickCallbacks: MouseCallback[] = [];

  constructor(private element: HTMLElement | Window = window) {
    window.addEventListener("keydown", this.onKeyDown);
    this.element.addEventListener("click", this.onMouseClick);
  }

  private onKeyDown = (event: Event) => {
    const e = event as KeyboardEvent;
    this.keyDownCallbacks.forEach(cb => cb(e));
  };

  private onMouseClick = (event: Event) => {
    const e = event as MouseEvent;
    this.mouseClickCallbacks.forEach(cb => cb(e));
  };

  onKeyDownAdd(callback: KeyCallback) {
    this.keyDownCallbacks.push(callback);
  }

  onMouseClickAdd(callback: MouseCallback) {
    this.mouseClickCallbacks.push(callback);
  }

  destroy() {
    this.element.removeEventListener("keydown", this.onKeyDown);
    this.element.removeEventListener("click", this.onMouseClick);
    this.keyDownCallbacks = [];
    this.mouseClickCallbacks = [];
  }
}

