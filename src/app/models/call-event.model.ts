export class CallEvent {

  constructor(
    public caseNumber: string,
    public clearingOfficer: string,
    public eventNumber: number,
    public eventType: string,
    public initDateTime: Date,
    public officer: {
      last: string,
      first: string
    },
    public source: string,
    public unitID: string
  ) { }

}
