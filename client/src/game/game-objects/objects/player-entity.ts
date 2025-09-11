import { Container, Graphics, Point } from "pixi.js";
import GameObject from "@core/game-object";
import { PlayerEntityServer } from "@shared/network/types/game/player";
import { PlayerUI } from "@hud/player-ui";
import GameCycle from "@game/managers/main/GameCycle";
import NetworkManager from "@network/managers/NetworkManager";
import { lerp } from "@core/lerp";
import PlayerEntityHand from "./player-entity/hand";
import lerpAngle from "@core/lerp-angle";
import PlayerAnimation from "./player-entity/player-animation";
import Sword from "./player-entity/hand-items/sword";
import { ItemBase } from "@core/types/items";
import Empty from "./player-entity/hand-items/empty";
import { syncItem } from "@network/sync/sync-inventory";

export default class PlayerEntity extends GameObject {
  private graphics: Graphics;
  playerUi: PlayerUI;
  targetX: number = 0;
  targetY: number = 0;
  leftHand: PlayerEntityHand;
  rightHand: PlayerEntityHand;
  targetRotation: number = 0;
  animation: PlayerAnimation;
  activity: "move" | "attack" | "idle" = "idle";
  activeSlot: ItemBase = new Empty();

  constructor(id: string, x: number = 0, y: number = 0) {
    super(id, x, y);

    this.playerUi = new PlayerUI("undefined", 70, 100);
    GameCycle.gameContainer.addChild(this.playerUi);
    this.playerUi.follow(this);

    this.graphics = new Graphics();
    this.graphics.beginFill(0x00ff00);
    this.graphics.drawCircle(0, 0, 14);
    this.graphics.endFill();
    this.addChild(this.graphics);

    this.leftHand = new PlayerEntityHand({ x: 0, y: -18 });
    this.rightHand = new PlayerEntityHand({ x: 0, y: 18 });
    this.addChild(this.leftHand);
    this.addChild(this.rightHand);

    this.leftHand.zIndex = -1;
    this.rightHand.zIndex = -1;

    this.animation = new PlayerAnimation(this);

    const canvasManager = GameCycle.canvasManager;
    if (canvasManager) {

      canvasManager.onKeyDownAdd((evt) => {
        if (evt.key == "i") {
          GameCycle.inventoryUI?.toggle();
        }

        if (evt.key == "1" || evt.key == "2") {
          NetworkManager.gameEventsController?.movement({ selectItemIndex: Number(evt.key) - 1 });
        }

        if (evt.key == "q") {
          NetworkManager.gameEventsController?.movement({ useItem: { itemAbility: 0 } });
        }
      });

      canvasManager.onMouseClickAdd((event) => {
        const canvasBounds = GameCycle.pixiApplication!.view.getBoundingClientRect();
        const mouseX = event.clientX - canvasBounds.left;
        const mouseY = event.clientY - canvasBounds.top;
        const point = new Point(mouseX, mouseY);
        const worldPos = GameCycle.gameContainer.toLocal(point);
        GameCycle.targetPointer.follow(worldPos.x, worldPos.y);
        NetworkManager.gameEventsController?.movement({ position: { x: worldPos.x, y: worldPos.y } });
      });
    }
  }

  holdItem(item: ItemBase) {
    if (item.id == this.activeSlot.id)
      return;

    this.activeSlot = item;
  }

  update(delta: number): void {
    this.playerUi.update();
    this.x = lerp(this.x, this.targetX, 0.2 * delta);
    this.y = lerp(this.y, this.targetY, 0.2 * delta);
    this.rotation = lerpAngle(this.rotation, this.targetRotation, 0.2 * delta);
    this.animation.update(delta);
  }

  updateNetworkServer(data: PlayerEntityServer) {
    this.targetX = data.position.x;
    this.targetY = data.position.y;
    this.targetRotation = data.angle;
    this.playerUi.setHp(data.hp);

    if (this.activity != data.activity) {
      this.activity = data.activity;
      switch (data.activity) {
        case "idle":
          this.animation.playStay();
          break;
        case "move":
          this.animation.playIdle();
          break;
        case "attack":
          this.animation.playAttack();
          break;
      }
    }

    if (this.activeSlot.id == data.hands.activeSlotItem.id) {
      //just update network of item
    } else {
      this.rightHand.removeChild(this.activeSlot);

      this.activeSlot = syncItem(data.hands.activeSlotItem);
      this.rightHand.addChild(this.activeSlot);
    }
  }
}

