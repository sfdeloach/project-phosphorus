import { Injectable } from '@angular/core';

@Injectable()
export class SquadList {
  squads: string[] = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'CIS',
    'SIS/SCU',
    'Traffic',
    'SRO',
    'Uptown',
    'COPS',
    'Mgmt Support'
  ];

  constructor() { }

}
