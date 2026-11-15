import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Tiger extends Container {
  private _config: SpriteConfig;
  private _tigerSprite!: Sprite;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  public get tigerSprite() {
    return this._tigerSprite;
  }

  private renderSprite(): void {
    const tigerTexture = Texture.from(this._config.textureName);

    this._tigerSprite = new Sprite(tigerTexture);
    this._tigerSprite.scale.set(this._config.scale);
    this._tigerSprite.anchor.set(this._config.anchor);
    this._tigerSprite.position.set(
      this._config.positionX,
      this._config.positionY
    );

    this.addChild(this._tigerSprite);
  }
}
