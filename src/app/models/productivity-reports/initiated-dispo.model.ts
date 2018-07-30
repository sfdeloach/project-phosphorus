import { Officer } from '../officer.model';

export class InitiatedDispo {
  public officer: Officer;
  public 'Felony': number;
  public 'Misdemeanor': number;
  public 'DUI': number;
  public 'Warrant': number;
  public 'Capias': number;
  public 'Reports': number;
  public 'Criminal UTTs': number;
  public 'UTTs': number;
  public 'Warnings': number;

  constructor(
    officer: Officer,
    felonyArrests?: number,
    misdArrests?: number,
    duiArrests?: number,
    warrant?: number,
    capias?: number,
    reports?: number,
    criminalUTTs?: number,
    utts?: number,
    warnings?: number
  ) {
    this.officer = officer;
    felonyArrests ? (this['Felony'] = felonyArrests) : (this['Felony'] = 0);
    misdArrests
      ? (this['Misdemeanor'] = misdArrests)
      : (this['Misdemeanor'] = 0);
    duiArrests ? (this['DUI'] = duiArrests) : (this['DUI'] = 0);
    warrant ? (this['Warrant'] = warrant) : (this['Warrant'] = 0);
    capias ? (this['Capias'] = capias) : (this['Capias'] = 0);
    reports ? (this['Reports'] = reports) : (this['Reports'] = 0);
    criminalUTTs
      ? (this['Criminal UTTs'] = criminalUTTs)
      : (this['Criminal UTTs'] = 0);
    utts ? (this['UTTs'] = utts) : (this['UTTs'] = 0);
    warnings ? (this['Warnings'] = warnings) : (this['Warnings'] = 0);
  }
}
