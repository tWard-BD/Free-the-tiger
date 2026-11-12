import { AnimatedBar } from "../prefabs/AnimatedBar";
import { Cypher } from "../prefabs/Cypher";
import { BarDto } from "../prefabs/Bars";

export default class ProgressHandler {
    private readonly _cypher: Cypher;
    private readonly _bars: AnimatedBar[] = [];
    
    private _locked = false;

    constructor(bars: BarDto[]) {
        this._cypher = new Cypher(bars.length);
        
        for(let i = 0; i < bars.length; i++) {
            let bar = bars[i];
            let animatedBar = new AnimatedBar(bar.bar, bar.shadowBar, bar.destinationPositionX, i + 1, (clicked) => this.handleClick(clicked));

            this._bars.push(animatedBar);
        }
    }

    handleClick(bar: AnimatedBar): void {
        if (this._locked || bar.isClicked) return;
        
        if (!this._cypher.tryAdvance(bar.assignedNumber)) {
            this.reset();
            return;
        }
    
        bar.open();
    }

    reset(): void {
        this._locked = true;
        this._cypher.reset();

        const openBars = this._bars.filter((b) => b.isClicked);

        if (openBars.length === 0) {
            this._locked = false;
            return;
        }

        for(let i = 0; i < openBars.length; i++) {
            let bar = openBars[i];
            bar.close();
        }
    }
}