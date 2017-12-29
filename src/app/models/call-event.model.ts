export class CallEvent {

  constructor(
    public eventNumber: number,
    public initDateTime: Date,
    public source: string,
    public eventType: string,
    public unitID: string,
    public officer: { last: string, first: string },
    public caseNumber: string,
    public clearingOfficer: string
  ) { }

}
