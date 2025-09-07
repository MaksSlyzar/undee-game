import GuiComponent from "@core/guiComponent";
import GuiManager from "@gui/GuiManager";

class EnterScreen extends GuiComponent {
  constructor() {
    super(document.getElementById("enter-screen") as HTMLDivElement);

    const btn = document.getElementById("enter-game-btn") as HTMLButtonElement;
    btn.onclick = () => this.enterGame();
  }

  enterGame() {
    GuiManager.changeTo("game-screen");
  }
}

export default EnterScreen;

