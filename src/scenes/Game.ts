import { Container, Text } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { SceneUtils } from "../core/App";
import Background from "../prefabs/Background";
import Panel from "../prefabs/Panel";
import Tiger from "../prefabs/Tiger";
import ProgressHandler from "./ProgressHandler";
import { Bars } from "../prefabs/Bars";
import Cage from "../prefabs/Cage";

export default class Game extends Container {
  name = "Game";


  private _bars!: Bars;
  private _cage!: Cage;
  private _background!: Background;
  private _panel!: Panel;
  private _tiger!: Tiger;

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

    this.addChild(
       text);

    await this.utils.assetLoader.loadAssets();
  }

  async start() {
    this.removeChildren();

    this._tiger = new Tiger();
    this._cage = new Cage();
    this._panel = new Panel();
    this._background = new Background();

    let cage = this._cage.getChildAt(0);
    this._bars = new Bars(3, cage);

    this._progressHandler = new ProgressHandler(this._bars.barDtos);
    
    this.addChild(this._background, this._cage, this._tiger, this._bars, this._panel);
  }

  /**
   * Called on every ticker update
   * @param delta 
   */

  // this is the logic where we do all updates
  // for example the checks for the bars will be here
  update(delta: number) {

  }
}
