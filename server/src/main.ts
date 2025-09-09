import GameCycle from "@game/managers/main/GameCycle";
import NetworkManager from "@network/managers/NetworkManager";
NetworkManager.getServer();
GameCycle.start();
