export class Officer {

  constructor(
    public _id: string,    // key assigned by database
    public deptID: number, // unique dept ID number
    public name: {
      last: string,
      first: string
    },
    public squad: string,
    public effDate: Date,
    public include: boolean,
    public error?: any
  ) { }

}
