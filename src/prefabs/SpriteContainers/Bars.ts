import { Container, Sprite, Texture, Text } from "pixi.js";

export type BarDto = {
  bar: Sprite;
  shadowBar: Sprite;
  destinationPositionX: number;
};

export class Bars extends Container {
  private _barTextureName = "bar";
  private _barShadowTextureName = "barShadow";

  barDtos: BarDto[] = [];

  constructor(pairsOfBars: number, cage: Sprite) {
    super();

    this.loadNumberOfBars(pairsOfBars, cage);
  }

  private loadNumberOfBars(barPairsAmount: number, cageSprite: Sprite): void {
    const barTexture = Texture.from(this._barTextureName);
    const barShadowTexture = Texture.from(this._barShadowTextureName);

    const barScale = cageSprite.height / barTexture.height / 14;

    let lastBarPositionOnY = 0;

    const barGap = 85;

    for (let i = 0; i < barPairsAmount; i++) {
      const barSprite = new Sprite(barTexture);
      const barShadowSprite = new Sprite(barShadowTexture);
      const barNumber = new Text(`${i + 1}`, {
        fontFamily: "Verdana",
        fontSize: 50,
        fill: "white",
      });

      const barSpriteOposite = new Sprite(barTexture);
      const barShadowSpriteOposite = new Sprite(barShadowTexture);
      const barOppositeNumber = new Text(`${barPairsAmount + i + 1}`, {
        fontFamily: "Verdana",
        fontSize: 50,
        fill: "white",
      });

      // a check only for the first iteration
      if (i <= 0) {
        const barPositionY = 315;
        const shadowBarPositionY = 325;

        this.setBarSprite(barSprite, barScale, 390, barPositionY);
        this.setBarSprite(barShadowSprite, barScale, 390, shadowBarPositionY);
        barNumber.position.set(360, barPositionY - 10);

        this.setBarSpriteOposite(barSpriteOposite, barScale, 890, barPositionY);
        this.setBarSpriteOposite(
          barShadowSpriteOposite,
          barScale,
          890,
          shadowBarPositionY
        );
        barOppositeNumber.position.set(890, barPositionY - 10);
      } else {
        const barPositionY = lastBarPositionOnY + barGap;
        const shadowBarPositionY = lastBarPositionOnY + barGap + 10;

        this.setBarSprite(barSprite, barScale, 390, barPositionY);
        this.setBarSprite(barShadowSprite, barScale, 390, shadowBarPositionY);
        barNumber.position.set(360, barPositionY - 10);

        this.setBarSpriteOposite(barSpriteOposite, barScale, 890, barPositionY);
        this.setBarSpriteOposite(
          barShadowSpriteOposite,
          barScale,
          890,
          shadowBarPositionY
        );
        barOppositeNumber.position.set(890, barPositionY - 10);
      }

      lastBarPositionOnY = barSprite.y;

      this.addChild(barNumber, barShadowSprite, barSprite);
      this.addChild(
        barOppositeNumber,
        barShadowSpriteOposite,
        barSpriteOposite
      );

      this.adddBarDto(barSprite, barShadowSprite, 180);
      this.adddBarDto(barSpriteOposite, barShadowSpriteOposite, 1100);
    }
  }

  private adddBarDto(
    bar: Sprite,
    shadowBar: Sprite,
    destinationPositionX: number
  ) {
    const barDto: BarDto = {
      bar: bar,
      shadowBar: shadowBar,
      destinationPositionX: destinationPositionX,
    };

    this.barDtos.push(barDto);
  }

  private setBarSprite(bar: Sprite, scale: number, x: number, y: number): void {
    bar.scale.set(scale);
    bar.position.set(x, y);
  }

  private setBarSpriteOposite(
    barOposite: Sprite,
    scale: number,
    x: number,
    y: number
  ): void {
    this.setBarSprite(barOposite, scale, x, y);
    barOposite.scale.x = -1;
  }
}
