import { Container, Sprite, Texture } from "pixi.js";

export default class Panel extends Container {
  private _panelTextureName = "plate";

  constructor() {
    super();

    this.renderSprite();
  }

  private renderSprite(): void {
    const panelTexture = Texture.from(this._panelTextureName);

    const panelSprite = new Sprite(panelTexture);
    panelSprite.scale.set(0.28);
    panelSprite.anchor.set(0, 0.5);
    panelSprite.position.set(30, 365);

    this.addChild(panelSprite);
  }
}
