export class Cypher {
  private _order: number[] = [];
  private _count: number;

  constructor(count: number) {
    this._count = count;
    this.reset();
  }

  reset(): void {
    this._order = Array.from({ length: this._count }, (_, i) => i + 1);

    for (let i = 0; i < this._order.length; i++) {
      const index = Math.floor(Math.random() * this._order.length);

      if (i + 1 < this._order.length) {
        const valueToSwap = this._order[i + 1];
        const currentValue = this._order[index];

        this._order[index] = valueToSwap;
        this._order[i + 1] = currentValue;
      } else {
        const valueToSwap = this._order[i];
        const currentValue = this._order[index];

        this._order[index] = valueToSwap;
        this._order[i] = currentValue;
      }
    }

    console.log(this._order);
  }

  tryAdvance(progress: number, assignedNumber: number): boolean {
    return this._order[progress] === assignedNumber;
  }

  isComplete(progress: number): boolean {
    return progress === this._order.length;
  }

  progressRatio(progress: number): number {
    return progress / this._order.length;
  }
}
