import Controller from "@core/controller";
import GuiManager from "@gui/GuiManager";
import { LoginStatusServer, LoginClient } from "@shared/network/types/auth/auth";

class AuthController extends Controller {
  private authenticated: boolean = false;

  constructor() {
    super("auth");

    this.setupRecv(
      "login-status",
      (data: LoginStatusServer) => this.authStatus(data)
    );
  }

  public getIsAuth() {
    return this.authenticated;
  }

  private authStatus(data: LoginStatusServer) {
    if (data.connected) {
      this.authenticated = true;
      GuiManager.changeTo("enter-screen");
    }
  }

  public login(data: LoginClient) {
    this.emit("login", data);
  }
}

export default AuthController;

