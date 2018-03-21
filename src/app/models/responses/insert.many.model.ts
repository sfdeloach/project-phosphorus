export class InsertManyResponse<T> {

  constructor(
    public result: {
      ok: number,
      n: number
    },
    public ops: T[],
    public insertedCount: number,
    public insertedIds: Object
  ) { }

}
