export class ServerResponse {

  constructor(
    public error: boolean,
    public message:  string,
    public lines: number
  ) { }

}
