export class PowerPlantAggregator {
  powerPerPeriodList: Map<Date, number>;
  
  constructor() {
    powerPerPeriodList = new Map<Date, number>();
  }
  
  getPowerPerPeriodList() {
    return powerPerPeriodList;
  }
  
  addPeriodPower(startDate: Date, powerValue: number) {
    if (powerPerPeriodList.has(startDate)) {
      let prevPower = powerPerPeriodList.get(startDate);
      powerPerPeriodList.set(startDate, prevPower + powerValue);
    }
  }
}