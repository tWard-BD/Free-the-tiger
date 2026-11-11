import { Container, Texture, TilingSprite } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type BgConfig = {
  layers: string[];
  panSpeed: number;
};

export default class BackgroundContainer extends Container {
  name = "Background";

  layers: string[] = [];
  sprites: TilingSprite[] = [];

  constructor(
    protected config: BgConfig = {
      panSpeed: 1,
      layers: [],
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    for (const layer of this.config.layers) {
      const texture = Texture.from(layer);
      const scaleFactor = window.innerHeight / texture.height;

      const tilingSprite = new TilingSprite(
        texture
      );

      tilingSprite.scale.set(scaleFactor);

      tilingSprite.name = layer;
      tilingSprite.anchor.set(0.5);

      this.sprites.push(tilingSprite);

      this.addChild(tilingSprite);
    }
  }

  updatePosition(x: number, y: number) {
    for (const [index, child] of this.children.entries()) {
      if (child instanceof TilingSprite) {
        child.tilePosition.x -= x * index * this.config.panSpeed;
        child.tilePosition.y -= y * index * this.config.panSpeed;
      } else {
        child.x -= x * index * this.config.panSpeed;
        child.y -= y * index * this.config.panSpeed;
      }
    }
  }

  resize( width: number, height: number) {
    for (const layer of this.sprites) {
      const scaleFactor = height / layer.texture.height;

      layer.width = width / scaleFactor;
      layer.scale.set(scaleFactor);
    }

    centerObjects(this);
  }
}
