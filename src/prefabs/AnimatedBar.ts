import { Sprite } from "pixi.js";
import gsap from "gsap";

export class AnimatedBar {
  private _startPositionX: number;
  private _bar: Sprite;
  private _shadowBar: Sprite;
  private _destinationPositionX: number;

  assignedNumber: number;
  isClicked = false;

  constructor(
    bar: Sprite,
    shadow: Sprite,
    destinationPositionX: number,
    assignedNumber: number,
    onClick: (bar: AnimatedBar) => void
  ) {
    this._bar = bar;
    this._shadowBar = shadow;
    this._destinationPositionX = destinationPositionX;
    this.assignedNumber = assignedNumber;
    this._startPositionX = bar.x;

    bar.eventMode = "static";
    bar.cursor = "pointer";
    bar.on("pointerdown", () => onClick(this));
  }

  open(): void {
    this.isClicked = true;

    gsap.to(this._bar, { x: this._destinationPositionX });
    gsap.to(this._shadowBar, { x: this._destinationPositionX });
  }

  close(): void {
    this.isClicked = false;

    gsap.to(this._bar, { x: this._startPositionX, duration: 0.4 });
    gsap.to(this._shadowBar, { x: this._startPositionX, duration: 0.4 });
  }
}
