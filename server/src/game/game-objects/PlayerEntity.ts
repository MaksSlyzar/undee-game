import Cluster from "@core/cluster";
import GameObject from "@core/game-object";
import { generateId } from "@core/generateId";
import Player from "@core/player";
import GameCycle from "@game/managers/main/GameCycle";
import { MovementNetworkRecv } from "@network/types/game/movement";
import { PlayerUpdateNetworkEmi } from "@network/types/game/player";

import { Bodies, Body, Vector, World } from "matter-js";

class PlayerEntity extends GameObject<PlayerUpdateNetworkEmi> {
  player: Player;
  hp: number = 100;
  hpMax: number = 100;
  body: Body;
  activity: "move" | "attack" | "idle" = "idle";

  private targetPos: Vector | null = null;

  constructor(player: Player) {
    super(generateId());
    this.player = player;

    this.body = Bodies.circle(100, 200, 16, {
      restitution: 0.2,
      friction: 0.1,
      frictionAir: 0.05,
    });
  }

  start(cluster: Cluster): void {
    // add the body to Matter world (if GameCycle or physics manager exists)
    // Example:
    // Matter.World.add(GameCycle.physicsWorld, this.body);
    World.add(GameCycle.getEngine().world, this.body);
  }

  update(delta: number): void {
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


  networkUpdate(): PlayerUpdateNetworkEmi {
    return {
      id: this.id,
      name: "undefined",
      position: { x: this.body.position.x, y: this.body.position.y },
      type: "player-entity",
      hp: this.hp,
      hpMax: this.hpMax,
      angle: this.body.angle,
      activity: this.activity
    };
  }

  networkRecv(data: MovementNetworkRecv) {
    this.targetPos = { x: data.position.x, y: data.position.y };
  }
}

export default PlayerEntity;

