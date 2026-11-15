export type WorldConfig = {
  width: number;
  height: number;
};

export type AnimatedBarConfig = {
  animationDuration: number;
  ease: string;
  yoyo: boolean;
  repeat: number;
};

export type AnimatedTigerConfig = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  duration: number;
};

export type BarConfig = {
  textureName: string;
  shadowTextureName: string;
  gap: number;
  startPositionY: number;
  leftBarWorldPositionX: number;
  leftBarPositionX: number;
  rightBarWorldPositionX: number;
  rightBarPositionX: number;
  shadowStartPositionY: number;
  shadowYCorrection: number;
  barNumberPositionX: number;
  barNumberYCorrection: number;
};

export type SpriteConfig = {
  textureName: string;
  anchor?: number;
  anchorY?: number;
  anchorX?: number;
  scale?: number;
  positionY?: number;
  positionX?: number;
};

export type ProgressBarConfig = {
  width: number;
  height: number;
  scale: number;
  positionY: number;
  positionX: number;
  animationDuration: number;
};
