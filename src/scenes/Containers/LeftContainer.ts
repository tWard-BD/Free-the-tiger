import { Container } from "pixi.js";
import Panel from "../../prefabs/SpriteContainers/Panel";
import ProgressBar from "../../prefabs/SpriteContainers/ProgressBar";
import config from "../../config";

export default class LeftContainer extends Container {
  private _panel!: Panel;
  private _progressBar!: ProgressBar;
  constructor() {
    super();

    this.setupChildObjects();
  }

  public get panel() {
    return this._panel;
  }

  public get progressBar() {
    return this._progressBar;
  }

  private setupChildObjects() {
    this._panel = new Panel(config.sprites.panel);
    this._progressBar = new ProgressBar(config.progressBar);

    this.addChild(this._panel, this._progressBar);
  }
}
