import { Container, Sprite, Texture } from "pixi.js";

export default class Background extends Container {
    private _backgroundTextureName: string = "background";

    constructor() {
        super();

        this.renderSprite();
    }

    private renderSprite(): void {
        let backgroundTexture = Texture.from(this._backgroundTextureName);

        let bacgroundSprite = new Sprite(backgroundTexture);

        this.addChild(bacgroundSprite);
    }
}