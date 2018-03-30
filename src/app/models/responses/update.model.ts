import { Keg } from '../keg.model';

export class UpdateResponse {

  constructor(
    public n: number,
    public nModified: number,
    public ok: number,
    public message?: string, // defined if API not connected
    public keg?: Keg // defined if db not connected
  ) { }

}
