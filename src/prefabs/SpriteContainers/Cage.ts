import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Cage extends Container<Sprite> {
  private _config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  cageSprite!: Sprite;

  private renderSprite(): void {
    const cageTexture = Texture.from(this._config.textureName);

    this.cageSprite = new Sprite(cageTexture);
    this.cageSprite.scale.set(this._config.scale);
    this.cageSprite.anchor.set(this._config.anchor);
    this.cageSprite.position.set(
      this._config.positionX,
      this._config.positionY
    );

    this.addChild(this.cageSprite);
  }
}
