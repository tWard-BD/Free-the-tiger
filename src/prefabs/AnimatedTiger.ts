import { Sprite } from "pixi.js";
import { AnimatedTigerConfig, SpriteConfig } from "../utils/types/ConfigTypes";
import gsap from "gsap";
import CenterContainer from "../scenes/Containers/CenterContainer";
import config from "../config";

export default class AnimatedTiger {
  private _tiger: Sprite;
  private _config: AnimatedTigerConfig;
  private _initialStateConfig: SpriteConfig;
  private _initialTigerHeight: number;
  private _initialTigerWidth: number;

  constructor(centerContainer: CenterContainer) {
    this._tiger = centerContainer.tiger.tigerSprite;
    this._config = config.animatedTiger;
    this._initialStateConfig = config.sprites.tiger;
    this._initialTigerHeight = this._tiger.height;
    this._initialTigerWidth = this._tiger.width;
  }

  async getOutOfCage(): Promise<void> {
    await gsap.to(this._tiger, {
      x: this._config.positionX,
      y: this._config.positionY,
      width: this._config.width,
      height: this._config.height,
      duration: this._config.duration,
    });
  }

  async getBackInCage(): Promise<void> {
    await gsap.to(this._tiger, {
      x: this._initialStateConfig.positionX,
      y: this._initialStateConfig.positionY,
      width: this._initialTigerWidth,
      height: this._initialTigerHeight,
      duration: this._config.duration,
    });
  }
}
