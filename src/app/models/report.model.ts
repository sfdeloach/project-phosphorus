import { Offense } from './offense.model';
import { Officer } from './officer.model';

export class Report {

  constructor(
    public caseNbr: string,
    public reportDate: Date,
    public type: string,
    public offense: Offense[],
    public clearance: string,
    public reportingOfc: Officer
  ) { }

}
