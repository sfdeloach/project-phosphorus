export class Result {

  constructor(
    public isOkay: boolean,
    public message?: string,
    public num?: number,
    public timestamp?: Date
  ) { }

}
