import { Container, Sprite, Texture } from "pixi.js";

export default class Panel extends Container implements IReactiveSprite { 
    private _panelTextureName: string = "plate";

    constructor() { 
        super();

        this.renderSprite();
    }

    resize(): void {

    }

    private renderSprite(): void {
        let panelTexture = Texture.from(this._panelTextureName);

        let panelSprite = new Sprite(panelTexture);
        panelSprite.scale.set(0.28);
        panelSprite.anchor.set(0, 0.5);
        panelSprite.position.set(30, 365)

        this.addChild(panelSprite);
    }
}