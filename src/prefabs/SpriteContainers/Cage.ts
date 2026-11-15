import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Cage extends Container<Sprite> {
  private _config: SpriteConfig;
  private _cageSprite!: Sprite;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  public get cageSprite() {
    return this._cageSprite;
  }

  private renderSprite(): void {
    const cageTexture = Texture.from(this._config.textureName);

    this._cageSprite = new Sprite(cageTexture);
    this._cageSprite.scale.set(this._config.scale);
    this._cageSprite.anchor.set(this._config.anchor);
    this._cageSprite.position.set(
      this._config.positionX,
      this._config.positionY
    );

    this.addChild(this._cageSprite);
  }
}
