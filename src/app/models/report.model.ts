import { Offense } from './offense.model';
import { Officer } from './officer.model';

export class Report {

  constructor(
    public caseNbr: string,
    public reportDate: Date,
    public type: string,
    public offenses: Offense[],
    public clearance: string,
    public reportingOfc: number
  ) { }

}
