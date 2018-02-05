// TODO - this model is deprecated?

export class CallEvent {

  constructor(
    public caseNbr:  string,
    public clearOfc: string,
    public evtNbr:   number,
    public evtType:  string,
    public date:     Date,
    public ofc: {
      last: string,
      first: string
    },
    public src:      string,
    public unit:     string
  ) { }

}
