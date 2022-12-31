import type p5 from "p5";
import { pipeSpeed } from "./pipe";
import { assets } from "./assets.ts";
import game from "./game";

let backgroundOffset = 0;
const backgroundSpeed = -25;
export const drawBackground = (p: p5, deltaSec: number) => {
  drawStaticBackground(p);
  backgroundOffset += backgroundSpeed * deltaSec;
  if (backgroundOffset <= -p.width) {
    backgroundOffset = 0;
  }
};

export const drawStaticBackground = (p: p5) => {
  p.push();
  p.image(assets.image.backgroundImage, backgroundOffset, 0, p.width, p.height);
  p.image(
    assets.image.backgroundImage,
    backgroundOffset + p.width,
    0,
    p.width,
    p.height
  );
  p.pop();
};

let groundOffset = 0;
export const drawGround = (p: p5, birdAlive = false, deltaSec: number) => {
  const speed = pipeSpeed;
  const scale = 0.25;
  const w = assets.image.groundImage.width * scale;
  const h = assets.image.groundImage.height * scale;

  p.push();
  p.imageMode(p.CORNER);
  for (let i = 0; i < 7; i++) {
    p.image(
      assets.image.groundImage,
      i * w + groundOffset - i,
      p.height - 90,
      w,
      h
    );
  }
  p.pop();

  if (birdAlive) {
    groundOffset -= speed * deltaSec;
    if (groundOffset <= -w) {
      groundOffset = groundOffset + w;
    }
  }
};

let titleTextScale = 0;
const titleTextDuration = 1;

export const drawTitleScreen = (p: p5, deltaSec: number) => {
  p.push();
  p.imageMode(p.CENTER);
  const fl = assets.image.flappyLogo;
  const f = p.createVector(fl.width, fl.height);
  const scale = p.width >= 1000 ? 0.5 : p.width >= 600 ? 0.75 : 1.25;
  const fScale = scale * game.uiScale * (p.width / f.x);
  p.image(fl, p.width / 2, p.height / 3, f.x * fScale, f.y * fScale);
  p.textFont(assets.font.titleScreen);
  p.textAlign(p.CENTER);
  p.rectMode(p.CENTER);
  p.fill(255);
  p.stroke(0);
  p.strokeWeight((7 * titleTextScale + 1) * (fScale * 2.5));
  p.textSize(40 * titleTextScale * (fScale * 2.5));
  p.text("Press Space to Start", p.width / 2, p.height / 2);
  titleTextScale = p.constrain(
    titleTextScale + titleTextDuration * deltaSec,
    0,
    1
  );
  p.pop();

  if (titleTextScale >= 1 && game.keys.space.isPressed) {
    game.start(p);
  }
};

const scoreScreen = {
  animationDuration: 800,
  x: 0,
  scale: 5,
};

export const updateScoreScreen = (p: p5) => {
  if (p.millis() - game.endTime < scoreScreen.animationDuration) {
    scoreScreen.x = p.lerp(
      -assets.image.scorePanel.width * scoreScreen.scale,
      p.width / 2,
      (p.millis() - game.endTime) / scoreScreen.animationDuration
    );
  } else {
    scoreScreen.x = p.width / 2;
    if (game.keys.space.isPressed) game.start(p);
  }
};

export const drawScoreScreen = (p: p5) => {
  const uiScale = game.uiScale;

  p.push();
  p.textFont(assets.font.score, scoreScreen.scale * 9 * uiScale);
  p.textAlign(p.RIGHT);
  p.fill(255);
  p.stroke(0);
  p.strokeWeight(scoreScreen.scale * 2 * uiScale);
  p.rectMode(p.CENTER);
  p.imageMode(p.CENTER);

  p.image(
    assets.image.scorePanel,
    scoreScreen.x,
    p.height / 2,
    assets.image.scorePanel.width * scoreScreen.scale * uiScale,
    assets.image.scorePanel.height * scoreScreen.scale * uiScale
  );

  p.image(
    assets.image.gameOverLabel,
    scoreScreen.x,
    p.height / 2 - scoreScreen.scale * 45 * uiScale,
    assets.image.gameOverLabel.width * scoreScreen.scale * uiScale,
    assets.image.gameOverLabel.height * scoreScreen.scale * uiScale
  );

  p.text(
    game.score,
    scoreScreen.x + scoreScreen.scale * 45 * uiScale,
    p.height / 2 - scoreScreen.scale * 3 * uiScale
  );

  p.text(
    game.highScore,
    scoreScreen.x + scoreScreen.scale * 45 * uiScale,
    p.height / 2 + scoreScreen.scale * 17 * uiScale
  );

  p.textFont(assets.font.titleScreen, scoreScreen.scale * 3 * uiScale);
  p.textAlign(p.CENTER);
  p.strokeWeight(scoreScreen.scale * uiScale);
  p.text(
    "PRESS SPACE TO RESTART",
    scoreScreen.x,
    p.height / 2 + scoreScreen.scale * 42 * uiScale
  );

  if (game.newBest) {
    p.image(
      assets.image.newHighScoreLabel,
      scoreScreen.x + scoreScreen.scale * 19 * uiScale,
      p.height / 2 + scoreScreen.scale * 4 * uiScale,
      assets.image.newHighScoreLabel.width * scoreScreen.scale * uiScale,
      assets.image.newHighScoreLabel.height * scoreScreen.scale * uiScale
    );
  }

  const drawMedal = (image: p5.Image) => {
    p.image(
      image,
      scoreScreen.x - scoreScreen.scale * 32 * uiScale,
      p.height / 2 + scoreScreen.scale * 4 * uiScale,
      image.width * scoreScreen.scale * uiScale,
      image.height * scoreScreen.scale * uiScale
    );
  };

  if (game.score >= 10) {
    if (game.score < 20) {
      drawMedal(assets.image.bronzeMedal);
    } else if (game.score < 30) {
      drawMedal(assets.image.silverMedal);
    } else if (game.score < 40) {
      drawMedal(assets.image.goldMedal);
    } else if (game.score >= 40) {
      drawMedal(assets.image.platinumMedal);
    }
  }
  p.pop();
};
