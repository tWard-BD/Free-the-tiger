import { Container, Text, Graphics } from "pixi.js";
import { centerObjects } from "../utils/misc";
import Keyboard from "../core/Keyboard";
import { SceneUtils } from "../core/App";
import Bars from "../prefabs/Bars";
import Cage from "../prefabs/Cage";
import Background from "../prefabs/Background";
import Panel from "../prefabs/Panel";
import Tiger from "../prefabs/Tiger";

export default class Game extends Container {
  name = "Game";

  private _keyboard = Keyboard.getInstance();

  private _bars!: Bars
  private _cage!: Cage
  private _background!: Background
  private _panel!: Panel
  private _tiger!: Tiger
  
  constructor(protected utils: SceneUtils) {
    super();
  }

  async load() {
    // example use of Pixi Graphics
    //const bg = new Graphics().beginFill(0x0b1354).drawRect(0, 0, this._gameWidth, this._gameHeight)

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
      //bg,
       text);

    await this.utils.assetLoader.loadAssets();

    this._keyboard.onAction(({ action, buttonState }) => {
      if (buttonState === "pressed") this.onActionPress(action);
      else if (buttonState === "released") this.onActionRelease(action);
    });
  }

  async start() {
    this.removeChildren();

    this._tiger = new Tiger();
    this._cage = new Cage();
    this._panel = new Panel();
    this._background = new Background(); 

    this.addChild();
    
    let cage = this._cage.getChildAt(0);
    this._bars = new Bars(3, cage);
     
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

  /**
   * Called on resize of scene
   * @param width 
   * @param height 
   */

  private onActionPress(action: keyof typeof Keyboard.actions) {
    //this.character.onActionPress(action);
  }

  onActionRelease(action: keyof typeof Keyboard.actions) {
    //this.character.onActionRelease(action);
  }
}
