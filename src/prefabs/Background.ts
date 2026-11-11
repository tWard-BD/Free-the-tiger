import { Container, Sprite, Texture } from "pixi.js";

export default class Background extends Container implements IReactiveSprite {
    private _backgroundTextureName: string = "background";

    constructor() {
        super();

        this.renderSprite();
    }

    resize(): void {
        
    }

    private renderSprite(): void {
        let backgroundTexture = Texture.from(this._backgroundTextureName);

        let bacgroundSprite = new Sprite(backgroundTexture);

        this.addChild(bacgroundSprite);
    }
}