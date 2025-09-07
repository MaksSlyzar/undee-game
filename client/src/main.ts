import GameCycle from "@game/managers/main/GameCycle";
import GuiManager from "@gui/GuiManager";
import NetworkManager from "@network/managers/NetworkManager";

GameCycle.setup();
NetworkManager.on("connect", () => {
  GuiManager.setup();
})
