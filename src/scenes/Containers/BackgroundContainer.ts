import { Container } from "pixi.js";
import Background from "../../prefabs/SpriteContainers/Background";
import config from "../../config";

export default class BackgroundContainer extends Container {
  private _background!: Background;

  constructor() {
    super();

    this.setupChildObjects();
  }

  public get background() {
    return this._background;
  }

  private setupChildObjects() {
    this._background = new Background(config.sprites.background);

    this.addChild(this._background);
  }
}
