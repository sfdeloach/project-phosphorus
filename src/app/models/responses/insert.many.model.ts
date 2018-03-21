import { Keg } from '../keg.model';

export class InsertManyResponse<T> {

  constructor(
    public result?: {
      ok: number,
      n: number
    },
    public ops?: T[],
    public insertedCount?: number,
    public insertedIds?: Object,
    public message?: string,
    public error?: string,
    public keg?: Keg
  ) { }

}
