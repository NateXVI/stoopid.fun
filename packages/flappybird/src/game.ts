import type { Howl } from "howler";
import type p5 from "p5";
import { assets } from "./assets";
import Bird from "./brid";
import { Pipe } from "./pipe";
import { drawBackground, drawGround, drawStaticBackground } from "./scenes";

const hightScoreKey = "flappy-highscore";
const savedScore =
  typeof window !== "undefined"
    ? parseInt(window.localStorage.getItem(hightScoreKey) ?? "0")
    : 0;

export const game = {
  screen: "titleScreen" as "titleScreen" | "gameScreen" | "scoreScreen",
  bird: new Bird(),
  pipes: [] as Pipe[],
  score: 0,
  highScore: isNaN(savedScore) ? 0 : savedScore,
  newBest: false,
  startTime: 0,
  endTime: 0,
  muted:
    typeof window !== "undefined"
      ? localStorage.getItem("flappy-muted") === "true"
      : false,
  keys: {
    space: {
      isUp: true,
      isDown: false,
      isPressed: false,
      isReleased: false,
      press: () => {
        game.keys.space.isPressed = true;
        game.keys.space.isReleased = false;
        game.keys.space.isDown = true;
        game.keys.space.isUp = false;
      },
      release: () => {
        game.keys.space.isPressed = false;
        game.keys.space.isReleased = true;
        game.keys.space.isDown = false;
        game.keys.space.isUp = true;
      },
    },
    clearKeys: () => {
      game.keys.space.isPressed = false;
      game.keys.space.isReleased = false;
    },
  },
  start: (p: p5) => {
    game.screen = "gameScreen";
    game.bird.isAlive = true;
    game.startTime = p.millis();
    game.bird.pos.x = p.width / 3;
    game.bird.pos.y = p.height * 0.25;
    game.score = 0;
    game.pipes = [new Pipe(p)];
    game.bird.rotation = 0;
    game.bird.velocity = 0;

    game.playSound(assets.sound.swoosh);
  },
  end: (p: p5) => {
    game.screen = "scoreScreen";
    game.bird.isAlive = false;
    game.bird.velocity = -game.bird.jump * 1.75;
    game.endTime = p.millis();

    game.playSound(assets.sound.die);
    game.playSound(assets.sound.hit);

    if (game.highScore < game.score) {
      game.highScore = game.score;
      window.localStorage.setItem(hightScoreKey, game.highScore.toString());
      game.newBest = true;
    } else {
      game.newBest = false;
    }
    // leaderboard.saveScore(game.score);
  },
  update(p: p5, deltaSec: number) {
    const bird = game.bird;
    bird.pos.x = p.width / 3;
    for (const pipe of game.pipes) {
      if (pipe.pos.x < bird.pos.x && pipe.previousPos >= bird.pos.x) {
        game.score += 1;
        game.playSound(assets.sound.point);
      }
    }

    if (p.millis() - game.startTime < 1200) {
      bird.pos.x = p.lerp(
        -121,
        p.width / 4,
        (p.millis() - game.startTime) / 1000
      );
    } else {
      game.bird.update(p, deltaSec);
      for (const pipe of game.pipes) {
        pipe.update(deltaSec);
      }
      game.updatePipes(p);
      if (!game.bird.isAlive) game.end(p);
    }
  },
  draw(p: p5, deltaSec: number) {
    if (game.bird.isAlive) {
      drawBackground(p, deltaSec);
    } else {
      drawStaticBackground(p);
    }

    for (const pipe of game.pipes) {
      pipe.draw(p);
    }

    drawGround(p, game.bird.isAlive, deltaSec);
    game.bird.draw(p);
  },
  drawScore(p: p5) {
    p.push();
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(10 * game.uiScale);
    p.textFont(assets.font.score, 65 * game.uiScale);
    p.textAlign(p.CENTER);
    p.text(game.score, p.width / 2, 110 * game.uiScale);
    p.pop();
  },
  updatePipes: (p: p5) => {
    const pipeSpacing = 450;
    if (
      p.abs(p.width + 70 - game.pipes[game.pipes.length - 1].pos.x) >=
      pipeSpacing
    ) {
      game.pipes.push(new Pipe(p));
    }
    if (game.pipes[0].pos.x < -100) {
      game.pipes.shift();
    }
  },
  playSound: (sound: Howl) => {
    if (!game.muted) sound.play();
  },
  checkCollision: (p: p5, bird: Bird, pipe: Pipe) => {
    const cx = bird.pos.x;
    const cy = bird.pos.y;
    const cr = bird.hitRadius;

    const left = pipe.pos.x - pipe.hitboxWidth / 2;
    const right = pipe.pos.x + pipe.hitboxWidth / 2;
    let top = pipe.pos.y + pipe.gap / 2;
    let bottom = p.height;

    let x = p.constrain(cx, left, right);
    let y = p.constrain(cy, top, bottom);

    let d = p.dist(cx, cy, x, y);

    if (d <= cr) return true;

    top = 0;
    bottom = pipe.pos.y - pipe.gap / 2;

    x = p.constrain(cx, left, right);
    y = p.constrain(cy, top, bottom);

    d = p.dist(cx, cy, x, y);

    if (d <= cr) return true;
    return false;
  },
  uiScale: 1,
  getWindowSize: (p: p5) => {
    const maxWindowWidth = 1200;
    const minWindowWidth = 300;
    const maxWindowHeight = 900;
    const minWindowHeight = 600;

    const width = p.constrain(p.windowWidth, minWindowWidth, maxWindowWidth);
    const height = p.constrain(
      p.windowHeight,
      minWindowHeight,
      maxWindowHeight
    );

    game.uiScale = Math.min(1, (width + minWindowWidth) / maxWindowWidth);
    return [width, height];
  },
};

if (typeof window !== "undefined") {
  document.addEventListener("flappy-sound-toggle", (e) => {
    if (
      "detail" in e &&
      typeof e.detail === "object" &&
      e.detail !== null &&
      "sound" in e.detail &&
      typeof e.detail.sound === "boolean"
    ) {
      game.muted = !e.detail.sound;
      localStorage.setItem("flappy-muted", game.muted.toString());
    }
  });
}

export default game;
