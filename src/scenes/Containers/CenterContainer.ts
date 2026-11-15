import { Container } from "pixi.js";
import Cage from "../../prefabs/SpriteContainers/Cage";
import Tiger from "../../prefabs/SpriteContainers/Tiger";
import VictoryText from "../../prefabs/SpriteContainers/VictoryText";
import { Bars } from "../../prefabs/SpriteContainers/Bars";
import config from "../../config";

export default class CenterContainer extends Container {
  private _cage!: Cage;
  private _tiger!: Tiger;
  private _bars!: Bars;
  private _victoryText!: VictoryText;

  constructor() {
    super();

    this.setupChildObjects();
  }

  public get cage() {
    return this._cage;
  }

  public get tiger() {
    return this._tiger;
  }

  public get bars() {
    return this._bars;
  }

  public get victoryText() {
    return this._victoryText;
  }

  private setupChildObjects() {
    const barPairsAmount = config.barPairsAmount;

    this._cage = new Cage(config.sprites.cage);
    this._tiger = new Tiger(config.sprites.tiger);
    this._victoryText = new VictoryText(config.sprites.victoryText);
    this._bars = new Bars(config.bars, barPairsAmount, this._cage.cageSprite);

    this.addChild(this._cage, this._tiger, this._bars, this._victoryText);
  }
}
