export class PlayerScore {
  player: string;
  color: string;
  values: number[] = [];
  hidden: boolean;

  getScore(): number {
    return this.values && this.values.length > 0
      ? this.values.reduce((sum, value) => sum + (value ? value : 0))
      : 0;
  }
}
