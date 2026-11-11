import { Container, Sprite, Texture } from "pixi.js";

type Bar = {
    bar: Sprite,
    shadowBar: Sprite,
    assignedNumber: number
}

export default class Bars extends Container implements IReactiveSprite {
    private _barTextureName: string = "bar";
    private _bars!: Bar[];

    constructor(pairsOfBars: number, cage: Sprite) {
        super();

        this.loadNumberOfBars(pairsOfBars, cage);
    }

    resize(): void {
        
    }

    private loadNumberOfBars(barPairsAmount: number, cageSprite: Sprite): void {
        let barTexture = Texture.from(this._barTextureName);
        let barScale = (cageSprite.height / barTexture.height) / 14;

        let lastBarPositionOnY = 0;

        let lastOpositeBarPositionOnY = 0;

        let barGap = 70;

        for(let i = 0; i < barPairsAmount; i++) {
            let barSprite = new Sprite(barTexture);
            let barSpriteOposite = new Sprite(barTexture);
            
            // a check only for the first iteration
            if (i <= 0) {
                barSprite.scale.set(barScale);
                barSprite.position.set(390, 460);

                barSpriteOposite.scale.set(barScale);
                barSpriteOposite.position.set(890, 460);
                barSpriteOposite.scale.x = -1;
            }
            else {
                barSprite.scale.set(barScale);
                barSprite.position.set(390, lastBarPositionOnY - barGap);
                
                barSpriteOposite.position.set(890, lastOpositeBarPositionOnY - barGap);
                barSpriteOposite.scale.set(barScale);
                barSpriteOposite.scale.x = -1;
            }
            
            lastBarPositionOnY = barSprite.y;
            lastOpositeBarPositionOnY = barSpriteOposite.y;

            this.addChild(barSprite, barSpriteOposite);
        }
    }   
}