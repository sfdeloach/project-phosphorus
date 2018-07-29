export class Officer {

  constructor(
    public deptID: number, // unique 3-digit number
    public name: {
      last: string,
      first: string
    },
    public squad: string,
    public _id?: string,    // key assigned by database
    public division?: string,
    public effDate?: Date,
    public include?: boolean,
    public error?: any
  ) { }

}
