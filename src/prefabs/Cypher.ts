export class Cypher {
  private order: number[] = [];
  private progress = 0;

  constructor(private readonly count: number) {
    this.reset();
  }

  reset(): void {
    this.progress = 0;
    this.order = Array.from({ length: this.count }, (_, i) => i + 1);

    for (let i = 0; i < this.order.length; i++) {
      const index = Math.floor(Math.random() * this.order.length);
      if (i + 1 < this.order.length) {
        let valueToSwap = this.order[i + 1];
        let currentValue = this.order[index];

        this.order[index] = valueToSwap;
        this.order[i + 1] = currentValue;
      }
      else {
        
        let valueToSwap = this.order[i];
        let currentValue = this.order[index];

        this.order[index] = valueToSwap;
        this.order[i] = currentValue;
      }
    }

    //for (let i = this.order.length - 1; i > 0; i--) {      // Fisher-Yates shuffle
    //  const j = Math.floor(Math.random() * (i + 1));
    //  [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    //}
  }

  tryAdvance(assignedNumber: number): boolean {
    if (this.order[this.progress] !== assignedNumber) {
      return false;
    }

    this.progress++;
    
    return true;
  }

  isComplete(): boolean {
    return this.progress === this.order.length;
  }
}