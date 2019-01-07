import { Officer } from '../officer.model';

export class DaysWorked {
  public officer: Officer;
  public 'Days Worked': number;

  constructor(officer: Officer, daysWorked?: number) {
    this.officer = officer;
    daysWorked ? (this['Days Worked'] = daysWorked) : (this['Days Worked'] = 0);
  }
}
