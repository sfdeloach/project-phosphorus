export class Offense {

  constructor(
    public offenseNo: number,
    public statute: string,
    public statuteDesc: string,
    public ucrCode: string,
    public ucrDesc: string,
    public ncicLevel: string // felony or misdemeanor
  ) { }

}
