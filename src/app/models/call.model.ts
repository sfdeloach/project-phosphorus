export class Call {

  constructor(
    public eventNbr: number,
    public created?: Date,
    public eventType?: string,
    public src?: string,
    public radioID?: string,
    public units?: number[],
    public primaryUnit?: number,
    public disps?: string[]
  ) { }

}
