import { Container, Sprite, Texture, Text } from "pixi.js";
import { BarConfig } from "../../utils/types/ConfigTypes";

export type BarDto = {
  bar: Sprite;
  shadowBar: Sprite;
  destinationPositionX: number;
};

export class Bars extends Container {
  private _config: BarConfig;

  barDtos: BarDto[] = [];

  constructor(config: BarConfig, pairsOfBars: number, cage: Sprite) {
    super();

    this._config = config;
    this.loadNumberOfBars(pairsOfBars, cage);
  }

  private loadNumberOfBars(barPairsAmount: number, cageSprite: Sprite): void {
    const barTexture = Texture.from(this._config.textureName);
    const barShadowTexture = Texture.from(this._config.shadowTextureName);

    const barScale = cageSprite.height / barTexture.height / 14;

    let lastBarPositionOnY = 0;

    const barGap = this._config.gap;

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
        const barPositionY = this._config.startPositionY;
        const shadowBarPositionY = this._config.shadowStartPositionY;

        this.setBarSprite(
          barSprite,
          barScale,
          this._config.leftBarPositionX,
          barPositionY
        );

        this.setBarSprite(
          barShadowSprite,
          barScale,
          this._config.leftBarPositionX,
          shadowBarPositionY
        );

        barNumber.position.set(
          this._config.barNumberPositionX,
          barPositionY - this._config.barNumberYCorrection
        );

        this.setBarSpriteOposite(
          barSpriteOposite,
          barScale,
          this._config.rightBarPositionX,
          barPositionY
        );

        this.setBarSpriteOposite(
          barShadowSpriteOposite,
          barScale,
          this._config.rightBarPositionX,
          shadowBarPositionY
        );

        barOppositeNumber.position.set(
          this._config.rightBarPositionX,
          barPositionY - this._config.barNumberYCorrection
        );
      } else {
        const barPositionY = lastBarPositionOnY + barGap;
        const shadowBarPositionY =
          lastBarPositionOnY + barGap + this._config.shadowYCorrection;

        this.setBarSprite(
          barSprite,
          barScale,
          this._config.leftBarPositionX,
          barPositionY
        );

        this.setBarSprite(
          barShadowSprite,
          barScale,
          this._config.leftBarPositionX,
          shadowBarPositionY
        );

        barNumber.position.set(
          this._config.barNumberPositionX,
          barPositionY - this._config.barNumberYCorrection
        );

        this.setBarSpriteOposite(
          barSpriteOposite,
          barScale,
          this._config.rightBarPositionX,
          barPositionY
        );

        this.setBarSpriteOposite(
          barShadowSpriteOposite,
          barScale,
          this._config.rightBarPositionX,
          shadowBarPositionY
        );

        barOppositeNumber.position.set(
          this._config.rightBarPositionX,
          barPositionY - this._config.barNumberYCorrection
        );
      }

      lastBarPositionOnY = barSprite.y;

      this.addChild(barNumber, barShadowSprite, barSprite);
      this.addChild(
        barOppositeNumber,
        barShadowSpriteOposite,
        barSpriteOposite
      );

      this.adddBarDto(
        barSprite,
        barShadowSprite,
        this._config.leftBarWorldPositionX
      );
      this.adddBarDto(
        barSpriteOposite,
        barShadowSpriteOposite,
        this._config.rightBarWorldPositionX
      );
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
