export class RemoveResponse {

  constructor(
    public n: number,
    public ok: number,
    public error?: ProgressEvent
  ) { }

}
