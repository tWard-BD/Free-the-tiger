import { Container, Text } from "pixi.js";

export default class RestartButton extends Container {
    private _restartText!: Text;

    constructor(onClick: () => void) {
        super();

        this.renderSprite(onClick);
    }

    private renderSprite(onClick: () => void) {
        this._restartText = new Text("Play Again", {
              fontFamily: "Verdana",
              fontSize: 50,
              fill: "white",
            });

        this._restartText.visible = false;
        this._restartText.eventMode = 'static';
        this._restartText.cursor = 'pointer';
        this._restartText.on('pointerdown', () => onClick());

        this.scale.set(0.5);
        this.position.set(100, 350);

        this.addChild(this._restartText);
    }

    showButton() {
        this._restartText.visible = true;
    }
}