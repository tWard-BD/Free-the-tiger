import { Container, Text } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { SceneUtils } from "../core/App";
import ProgressHandler from "./ProgressHandler";
import { Cypher } from "../prefabs/Cypher";
import config from "../config";
import LeftContainer from "./Containers/LeftContainer";
import CenterContainer from "./Containers/CenterContainer";
import BackgroundContainer from "./Containers/BackgroundContainer";
import WhiteText from "../utils/WhiteText";

export default class Game extends Container {
  name = "Game";

  private _backgroundContainer!: BackgroundContainer;
  private _centerContainer!: CenterContainer;
  private _leftContainer!: LeftContainer;

  private _cypher!: Cypher;
  private _progressHandler!: ProgressHandler;

  constructor(protected utils: SceneUtils) {
    super();
  }

  async load() {
    // example use of Pixi Text
    const text = new Text("Loading...", WhiteText);
    text.resolution = 2;

    // example use of utils functions
    centerObjects(text);

    this.addChild(text);

    await this.utils.assetLoader.loadAssets();
  }

  async start() {
    this.removeChildren();

    this.setupDependencies();

    // draw background
    this.addChild(this._backgroundContainer);

    // draw middle part
    this.addChild(this._centerContainer);

    // draw left part
    this.addChild(this._leftContainer);
  }

  /**
   * Called on every ticker update
   * @param delta
   */
  update() {
    if (this._cypher.isComplete(this._progressHandler.progress)) {
    }
  }

  reset(): void {
    this._cypher.reset();

    this._progressHandler.progress = 0;
    this._progressHandler.resetOpenedBars();
  }

  private setupDependencies(): void {
    const barPairsAmount = config.barPairsAmount;

    this._backgroundContainer = new BackgroundContainer();
    this._leftContainer = new LeftContainer();
    this._centerContainer = new CenterContainer();

    this._cypher = new Cypher(barPairsAmount * 2);
    this._progressHandler = new ProgressHandler(
      this._cypher,
      this._leftContainer.progressBar,
      this._centerContainer,
      barPairsAmount
    );
  }
}
