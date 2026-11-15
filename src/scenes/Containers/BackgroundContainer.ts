import { Container } from "pixi.js";
import Background from "../../prefabs/SpriteContainers/Background";
import config from "../../config";

export default class BackgroundContainer extends Container {
  constructor() {
    super();

    this.setupChildObjects();
  }

  background!: Background;

  private setupChildObjects() {
    this.background = new Background(config.sprites.background);

    this.addChild(this.background);
  }
}
