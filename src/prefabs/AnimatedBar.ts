import { Sprite } from "pixi.js";
import gsap from "gsap";
import { AnimatedBarConfig } from "../utils/types/ConfigTypes";
import { BarDto } from "./SpriteContainers/Bars";
import config from "../config";

export class AnimatedBar {
  private _bar: Sprite;
  private _shadowBar: Sprite;
  private _config: AnimatedBarConfig;

  private _startPositionX: number;
  private _destinationPositionX: number;
  private _initialBarPositionY: number;
  private _initialShadowBarPositionY: number;

  private _assignedNumber: number;
  private _isClicked = false;

  constructor(
    barInfo: BarDto,
    assignedNumber: number,
    onClick: (bar: AnimatedBar) => Promise<void>
  ) {
    this._bar = barInfo.bar;
    this._shadowBar = barInfo.shadowBar;
    this._destinationPositionX = barInfo.destinationPositionX;
    this._assignedNumber = assignedNumber;
    this._startPositionX = this._bar.x;
    this._config = config.animatedBars;

    this._initialBarPositionY = this._bar.y;
    this._initialShadowBarPositionY = this._shadowBar.y;

    this._bar.eventMode = "static";
    this._bar.cursor = "pointer";
    this._bar.on("pointerdown", async () => await onClick(this));
  }

  public get assignedNumber() {
    return this._assignedNumber;
  }

  public get isClicked() {
    return this._isClicked;
  }

  async open(): Promise<void> {
    this._isClicked = true;

    await gsap.to([this._bar, this._shadowBar], {
      x: this._destinationPositionX,
      duration: this._config.animationDuration,
    });

    this._bar.eventMode = "none";
  }

  async close(): Promise<void> {
    this._isClicked = false;
    this._bar.eventMode = "static";

    await gsap.to([this._bar, this._shadowBar], {
      x: this._startPositionX,
      duration: this._config.animationDuration,
    });
  }

  async shake(): Promise<void> {
    await gsap.to([this._bar, this._shadowBar], {
      y: this._bar.y - 5,
      duration: this._config.animationDuration,
      repeat: this._config.repeat,
      yoyo: this._config.yoyo,
      ease: this._config.ease,
    });

    // the animation above produces a bug where if you click too much times in rapid succession on the same wrong bar
    // it starts moving on the y coordinate permanently
    // these two animations are here to provide a partial fix as I'm not yet sure how to fix the main issue
    await gsap.to([this._bar, this._shadowBar], {
      y: this._initialBarPositionY,
      duration: this._config.animationDuration,
      ease: this._config.ease,
    });

    await gsap.to(this._shadowBar, {
      y: this._initialShadowBarPositionY,
      duration: this._config.animationDuration,
      ease: this._config.ease,
    });
  }
}
