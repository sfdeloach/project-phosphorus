import { Injectable } from '@angular/core';

@Injectable()
export class SquadList {
  squads: string[] = [
    'Inv - CIS',
    'Inv - SCU',
    'Inv - SIS',
    'Mgmt - OIT',
    'Mgmt - Training',
    'Ops - Alpha',
    'Ops - Bravo',
    'Ops - Charlie',
    'Ops - CSO',
    'Ops - Delta',
    'SOps - COPS',
    'SOps - SRO',
    'SOps - Traffic',
    'SOps - Uptown'
  ];

  constructor() { }

}
