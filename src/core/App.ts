import { Application } from "pixi.js";
import AssetLoader from "./AssetLoader";
import Game from "../scenes/Game";

export interface SceneUtils {
  assetLoader: AssetLoader;
}

export default class App extends Application {
  private _game: Game;

  constructor() {
    super({
      view: document.querySelector("#app") as HTMLCanvasElement,
      autoDensity: true,
      resizeTo: window,
      powerPreference: "high-performance",
      backgroundColor: 0x23272a,
    });

    const sceneUtils = {
      assetLoader: new AssetLoader(),
    };
    
    this._game = new Game(sceneUtils,);
  }

  async begin() {
    this.stage.addChild(this._game);

    await this._game.load();

    this._game.start();

    this.onResize();
    
    window.addEventListener("resize", (() => this.onResize()));

    this.ticker.add(() => {
      this._game.update()
    });
  }

  private onResize() {
    let global_width = 1280;
    let global_height = 720;
    const scale = Math.min(this.screen.width / global_width, this.screen.height / global_height);
    
    this._game.scale.set(scale);

    this._game.x = (this.screen.width - global_width * scale) / 2;
    this._game.y = (this.screen.height - global_height * scale) / 2;
  }
}
