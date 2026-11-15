import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Tiger extends Container {
  private _config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  tigerSprite!: Sprite;

  private renderSprite(): void {
    const tigerTexture = Texture.from(this._config.textureName);

    this.tigerSprite = new Sprite(tigerTexture);
    this.tigerSprite.scale.set(this._config.scale);
    this.tigerSprite.anchor.set(this._config.anchor);
    this.tigerSprite.position.set(
      this._config.positionX,
      this._config.positionY
    );

    this.addChild(this.tigerSprite);
  }
}
