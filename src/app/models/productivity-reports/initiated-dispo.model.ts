import { Officer } from '../officer.model';

export class InitiatedDispo {
  public officer: Officer;
  public 'Felony Arrests': number;
  public 'Misd Arrests': number;
  public 'DUI Arrests': number;
  public 'Criminal UTTs': number;
  public 'UTTs': number;
  public 'Warnings': number;
  public 'FCCs': number;
  public 'TPs': number;
  public 'CJIS': number;

  constructor(
    officer: Officer,
    felonyArrests?: number,
    misdArrests?: number,
    duiArrests?: number,
    criminalUTTs?: number,
    utts?: number,
    warnings?: number,
    fccs?: number,
    tps?: number,
    cjis?: number
  ) {
    this.officer = officer;
    felonyArrests
      ? (this['Felony Arrests'] = felonyArrests)
      : (this['Felony Arrests'] = 0);
    misdArrests
      ? (this['Misd Arrests'] = misdArrests)
      : (this['Misd Arrests'] = 0);
    duiArrests ? (this['DUI Arrests'] = duiArrests) : (this['DUI Arrests'] = 0);
    criminalUTTs
      ? (this['Criminal UTTs'] = criminalUTTs)
      : (this['Criminal UTTs'] = 0);
    utts ? (this['UTTs'] = utts) : (this['UTTs'] = 0);
    warnings ? (this['Warnings'] = warnings) : (this['Warnings'] = 0);
    fccs ? (this['FCCs'] = fccs) : (this['FCCs'] = 0);
    tps ? (this['TPs'] = tps) : (this['TPs'] = 0);
    cjis ? (this['CJIS'] = cjis) : (this['CJIS'] = 0);
  }
}
