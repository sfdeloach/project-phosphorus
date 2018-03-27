export class Officer {

  constructor(
    public _id: string, // key assigned by database
    public deptID: number,  // Badge or ID number, immutable
    public name: {
      last: string,
      first: string
    },
    public squad: string,
    public effDate: Date,
    public include: boolean,
    public error?: string
  ) { }

}
