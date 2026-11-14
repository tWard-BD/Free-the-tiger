import {
  AnimatedBarConfig,
  BarConfig,
  ProgressBarConfig,
  SpriteConfig,
  WorldConfig,
} from "./utils/types/ConfigTypes";

type Config = {
  worldConfig: WorldConfig;
  animatedBars: AnimatedBarConfig;
  bars: BarConfig;
  sprites: Record<string, SpriteConfig>;
  progressBar: ProgressBarConfig;
  barPairsAmount: number;
};

export default {
  worldConfig: {
    width: 1280,
    height: 720,
  },
  animatedBars: {
    animationDuration: 0.4,
  },
  bars: {
    textureName: "bar",
    shadowTextureName: "barShadow",
    gap: 85,
    startPositionY: 315,
    leftBarWorldPositionX: 180,
    leftBarPositionX: 390,
    rightBarWorldPositionX: 1100,
    rightBarPositionX: 890,
    shadowStartPositionY: 325,
    shadowYCorrection: 10,
    barNumberPositionX: 360,
    barNumberYCorrection: 10,
  },
  sprites: {
    victoryText: {
      textureName: "txt",
      scale: 0.4,
      positionY: 420,
      positionX: 200,
    },
    tiger: {
      textureName: "tiger",
      anchor: 0.5,
      scale: 0.3,
      positionY: 430,
      positionX: 640,
    },
    panel: {
      textureName: "plate",
      anchorY: 0.5,
      anchorX: 0,
      scale: 0.28,
      positionY: 365,
      positionX: 30,
    },
    cage: {
      textureName: "cage",
      anchor: 0.5,
      scale: 0.46,
      positionY: 380,
      positionX: 640,
    },
    background: {
      textureName: "background",
    },
  },
  progressBar: {
    width: 190,
    height: 100,
    scale: 0.8,
    positionY: 250,
    positionX: 100,
    animationDuration: 0.4,
  },
  barPairsAmount: 3,
} as Config;
