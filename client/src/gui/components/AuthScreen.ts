import GuiComponent from "@core/guiComponent";
import NetworkManager from "@network/managers/NetworkManager";

class AuthScreen extends GuiComponent {
  constructor() {
    super(document.getElementById("auth-screen") as HTMLDivElement);

    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
    loginBtn.onclick = () => this.login();
  }

  login() {
    const nicknameEl = document.getElementById("nickname") as HTMLInputElement;

    NetworkManager.authController?.login({ username: nicknameEl.value });
  }
}

export default AuthScreen;
