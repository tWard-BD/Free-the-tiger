export class Cypher {
  private order: number[] = [];

  constructor(private readonly count: number) {
    this.reset();
  }

  reset(): void {
    this.order = Array.from({ length: this.count }, (_, i) => i + 1);

    for (let i = 0; i < this.order.length; i++) {
      const index = Math.floor(Math.random() * this.order.length);
      
      if (i + 1 < this.order.length) {
        let valueToSwap = this.order[i + 1];
        let currentValue = this.order[index];

        this.order[index] = valueToSwap;
        this.order[i + 1] = currentValue;
      } else {
        let valueToSwap = this.order[i];
        let currentValue = this.order[index];

        this.order[index] = valueToSwap;
        this.order[i] = currentValue;
      }
    }

    console.log(this.order);
  }

  tryAdvance(progress: number, assignedNumber: number): boolean {
    return this.order[progress] === assignedNumber;
  }

  isComplete(progress: number): boolean {
    return progress === this.order.length;
  }

  progressRatio(progress: number): number {
    return progress / this.order.length;
  }
}