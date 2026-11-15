import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class VictoryText extends Container<Sprite> {
  private _config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  victoryTextSprite!: Sprite;

  private renderSprite() {
    const victoryTextTexture = Texture.from(this._config.textureName);

    this.victoryTextSprite = new Sprite(victoryTextTexture);
    this.victoryTextSprite.visible = false;
    this.victoryTextSprite.scale.set(this._config.scale);
    this.victoryTextSprite.position.set(
      this._config.positionX,
      this._config.positionY
    );

    this.addChild(this.victoryTextSprite);
  }
}
