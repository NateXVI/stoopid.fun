import type { Sketch } from "p5-svelte";
import type p5 from "p5";
import { initializeAssets } from "./assets";
import game from "./game";
import * as scenes from "./scenes";

const sketch: Sketch = (p) => {
  //
  let canvas: ReturnType<p5["createCanvas"]>;
  let deltaSec = 0;

  p.preload = () => {
    initializeAssets(p);
  };
  p.setup = () => {
    p.angleMode(p.DEGREES);
    const [width, height] = game.getWindowSize(p);
    canvas = p.createCanvas(width, height);
    canvas.id("flappybird-canvas");
    canvas.mouseClicked(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
    // make the images look good
    (canvas as any).drawingContext.imageSmoothingEnabled = false; // eslint-disable-line @typescript-eslint/no-explicit-any
    p.noSmooth();
    p.background(0);
  };
  p.draw = () => {
    deltaSec = p.deltaTime / 1000;

    switch (game.screen) {
      case "titleScreen":
        scenes.drawBackground(p, deltaSec);
        scenes.drawGround(p, true, deltaSec);
        scenes.drawTitleScreen(p, deltaSec);
        break;
      case "gameScreen":
        game.update(p, deltaSec);
        game.draw(p, deltaSec);
        game.drawScore(p);
        break;
      case "scoreScreen":
        game.bird.update(p, deltaSec);
        game.draw(p, deltaSec);
        scenes.updateScoreScreen(p);
        scenes.drawScoreScreen(p);
        break;
    }
    game.keys.clearKeys();
  };

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      game.keys.space.press();
    }

    return false;
  };
  p.keyReleased = () => {
    if (p.keyCode === 32) {
      game.keys.space.release();
    }

    return false;
  };
  p.touchStarted = (touch) => {
    if (
      touch &&
      "pageY" in touch &&
      typeof touch.pageY === "number" &&
      touch?.pageY < p.height
    ) {
      game.keys.space.press();
    }
  };
  p.touchEnded = (touch) => {
    if (
      touch &&
      "pageY" in touch &&
      typeof touch.pageY === "number" &&
      touch?.pageY < p.height
    ) {
      game.keys.space.release();
    }
  };
  p.windowResized = () => {
    const [width, height] = game.getWindowSize(p);
    p.resizeCanvas(width, height);
  };
};

export default sketch;
