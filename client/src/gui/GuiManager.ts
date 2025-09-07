import GuiComponent from "@core/guiComponent";
import AuthScreen from "./components/AuthScreen";
import LoadingScreen from "./components/LoadingScreen";
import EnterScreen from "./components/EnterScreen";
import GameScreen from "./components/GameScreen";

class GuiManager {
  components: Record<string, GuiComponent> = {};

  setup() {
    this.components["auth-screen"] = new AuthScreen();
    this.components["loading-screen"] = new LoadingScreen();
    this.components["enter-screen"] = new EnterScreen();
    this.components["game-screen"] = new GameScreen();

    this.changeTo("auth-screen");
  }

  changeTo(componentName: string) {
    for (let name in this.components) {

      if (name != componentName) {
        this.components[name].none();
      }

    }
    const component = this.components[componentName];
    component.show();
  }
}

export default new GuiManager();
