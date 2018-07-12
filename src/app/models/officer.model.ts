export class Officer {

  constructor(
    public _id: string,    // key assigned by database
    public deptID: number, // unique 3-digit number
    public name: {
      last: string,
      first: string
    },
    public division: string,
    public squad: string,
    public effDate: Date,
    public include: boolean,
    public error?: any
  ) { }

}

// Experimental...TODO? Implement this class?

export class Officer2 {

  constructor(
    public _id: string,    // key assigned by database
    public deptID: number, // unique 3-digit number
    public name: {
      last: string,
      first: string
    },
    public assignments: Assignment[],
    public include: boolean,
    public error?: any
  ) { }

}

export class Assignment {
  constructor(
    public effDate: Date,
    public squad: string
  ) { }
}
