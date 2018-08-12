import { Officer } from '../officer.model';

export class NonInitiated {
  public officer: Officer;
  public 'Arrests': number;
  public 'Offense': number;
  public 'Non-Offense': number;
  public 'Crashes': number;
  public 'Calls': number;
  public 'Performance Rating': number;

  constructor(
    officer: Officer,
    arrests?: number,
    offense?: number,
    nonOffense?: number,
    crashes?: number,
    calls?: number,
    perfRating?: number
  ) {
    this.officer = officer;
    arrests ? (this['Arrests'] = arrests) : (this['Arrests'] = 0);
    offense
      ? (this['Offense'] = offense)
      : (this['Offense'] = 0);
    nonOffense
      ? (this['Non-Offense'] = nonOffense)
      : (this['Non-Offense'] = 0);
    crashes ? (this['Crashes'] = crashes) : (this['Crashes'] = 0);
    calls ? (this['Calls'] = calls) : (this['Calls'] = 0);
    perfRating
      ? (this['Performance Rating'] = perfRating)
      : (this['Performance Rating'] = 0);
  }
}
