import { Officer } from '../officer.model';

export class NonInitiated {
  public officer: Officer;
  public 'Arrests': number;
  public 'Offense Reports': number;
  public 'Non-Offense Reports': number;
  public 'Crashes': number;
  public 'Total Calls': number;

  constructor(
    officer: Officer,
    arrests?: number,
    offenseReports?: number,
    nonOffenseReports?: number,
    crashes?: number,
    totalCalls?: number
  ) {
    this.officer = officer;
    arrests ? (this['Arrests'] = arrests) : (this['Arrests'] = 0);
    offenseReports
      ? (this['Offense Reports'] = offenseReports)
      : (this['Offense Reports'] = 0);
    nonOffenseReports
      ? (this['Non-Offense Reports'] = nonOffenseReports)
      : (this['Non-Offense Reports'] = 0);
    crashes ? (this['Crashes'] = crashes) : (this['Crashes'] = 0);
    totalCalls ? (this['Total Calls'] = totalCalls) : (this['Total Calls'] = 0);
  }
}
