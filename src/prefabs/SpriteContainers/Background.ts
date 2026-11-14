import { Container, Sprite, Texture } from "pixi.js";
import { SpriteConfig } from "../../utils/types/ConfigTypes";

export default class Background extends Container {
  private _config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super();

    this._config = config;
    this.renderSprite();
  }

  private renderSprite(): void {
    const backgroundTexture = Texture.from(this._config.textureName);

    const bacgroundSprite = new Sprite(backgroundTexture);

    this.addChild(bacgroundSprite);
  }
}
