import Controller from "@core/controller";
import GuiManager from "@gui/GuiManager";
import { NetworkLoginStatusTypeRecv, NetworkLoginTypeEmi } from "@network/types/auth/auth";

class AuthController extends Controller {
  private authenticated: boolean = false;

  constructor() {
    super("auth");

    this.setupRecv("login-status", (data: NetworkLoginStatusTypeRecv) => this.authStatus(data));
  }

  public getIsAuth() {
    return this.authenticated;
  }

  authStatus(data: NetworkLoginStatusTypeRecv) {
    if (data.connected == true) {
      this.authenticated = true;
      GuiManager.changeTo("enter-screen");
    }
  }

  login(data: NetworkLoginTypeEmi) {
    this.emit("login", data);
  }
}

export default AuthController;
