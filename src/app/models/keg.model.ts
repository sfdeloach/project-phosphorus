export class Keg {

  constructor(
    public collection?: string,
    public query?: Object,
    public doc?: Object,
    public documents?: Object[],
    public removeResult?: Object,
    public replaceOneResult?: Object,
    public insertManyResult?: Object,
    public findResult?: Object
  ) { }
}
