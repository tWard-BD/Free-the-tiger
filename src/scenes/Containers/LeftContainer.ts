import { Container } from "pixi.js";
import Panel from "../../prefabs/SpriteContainers/Panel";
import ProgressBar from "../../prefabs/SpriteContainers/ProgressBar";
import config from "../../config";

export default class LeftContainer extends Container {
  constructor() {
    super();

    this.setupChildObjects();
  }

  panel!: Panel;
  progressBar!: ProgressBar;

  private setupChildObjects() {
    this.panel = new Panel(config.sprites.panel);
    this.progressBar = new ProgressBar(config.progressBar);

    this.addChild(this.panel, this.progressBar);
  }
}
