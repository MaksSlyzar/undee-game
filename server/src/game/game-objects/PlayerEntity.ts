import Cluster from "@core/cluster";
import GameObject from "@core/game-object";
import { generateId } from "@core/generateId";
import Player from "@core/player";
import GameCycle from "@game/managers/main/GameCycle";
import { MovementClient } from "@shared/network/types/game/movement";
import { PlayerUpdateServer } from "@shared/network/types/game/player";

import { Bodies, Body, Vector, World } from "matter-js";
import PlayerInventory from "./inventory/player-inventory";
import EmptyItem from "./items/empty-item";
import { ItemBase } from "@core/items/items";
import ClassicSword from "./items/weapons/classic-sword";

class PlayerEntity extends GameObject<PlayerUpdateServer> {
  player: Player;
  hp: number = 100;
  hpMax: number = 100;
  body: Body;
  activity: "move" | "attack" | "idle" = "idle";
  inventory: PlayerInventory;
  activeItemIndex: number = 0;
  activeItem: ItemBase;

  private targetPos: Vector | null = null;

  constructor(player: Player) {
    super(generateId());
    this.inventory = new PlayerInventory(this);
    this.player = player;

    this.body = Bodies.circle(100, 200, 16, {
      restitution: 0.2,
      friction: 0.1,
      frictionAir: 0.05,
    });

    this.activeItem = new EmptyItem(this);

    this.inventory.addItemToInventory(new ClassicSword(this));

    this.syncItemInventory(0);
  }

  start(cluster: Cluster): void {
    World.add(GameCycle.getEngine().world, this.body);
  }

  update(delta: number): void {
    this.activeItem.update();
    if (this.targetPos) {
      const speed = 2;
      this.activity = "move";

      const pos = this.body.position;
      const dir = Vector.sub(this.targetPos, pos);
      const dist = Vector.magnitude(dir);

      const angle = Math.atan2(dir.y, dir.x);
      this.body.angle = angle;

      if (dist > 6) {
        const normalized = Vector.normalise(dir);
        const velocity = Vector.mult(normalized, speed);
        Body.setVelocity(this.body, velocity);
      } else {
        Body.setVelocity(this.body, { x: 0, y: 0 });
        this.targetPos = null;
        this.activity = "idle";
      }
    }
  }

  networkUpdate(isOwn: boolean = false): PlayerUpdateServer {
    return {
      id: this.id,
      name: "undefined",
      position: { x: this.body.position.x, y: this.body.position.y },
      type: "player-entity",
      hp: this.hp,
      hpMax: this.hpMax,
      angle: this.body.angle,
      activity: this.activity,
      inventory: isOwn ? this.inventory.network() : null,
      hands: {
        activeSlotItem: this.activeItem.network(),
        activeItemIndex: this.activeItemIndex
      }
    };
  }

  syncItemInventory(itemIndex: number) {
    const activeItem = this.inventory.getItemByIndex(itemIndex);
    if (activeItem) {
      this.activeItemIndex = itemIndex;
      this.activeItem = activeItem;
    }
  }

  networkClient(data: MovementClient) {
    if (data.position)
      this.targetPos = { x: data.position.x, y: data.position.y };

    if (data.selectItemIndex !== undefined) {
      if (this.activeItemIndex != data.selectItemIndex) {
        this.syncItemInventory(data.selectItemIndex);
      }
    }

    if (data.useItem) {
      this.activeItem.networkClient(data.useItem);
    }
  }
}

export default PlayerEntity;

