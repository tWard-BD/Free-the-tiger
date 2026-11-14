import { Sprite } from "pixi.js";
import gsap from "gsap";
import { AnimatedBarConfig } from "../utils/types/ConfigTypes";

export class AnimatedBar {
  private _startPositionX: number;
  private _bar: Sprite;
  private _shadowBar: Sprite;
  private _destinationPositionX: number;
  private _config: AnimatedBarConfig;

  assignedNumber: number;
  isClicked = false;

  constructor(
    bar: Sprite,
    shadow: Sprite,
    destinationPositionX: number,
    assignedNumber: number,
    config: AnimatedBarConfig,
    onClick: (bar: AnimatedBar) => void
  ) {
    this._bar = bar;
    this._shadowBar = shadow;
    this._destinationPositionX = destinationPositionX;
    this.assignedNumber = assignedNumber;
    this._startPositionX = bar.x;
    this._config = config;

    // to fix the pointer issue change this to none when the game is completed
    bar.eventMode = "static";
    bar.cursor = "pointer";
    bar.on("pointerdown", () => onClick(this));
  }

  open(): void {
    this.isClicked = true;

    gsap.to(this._bar, {
      x: this._destinationPositionX,
      duration: this._config.animationDuration,
    });

    gsap.to(this._shadowBar, {
      x: this._destinationPositionX,
      duration: this._config.animationDuration,
    });
  }

  close(): void {
    this.isClicked = false;

    gsap.to(this._bar, {
      x: this._startPositionX,
      duration: this._config.animationDuration,
    });

    gsap.to(this._shadowBar, {
      x: this._startPositionX,
      duration: this._config.animationDuration,
    });
  }
}
