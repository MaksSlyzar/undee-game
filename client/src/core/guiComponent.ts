class GuiComponent {
  el: HTMLDivElement;

  constructor(el: HTMLDivElement) {
    this.el = el;
  }

  none() {
    this.el.style.display = "none";
  }

  show() {
    this.el.style.display = "block";
  }
}

export default GuiComponent;
