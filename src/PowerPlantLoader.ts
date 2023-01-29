import powerplantsParams from "data/powerplants.json";

import { PowerPlant } from "./PowerPlant";

export class PowerPlantLoader {
  
  static getPowerPlants(): PowerPlant[] {
    powerplantsParams.forEach(pp => {
      let powerPlant = new PowerPlant(pp.name, pp.URI);
    });
  }
}