import type p5 from "p5";
import { assets } from "./assets";
import game from "./game";

export default class Bird {
  pos = { x: 0, y: 0 };
  rotation = 0;
  width = 67;
  height = 51;
  sprite = undefined;
  velocity = 0;
  maxVelocity = 500;
  gravity = 2200;
  jump = 550;
  isAlive = true;
  drawHitbox = false;
  hitRadius = 27;
  previousPos = this.pos.x;

  update(p: p5, deltaSec: number) {
    this.velocity += this.gravity * deltaSec;
    this.velocity = Math.min(this.velocity, this.maxVelocity);
    if (game.keys.space.isPressed && this.isAlive) {
      this.velocity = -this.jump;
      game.playSound(assets.sound.wing);
    }
    this.pos.y += this.velocity * deltaSec;

    this.pos.y = p.constrain(
      this.pos.y,
      this.height / 2,
      p.height - this.height / 2 - 90
    );
    if (
      this.pos.y == this.height / 2 ||
      this.pos.y == p.height - this.height / 2 - 90
    ) {
      this.velocity = 0;
    }

    if (this.velocity < 0) {
      this.rotation = -30;
    } else if (this.velocity === this.maxVelocity) {
      this.rotation = p.constrain(this.rotation + 400 * deltaSec, -35, 90);
    }

    if (this.pos.y >= p.height - this.height / 2 - 90) {
      this.isAlive = false;
      this.rotation = 90;
    }

    let dead;
    for (let i = 0; i < game.pipes.length; i++) {
      dead = game.checkCollision(p, this, game.pipes[i]);
      if (dead) break;
    }
    if (dead) this.isAlive = false;

    this.previousPos = this.pos.x;
  }
  draw(p: p5) {
    p.push();
    p.stroke(0);
    p.strokeWeight(4);
    p.fill(0, 0, 0, 0);
    p.imageMode(p.CENTER);
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.rotation);
    p.image(assets.image.birdSprite, 0, 0, this.width, this.height);

    if (this.drawHitbox) p.circle(0, 0, 2 * this.hitRadius);
    p.pop();
  }
}
