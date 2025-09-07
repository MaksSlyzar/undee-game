import GuiComponent from "@core/guiComponent";

class GameScreen extends GuiComponent {
  constructor() {
    super(document.getElementById("game-screen") as HTMLDivElement);
  }
}

export default GameScreen;


