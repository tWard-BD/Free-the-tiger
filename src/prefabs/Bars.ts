import { Container, Sprite, Texture } from "pixi.js";

type Bar = {
    bar: Sprite,
    shadowBar: Sprite,
    assignedNumber: number
}

export default class Bars extends Container implements IReactiveSprite {
    private _barTextureName: string = "bar";
    private _barShadowTextureName: string = "barShadow";
    private _cypher: number[] = [];

    bars: Bar[] = [];

    constructor(pairsOfBars: number, cage: Sprite) {
        super();

        this.fillCypher(pairsOfBars * 2);
        this.loadNumberOfBars(pairsOfBars, cage);
    }

    resize(): void {
        
    }

    private loadNumberOfBars(barPairsAmount: number, cageSprite: Sprite): void {
        let barTexture = Texture.from(this._barTextureName);
        let barShadowTexture = Texture.from(this._barShadowTextureName);

        let barScale = (cageSprite.height / barTexture.height) / 14;

        let lastBarPositionOnY = 0;

        let barGap = 70;

        for(let i = 0; i < barPairsAmount; i++) {

            let barSprite = new Sprite(barTexture);
            let barSpriteOposite = new Sprite(barTexture);

            let barShadowSprite = new Sprite(barShadowTexture);
            let barShadowSpriteOposite = new Sprite(barShadowTexture);

            // a check only for the first iteration
            if (i <= 0) {
                let barPositionY = 460;
                let shadowBarPositionY = 470;

                this.setBarSprite(barSprite, barScale, 390, barPositionY);

                this.setBarSpriteOposite(barSpriteOposite, barScale, 890, barPositionY);
                
                this.setBarSprite(barShadowSprite, barScale, 390, shadowBarPositionY);

                this.setBarSpriteOposite(barShadowSpriteOposite, barScale, 890, shadowBarPositionY);
            }
            else {
                let barPositionY = lastBarPositionOnY - barGap;
                let shadowBarPositionY = lastBarPositionOnY - barGap + 10;

                this.setBarSprite(barSprite, barScale, 390, barPositionY);

                this.setBarSpriteOposite(barSpriteOposite, barScale, 890, barPositionY);
                
                this.setBarSprite(barShadowSprite, barScale, 390, shadowBarPositionY);
                
                this.setBarSpriteOposite(barShadowSpriteOposite, barScale, 890, shadowBarPositionY);
            }
            
            lastBarPositionOnY = barSprite.y;

            this.addChild(barShadowSprite, barSprite, barShadowSpriteOposite, barSpriteOposite);

            this.addAnimatedBar(barSprite, barShadowSprite);
            this.addAnimatedBar(barSpriteOposite, barShadowSpriteOposite);
        }
    }
    
    private addAnimatedBar(bar: Sprite, shadowBar: Sprite) {
        let cypherNumber = this.getCypherNumber();
        let animatedBar: Bar = {
            bar: bar,
            shadowBar: shadowBar,
            assignedNumber: cypherNumber
        };
        
        this.bars.push(animatedBar);
    }

    private fillCypher(arrayLength: number) {
        for (let i = 1; i <= arrayLength; i++) {
          this._cypher.push(i);
        }
    }

    private getCypherNumber(): number {
        const index = Math.floor(Math.random() * this._cypher.length);
        return this._cypher.splice(index, 1)[0];
    }

    private setBarSprite(bar: Sprite, scale: number, x: number, y: number): void {
        bar.scale.set(scale);
        bar.position.set(x, y);
    }

    private setBarSpriteOposite(barOposite: Sprite, scale: number, x: number, y: number): void {
        this.setBarSprite(barOposite, scale, x, y);
        barOposite.scale.x = -1;
    }
}