import { Container, Sprite, Texture } from "pixi.js";

export default class Cage extends Container<Sprite> implements IReactiveSprite {
    private _cageTextureName: string = "cage";

    constructor() {
        super();

        this.renderSprite();
    }

    resize(): void {

    }

    private renderSprite(): void {
        let cageTexture = Texture.from(this._cageTextureName);

        let cageSprite = new Sprite(cageTexture);
        cageSprite.scale.set(0.46);
        cageSprite.anchor.set(0.5);
        cageSprite.position.set(640, 380);

        this.addChild(cageSprite);
    }
}