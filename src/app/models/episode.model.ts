import { Call } from './call.model';
import { Report } from './report.model';

export class Episode {

  constructor(
    public call: Call,
    public reports?: Report[],
    public _id?: any
  ) { }

}
