import type { Vector } from "p5";
import type p5 from "p5";
import { assets } from "./assets";

export const pipeSpeed = 225;
const speed = pipeSpeed;

export class Pipe {
  p: p5;
  pos: Vector;
  scale: number;
  width: number;
  height: number;
  gap: number;
  drawHitbox: boolean;
  hitboxWidth: number;
  previousPos: number;

  constructor(p: p5) {
    this.p = p;
    this.pos = p.createVector(
      p.width + 80,
      p.random(p.height / 4, p.height - p.height / 3)
    );
    this.scale = 0.4;
    this.width = 1400 * this.scale;
    this.height = 1400 * this.scale;
    this.gap = 155;
    this.drawHitbox = false;
    this.hitboxWidth = this.width * 0.175;
    this.previousPos = this.pos.x;
  }

  update(deltaSec: number) {
    this.previousPos = this.pos.x;
    this.pos.x -= speed * deltaSec;
  }

  draw(p: p5) {
    p.push();
    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);
    p.fill(0, 0, 0, 0);
    p.stroke(0);
    p.strokeWeight(3);
    p.image(
      assets.image.pipeSpriteDown,
      this.pos.x,
      this.pos.y - this.height / 2 - this.gap / 2,
      this.width,
      this.height
    );
    p.image(
      assets.image.pipeSpriteUp,
      this.pos.x,
      this.pos.y + this.height / 2 + this.gap / 2,
      this.width,
      this.height
    );
    if (this.drawHitbox) {
      p.rect(
        this.pos.x - this.hitboxWidth / 2 + 50,
        this.pos.y + this.gap / 2,
        this.width,
        this.height
      );
    }
    p.pop();
  }
}

const pipeSpacing = 550;

export function updatePipes(p: p5, pipes: Pipe[]) {
  if (p.abs(p.width + 70 - pipes[pipes.length - 1].pos.x) >= pipeSpacing) {
    pipes.push(new Pipe(p));
  }
  if (pipes[0].pos.x < -100) {
    pipes.shift();
  }
}
