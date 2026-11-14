import { Container, Sprite, Texture } from "pixi.js";

export default class VictoryText extends Container {
  private _victoryTextTextureName = "txt";
  private _victoryTextSprite!: Sprite;

  constructor() {
    super();

    this.renderSprite();
  }

  private renderSprite() {
    const victoryTextTexture = Texture.from(this._victoryTextTextureName);

    this._victoryTextSprite = new Sprite(victoryTextTexture);
    this._victoryTextSprite.visible = false;
    this._victoryTextSprite.scale.set(0.4);
    this._victoryTextSprite.position.set(200, 420);

    this.addChild(this._victoryTextSprite);
  }

  showText() {
    this._victoryTextSprite.visible = true;
  }
}
