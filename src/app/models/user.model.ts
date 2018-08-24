export class User {
  constructor(
    public authLevel: string,
    public username: string,
    public deptID?: number,
    public firstname?: string,
    public lastname?: string,
    public password?: string,
    public _id?: string,
    public error?: string
  ) {}
}
