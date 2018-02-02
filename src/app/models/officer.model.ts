export class Officer {

  constructor(
    public _id: any, // key assigned by database
    public deptID: number,  // Badge or ID number, immutable
    public radioID: string, // based on squad and zone assignment, mutable
    public name: {
      last: string,
      first: string
    },
    public squad: string
  ) { }

}
