import { Container, Sprite, Texture } from "pixi.js";

export default class Cage extends Container<Sprite> {
  private _cageTextureName = "cage";

  constructor() {
    super();

    this.renderSprite();
  }

  private renderSprite(): void {
    const cageTexture = Texture.from(this._cageTextureName);

    const cageSprite = new Sprite(cageTexture);
    cageSprite.scale.set(0.46);
    cageSprite.anchor.set(0.5);
    cageSprite.position.set(640, 380);

    this.addChild(cageSprite);
  }
}
