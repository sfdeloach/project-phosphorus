export class Result {
  constructor(
    public error: Error,
    public message?: string,
    public num?: number
  ) { }
}
