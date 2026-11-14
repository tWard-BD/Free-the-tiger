import { Container, Graphics } from "pixi.js";
import gsap from "gsap";

export default class ProgressBar extends Container {
  private _fill!: Graphics;

  constructor() {
    super();

    this.renderGraphics();
  }

  setProgress(ratio: number): void {
    gsap.to(this._fill.scale, { x: ratio, duration: 0.4 });
  }

  reset(): void {
    gsap.to(this._fill.scale, { x: 0, duration: 0.4 });
  }

  private renderGraphics() {
    const width = 190;
    const height = 100;

    const track = new Graphics()
      .beginFill(0x333333)
      .drawRect(0, 0, width, height);

    track.scale.set(0.8);
    track.position.set(100, 250);

    this._fill = new Graphics()
      .beginFill(0x4caf50)
      .drawRect(0, 0, width, height);

    this._fill.scale.set(0.8);
    this._fill.position.set(100, 250);

    this._fill.scale.x = 0;

    this.addChild(track, this._fill);
  }
}
