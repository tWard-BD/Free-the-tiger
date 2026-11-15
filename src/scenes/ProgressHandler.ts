import { AnimatedBar } from "../prefabs/AnimatedBar";
import { Cypher } from "../prefabs/Cypher";
import ProgressBar from "../prefabs/SpriteContainers/ProgressBar";
import CenterContainer from "./Containers/CenterContainer";
import { Container, DisplayObject } from "pixi.js";
import AnimatedTiger from "../prefabs/AnimatedTiger";
import gsap from "gsap";

export default class ProgressHandler {
  private _cypher: Cypher;
  private _progressBar: ProgressBar;
  private _centerContainer: CenterContainer;

  private _bars: AnimatedBar[] = [];
  private _tiger: AnimatedTiger;

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

    this._tiger = new AnimatedTiger(this._centerContainer);
    this.populateAnimatedBars(pairsOfBars);
  }

  async handleClick(bar: AnimatedBar): Promise<void> {
    if (this._locked || bar.isClicked) {
      return;
    }

    if (!this._cypher.tryAdvance(this.progress, bar.assignedNumber)) {
      if (this.progress === 0) {
        await bar.shake();
      }

      await this.simpleRestart();
      console.log(bar.eventMode);
      return;
    }

    this.progress++;
    await this._progressBar.setProgress(
      this._cypher.progressRatio(this.progress)
    );

    if (this._cypher.isComplete(this.progress)) {
      await this.finish(bar);
    } else {
      await bar.open();
    }
  }

  async resetOpenedBars(): Promise<void> {
    const openBars = this._bars.filter((b) => b.isClicked);

    if (openBars.length === 0) {
      this._locked = false;
      return;
    }

    for (let i = 0; i < openBars.length; i++) {
      await openBars[i].close();
    }
  }

  async finish(bar: AnimatedBar): Promise<void> {
    await bar.open();

    this.swapContainerChildren(
      this._centerContainer,
      this._centerContainer.bars,
      this._centerContainer.tiger
    );
    this._centerContainer.victoryText.victoryTextSprite.visible = true;

    await this._tiger.getOutOfCage();
    this._locked = true;

    await gsap.delayedCall(5, async () => await this.fullRestart());
  }

  async simpleRestart(): Promise<void> {
    this._cypher.reset();

    await this.resetOpenedBars();
    await this._progressBar.reset();

    this.progress = 0;
    this._locked = false;
  }

  async fullRestart(): Promise<void> {
    await this._tiger.getBackInCage();

    this.swapContainerChildren(
      this._centerContainer,
      this._centerContainer.tiger,
      this._centerContainer.bars
    );
    this._centerContainer.victoryText.victoryTextSprite.visible = false;

    await this.simpleRestart();
  }

  private populateAnimatedBars(pairsOfBars: number): void {
    let bars = this._centerContainer.bars.barDtos;
    const pairsAmount = pairsOfBars;

    for (let i = 0; i < pairsAmount; i++) {
      const bar = bars[i * 2];
      const barOposite = bars[i * 2 + 1];

      const animatedBar = new AnimatedBar(
        bar,
        i + 1,
        async (clicked) => await this.handleClick(clicked)
      );

      const animatedBarOposite = new AnimatedBar(
        barOposite,
        pairsAmount + i + 1,
        async (clicked) => await this.handleClick(clicked)
      );

      this._bars.push(animatedBar);
      this._bars.push(animatedBarOposite);
    }
  }

  private swapContainerChildren(
    container: Container,
    firstChild: DisplayObject,
    secondChild: DisplayObject
  ): void {
    let firstChildIndex = container.getChildIndex(firstChild);
    let secondChildIndex = container.getChildIndex(secondChild);

    container.children[firstChildIndex] = secondChild;
    container.children[secondChildIndex] = firstChild;
  }
}
