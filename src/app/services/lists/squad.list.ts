import { Injectable } from '@angular/core';

@Injectable()
export class SquadList {
  squads: string[] = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Street Crimes',
    'Traffic',
    'Uptown/Gateway'
  ]
  
  constructor() { }

}
