import { Officer } from '../officer.model';

export class OverallInitiated {
  public officer: Officer;
  public 'On View': number;
  public 'On View w/ Report': number;
  public 'Traffic Stops': number;

  constructor(
    officer: Officer,
    onView?: number,
    onViewReport?: number,
    trafficStops?: number
  ) {
    this.officer = officer;
    onView ? (this['On View'] = onView) : (this['On View'] = 0);
    onViewReport
      ? (this['On View w/ Report'] = onViewReport)
      : (this['On View w/ Report'] = 0);
    trafficStops
      ? (this['Traffic Stops'] = trafficStops)
      : (this['Traffic Stops'] = 0);
  }
}
