import { Container, Sprite, Texture } from "pixi.js";

export default class Tiger extends Container implements IReactiveSprite {
    private _tigerTextureName: string = "tiger";
    
    constructor() {
        super();

        this.renderSprite();
    }

    resize(): void {

    }

    private renderSprite(): void {
        let tigerTexture = Texture.from(this._tigerTextureName);

        let tigerSprite = new Sprite(tigerTexture);
        tigerSprite.scale.set(0.3);
        tigerSprite.anchor.set(0.5);
        tigerSprite.position.set(640, 430);

        this.addChild(tigerSprite);
    }
}