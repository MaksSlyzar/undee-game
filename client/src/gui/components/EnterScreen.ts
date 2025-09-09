import GuiComponent from "@core/guiComponent";
import GameCycle from "@game/managers/main/GameCycle";
import GuiManager from "@gui/GuiManager";
import NetworkManager from "@network/managers/NetworkManager";

class EnterScreen extends GuiComponent {
  constructor() {
    super(document.getElementById("enter-screen") as HTMLDivElement);

    const btn = document.getElementById("enter-game-btn") as HTMLButtonElement;
    btn.onclick = () => this.enterGame();
  }

  enterGame() {
    NetworkManager.gameStatusController?.changeGameStatus({ type: "connect" });
    // GuiManager.changeTo("game-screen");
    //
    window.addEventListener("DOMContentLoaded", () => {
      GameCycle.setup();
    });
  }
}

export default EnterScreen;

