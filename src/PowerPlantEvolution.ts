import InputReader, {dateFormat} from "./InputReader";
import PowerPlantLoader from "./PowerPlantLoader";
import { PowerPlantStatus } from "./PowerPlant";

import { format, addMinutes } from 'date-fns';
import fetch from 'node-fetch';

class PowerPlantEvolution {
  from: Date;
  to: Date;
  
  getInputs() {
    from = InputReader.readDate(`Entrer une date de debut (${dateFormat}): `); // toUppercase
    to = InputReader.readDate(`Entrer une date de fin (${dateFormat}): `);
  }
  
  compute() {
    getInputs();
    let powerPlants = PowerPlantLoader.getPowerPlants();
    let aggregator = new PowerPlantAggregator();
    let requestManager = new PowerPlantRequestManager(this.from, this.to, powerPlants, aggregator);
    requestManager.requestPowerPlantsData();
    
    // Wait untill all requests are done
    let done = false;
    while (!done) {
      powerPlants.reduce((acc, ppValue) => {
        console.log(ppValue.status);
        return (acc && (ppValue.status === PowerPlantStatus.InProgress));
      }, true);
      await new Promise(f => setTimeout(f, 1000));
    }
    
    // Display aggregation
    let startDatePowerList = aggreagtor.getPowerPerPeriodList();
    let periodPowerList = [];
    startDatePowerList.forEach((val: number, key: Date) => {
      let pp = new PeriodPower(val, key, addMinutes(key, 15));
      periodPowerList.push(pp);
    });
    console.log(JSON.stringify(periodPowerList));
  }

}