import { Container, Sprite, Texture } from "pixi.js";

export default class Tiger extends Container {
  private _tigerTextureName = "tiger";

  constructor() {
    super();

    this.renderSprite();
  }

  private renderSprite(): void {
    const tigerTexture = Texture.from(this._tigerTextureName);

    const tigerSprite = new Sprite(tigerTexture);
    tigerSprite.scale.set(0.3);
    tigerSprite.anchor.set(0.5);
    tigerSprite.position.set(640, 430);

    this.addChild(tigerSprite);
  }
}
