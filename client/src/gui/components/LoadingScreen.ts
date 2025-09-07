import GuiComponent from "@core/guiComponent";

class LoadingScreen extends GuiComponent {
  constructor() {
    super(document.getElementById("loading-screen") as HTMLDivElement);
  }
}

export default LoadingScreen;
