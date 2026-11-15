import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class VictoryText extends Container<Sprite> {
  private _config: SpriteConfig;
  private _victoryTextSprite!: Sprite;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  public get victoryTextSprite() {
    return this._victoryTextSprite;
  }

  private renderSprite() {
    const victoryTextTexture = Texture.from(this._config.textureName);

    this._victoryTextSprite = new Sprite(victoryTextTexture);
    this._victoryTextSprite.visible = false;
    this._victoryTextSprite.scale.set(this._config.scale);
    this._victoryTextSprite.position.set(
      this._config.positionX,
      this._config.positionY
    );

    this.addChild(this._victoryTextSprite);
  }
}
