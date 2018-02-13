import { Report } from './report.model';
import { Officer } from './officer.model';

export class Call {

  constructor(
    public eventNbr: number,
    public created: Date,
    public eventType: string,
    public src: string,
    public units: Officer[],
    public primaryUnit: Officer,
    public disps: string[]
  ) { }

}