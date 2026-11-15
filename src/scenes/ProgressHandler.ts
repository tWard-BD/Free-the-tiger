import { Sprite } from "pixi.js";
import { AnimatedBar } from "../prefabs/AnimatedBar";
import { Cypher } from "../prefabs/Cypher";
import ProgressBar from "../prefabs/SpriteContainers/ProgressBar";
import CenterContainer from "./Containers/CenterContainer";
import config from "../config";

export default class ProgressHandler {
  private _cypher: Cypher;
  private _progressBar: ProgressBar;
  private _centerContainer: CenterContainer;
  private _bars: AnimatedBar[] = [];

  private _locked = false;

  progress = 0;

  constructor(
    cypher: Cypher,
    progressBar: ProgressBar,
    centerContainer: CenterContainer,
    pairsOfBars: number
  ) {
    this._cypher = cypher;
    this._progressBar = progressBar;
    this._centerContainer = centerContainer;

    let bars = this._centerContainer.bars.barDtos;
    const pairsAmount = pairsOfBars;

    for (let i = 0; i < pairsAmount; i++) {
      const bar = bars[i * 2];
      const barOposite = bars[i * 2 + 1];

      const animatedBar = new AnimatedBar(
        bar.bar,
        bar.shadowBar,
        bar.destinationPositionX,
        i + 1,
        config.animatedBars,
        (clicked) => this.handleClick(clicked)
      );

      const animatedBarOposite = new AnimatedBar(
        barOposite.bar,
        barOposite.shadowBar,
        barOposite.destinationPositionX,
        pairsAmount + i + 1,
        config.animatedBars,
        (clicked) => this.handleClick(clicked)
      );

      this._bars.push(animatedBar);
      this._bars.push(animatedBarOposite);
    }
  }

  handleClick(bar: AnimatedBar): void {
    if (this._locked || bar.isClicked) {
      return;
    }

    if (!this._cypher.tryAdvance(this.progress, bar.assignedNumber)) {
      // add the regular reset logic here
      this.restart();
      return;
    }

    this.progress++;
    this._progressBar.setProgress(this._cypher.progressRatio(this.progress));

    if (this._cypher.isComplete(this.progress)) {
      this._locked = true;

      bar.open();
    } else {
      bar.open();
    }
  }

  resetOpenedBars(): void {
    const openBars = this._bars.filter((b) => b.isClicked);

    if (openBars.length === 0) {
      this._locked = false;
      return;
    }

    for (let i = 0; i < openBars.length; i++) {
      openBars[i].close();
    }
  }

  restart(): void {
    this._cypher.reset();
    this.resetOpenedBars();
    this._progressBar.reset();
    this._centerContainer.victoryText.visible = false;

    this.progress = 0;
    this._locked = false;
  }
}
