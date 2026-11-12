import gsap from "gsap";
import { Container, Sprite, Texture } from "pixi.js";

export type BarDto = {
    bar: Sprite,
    shadowBar: Sprite,
    destinationPositionX: number
}

export class Bars extends Container implements IReactiveSprite {
    private _barTextureName: string = "bar";
    private _barShadowTextureName: string = "barShadow";
    private _cypher: number[] = [];

    barDtos: BarDto[] = [];

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
            let barShadowSprite = new Sprite(barShadowTexture);
            //this.animateSlideToLeftBar(barShadowSprite, barSprite);
            //this.animateSlideToLeftBar(barSprite, barShadowSprite);

            let barSpriteOposite = new Sprite(barTexture);
            let barShadowSpriteOposite = new Sprite(barShadowTexture);
            //this.animateSlideToRightBar(barShadowSpriteOposite, barSpriteOposite);
            //this.animateSlideToRightBar(barSpriteOposite, barShadowSpriteOposite);

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

            this.adddBarDto(barSprite, barShadowSprite, 180);
            this.adddBarDto(barSpriteOposite, barShadowSpriteOposite, 1100);
        }
    }
    
    private animateSlideToLeftBar(bar: Sprite, secondBar: Sprite) {
        bar.eventMode = 'static';
        bar.on('pointerdown', () => {
            gsap.to(bar, {x:180})
            gsap.to(secondBar, {x:180})
        });
    }

    private animateSlideToRightBar(bar: Sprite, secondBar: Sprite) {
        bar.eventMode = 'static';
        bar.on('pointerdown', () => {
            gsap.to(bar, {x:1100})
            gsap.to(secondBar, {x:1100})
        });
    }

    private adddBarDto(bar: Sprite, shadowBar: Sprite, destinationPositionX: number) {
        let barDto: BarDto = {
            bar: bar,
            shadowBar: shadowBar,
            destinationPositionX: destinationPositionX
        };
        
        this.barDtos.push(barDto);
    }

    private fillCypher(arrayLength: number) {
        for (let i = 1; i <= arrayLength; i++) {
          this._cypher.push(i);
        }
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