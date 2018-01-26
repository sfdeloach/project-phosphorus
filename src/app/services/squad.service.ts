import { Injectable, OnInit } from '@angular/core';

import { Officer } from '../models/officer.model';

@Injectable()
export class SquadService {
  officers: Officer[] = [
    new Officer(531, "AB11", {last: "Young", first: "Steve"}, "Bravo"),
    new Officer(532, "AB12", {last: "Mongells", first: "Tony"}, "Bravo"),
    new Officer(533, "AB13", {last: "Drexler", first: "Timothy"}, "Bravo")
  ];

  constructor() { }

  getOfficers(): Officer[] {
    return this.officers;
  }

  getOfficer(id: number): Officer {
    return this.officers[0];
  }

}
