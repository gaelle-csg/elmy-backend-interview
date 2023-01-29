export class PeriodPower {
  power: number;
  startTime: Date;
  endTime: Date;
  
  constructor(power: number, start: Date, end: Date) {
    this.power = power;
    this.startTime = start;
    this.endTime = end;
  }
}