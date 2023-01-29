import { PowerPlantAggregator } from "./PowerPlantAggregator";
import { PowerPlant, PowerPlantStatus } from "./PowerPlant";

import { parseJSON, format } from 'date-fns';

export class PowerPlantRequestManager {

  from: Date;
  to: Date;
  powerPlants: PowerPlants[];
  aggregator: PowerPlantAggregator;
  minimalPeriod = 15; // 15min period for aggreagtion

  constructor(from: Date, to: Date, powerPlants: PowerPlants[], aggregator: PowerPlantAggregator) {
    this.from = from;
    this.to = to;
    this.powerPlants = powerPlants;
    this.aggregator = aggregator;
  }

  requestPowerPlantsData() {
    let fromStr = format(this.from, dateFormat);
    let toStr = format(this.to, dateFormat);
    this.powerPlants.forEach(pp => {
      sendRequest(fromStr, toStr);
    });
  }
  
  sendRequest(from: string, to: string, pp: PowerPlant) {
    let uri = `${pp.uri}?from=${fromStr}&to=${toStr}`;
    fetch(uri)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        pp.status = PowerPlantStatus.InProgress;
        data.forEach(period => {
          startDate = parseJSON(period.start_time);
          endDate = parseJSON(period.end_time);
          do {
            this.aggregator.addPeriodPower(startDate, powerValue);
            startDate -= this.minimalPeriod;
          } while (startDate > 0);
        })
        pp.status = PowerPlantStatus.Completed;
      })
  }
}