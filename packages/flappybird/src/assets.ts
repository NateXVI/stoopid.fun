import { Howl } from "howler";
import type p5 from "p5";

import BronzeMedal from "../static/assets/medal_bronze.png";
import SilverMedal from "../static/assets/medal_silver.png";
import GoldMedal from "../static/assets/medal_gold.png";
import PlatinumMedal from "../static/assets/medal_platinum.png";
import BirdSprite from "../static/assets/bird.png";
import PipeSpriteDown from "../static/assets/pipespritedown.png";
import PipeSpriteUp from "../static/assets/pipespriteup.png";
import BackgroundImage from "../static/assets/background.png";
import GroundImage from "../static/assets/ground.png";
import ScorePanel from "../static/assets/panel_score.png";
import NewHighScoreLabel from "../static/assets/label_new.png";
import GameOverLabel from "../static/assets/label_game_over.png";
import FlappyLogo from "../static/assets/flappylogo.png";
import WingSound from "../static/assets/wing.mp3";
import DieSound from "../static/assets/die.mp3";
import SwooshSound from "../static/assets/swoosh.mp3";
import PointSound from "../static/assets/point.mp3";
import HitSound from "../static/assets/hit.mp3";

export type Assets = ReturnType<typeof getAssets>;

export let assets: Assets;

export const initializeAssets = (p: p5) => {
  assets = getAssets(p);
};

export function getAssets(p: p5) {
  return {
    image: {
      bronzeMedal: p.loadImage(BronzeMedal),
      silverMedal: p.loadImage(SilverMedal),
      goldMedal: p.loadImage(GoldMedal),
      platinumMedal: p.loadImage(PlatinumMedal),
      birdSprite: p.loadImage(BirdSprite),
      pipeSpriteDown: p.loadImage(PipeSpriteDown),
      pipeSpriteUp: p.loadImage(PipeSpriteUp),
      backgroundImage: p.loadImage(BackgroundImage),
      groundImage: p.loadImage(GroundImage),
      scorePanel: p.loadImage(ScorePanel),
      newHighScoreLabel: p.loadImage(NewHighScoreLabel),
      gameOverLabel: p.loadImage(GameOverLabel),
      flappyLogo: p.loadImage(FlappyLogo),
    },
    font: {
      titleScreen: p.loadFont("/flappybird/Pixeled.ttf"),
      score: p.loadFont("/flappybird/flappy.TTF"),
    },
    sound: {
      wing: new Howl({
        src: [WingSound],
      }),
      die: new Howl({
        src: [DieSound],
      }),
      swoosh: new Howl({
        src: [SwooshSound],
      }),
      point: new Howl({
        src: [PointSound],
      }),
      hit: new Howl({
        src: [HitSound],
      }),
    },
  };
}
