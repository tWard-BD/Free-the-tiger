import { Container, Graphics } from "pixi.js";
import gsap from "gsap";
import { ProgressBarConfig } from "../../utils/types/ConfigTypes";

export default class ProgressBar extends Container {
  private _fill!: Graphics;
  private _config: ProgressBarConfig;

  constructor(config: ProgressBarConfig) {
    super();

    this._config = config;
    this.renderGraphics();
  }

  setProgress(ratio: number): void {
    gsap.to(this._fill.scale, {
      x: ratio,
      duration: this._config.animationDuration,
    });
  }

  reset(): void {
    gsap.to(this._fill.scale, {
      x: 0,
      duration: this._config.animationDuration,
    });
  }

  private renderGraphics() {
    const width = this._config.width;
    const height = this._config.height;

    const track = new Graphics()
      .beginFill(0x333333)
      .drawRect(0, 0, width, height);

    track.scale.set(this._config.scale);
    track.position.set(this._config.positionX, this._config.positionY);

    this._fill = new Graphics()
      .beginFill(0x4caf50)
      .drawRect(0, 0, width, height);

    this._fill.scale.set(this._config.scale);
    this._fill.position.set(this._config.positionX, this._config.positionY);

    this._fill.scale.x = 0;

    this.addChild(track, this._fill);
  }
}
