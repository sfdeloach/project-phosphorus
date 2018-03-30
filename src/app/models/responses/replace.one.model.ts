export class ReplaceOneResponse {

  constructor(
    public n: number,
    public nModified: number,
    public ok: number,
    public error?: ProgressEvent
  ) { }

}
