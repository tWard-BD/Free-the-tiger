import { Container, Sprite, Texture } from "pixi.js";

export default class Background extends Container {
  private _backgroundTextureName = "background";

  constructor() {
    super();

    this.renderSprite();
  }

  private renderSprite(): void {
    const backgroundTexture = Texture.from(this._backgroundTextureName);

    const bacgroundSprite = new Sprite(backgroundTexture);

    this.addChild(bacgroundSprite);
  }
}
