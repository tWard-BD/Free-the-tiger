import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Cage extends Container<Sprite> {
  private _config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  private renderSprite(): void {
    const cageTexture = Texture.from(this._config.textureName);

    const cageSprite = new Sprite(cageTexture);
    cageSprite.scale.set(this._config.scale);
    cageSprite.anchor.set(this._config.anchor);
    cageSprite.position.set(this._config.positionX, this._config.positionY);

    this.addChild(cageSprite);
  }
}
