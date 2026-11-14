import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Panel extends Container {
  private _config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  private renderSprite(): void {
    const panelTexture = Texture.from(this._config.textureName);

    const panelSprite = new Sprite(panelTexture);
    panelSprite.scale.set(this._config.scale);
    panelSprite.anchor.set(this._config.anchorX, this._config.anchorY);
    panelSprite.position.set(this._config.positionX, this._config.positionY);

    this.addChild(panelSprite);
  }
}
