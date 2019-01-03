export class Offense {
  constructor(
    public offenseNo: number, // [4]
    public statute: string, // [5]
    public statuteSec: string, // [6]
    public statuteDesc: string, // [7]
    public ucrCode: string, // [8]
    public ucrDesc: string, // [9]
    public ncicLevel: string // [10]
  ) {}
}
