export enum PowerPlantStatus {
  Loaded,
  InProgress,
  Completed,
  Failed
}

export class PowerPlant {
  name: string;
  uri: string;
  status: PowerPlantStatus;
  
  constructor(name: string, uri: string) {
    this.name = name;
    this.uri = uri;
    this.status = PowerPlantStatus.Loaded;
  }
}