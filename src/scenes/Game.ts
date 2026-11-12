import { Container, Text } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { SceneUtils } from "../core/App";
import Background from "../prefabs/Background";
import Panel from "../prefabs/Panel";
import Tiger from "../prefabs/Tiger";
import ProgressHandler from "./ProgressHandler";
import { Bars } from "../prefabs/Bars";
import Cage from "../prefabs/Cage";
import VictoryText from "../prefabs/VictoryText";
import { Cypher } from "../prefabs/Cypher";
import RestartButton from "../prefabs/RestartButton";
import ProgressBar from "../prefabs/ProgressBar";

export default class Game extends Container {
  name = "Game";

  private _background!: Background;

  private _cage!: Cage;
  private _tiger!: Tiger;
  private _bars!: Bars;
  private _victoryText!: VictoryText;  

  private _panel!: Panel;
  private _restartButton!: RestartButton;
  private _progressBar!: ProgressBar;

  private _cypher!: Cypher;
  private _progressHandler!: ProgressHandler;
  
  constructor(protected utils: SceneUtils) {
    super();
  }

  async load() {
    // example use of Pixi Text
    const text = new Text("Loading...", {
      fontFamily: "Verdana",
      fontSize: 50,
      fill: "white",
    });
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
    this.addChild(this._background);

    // draw middle part
    this.addChild(this._cage, this._tiger, this._bars, this._victoryText,);
    
    // draw left part
    this.addChild(this._panel, this._restartButton, this._progressBar);
  }

  /**
   * Called on every ticker update
   * @param delta 
   */
  update() {
    if (this._cypher.isComplete(this._progressHandler.progress)) {
      this.victory();
    }
  }

  reset(): void {
    this._victoryText.visible = false;
    this._restartButton.visible = false;

    this._cypher.reset();
    this._progressBar.reset();

    this._progressHandler.progress = 0;
    this._progressHandler.resetOpenedBars();
    this._progressHandler.resetLock();
  }

  victory() {
    this._victoryText.showText();
    this._restartButton.showButton();
  }

  private setupDependencies(): void {
    let barPairsAmount = 3;

    this._background = new Background();

    this._cage = new Cage();
    this._tiger = new Tiger();
    this._victoryText = new VictoryText();
    let cage = this._cage.getChildAt(0);
    this._bars = new Bars(barPairsAmount, cage);

    this._panel = new Panel();
    this._restartButton = new RestartButton((() => this.reset()));
    this._progressBar = new ProgressBar();

    this._cypher = new Cypher(barPairsAmount * 2);
    this._progressHandler = new ProgressHandler(this._cypher, this._progressBar, this._bars.barDtos);
  }
}
