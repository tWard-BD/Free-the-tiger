import { Container } from "pixi.js";
import Cage from "../../prefabs/SpriteContainers/Cage";
import Tiger from "../../prefabs/SpriteContainers/Tiger";
import VictoryText from "../../prefabs/SpriteContainers/VictoryText";
import { Bars } from "../../prefabs/SpriteContainers/Bars";
import config from "../../config";

export default class CenterContainer extends Container {
  constructor() {
    super();

    this.setupChildObjects();
  }

  cage!: Cage;
  tiger!: Tiger;
  bars!: Bars;
  victoryText!: VictoryText;

  private setupChildObjects() {
    const barPairsAmount = config.barPairsAmount;

    this.cage = new Cage(config.sprites.cage);
    this.tiger = new Tiger(config.sprites.tiger);
    this.victoryText = new VictoryText(config.sprites.victoryText);
    this.bars = new Bars(config.bars, barPairsAmount, this.cage.cageSprite);

    this.addChild(this.cage, this.tiger, this.bars, this.victoryText);
  }
}
