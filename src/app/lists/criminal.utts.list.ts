import { Injectable } from '@angular/core';
import { Statute } from '../models/statute.model';

@Injectable()
export class CriminalUttsList {
  get criminalUtts(): Statute[] {
    return [
      new Statute('316.027', ['2a', '2b', '2c']),
      new Statute('316.061', ['1']),
      new Statute('316.066', ['3b', '3c', '3d']),
      new Statute('316.192'),
      new Statute('316.193'),
      new Statute('316.1935'),
      new Statute('316.1939'),
      new Statute('320.02'),
      new Statute('320.07', ['3c']),
      new Statute('320.131', ['5', '6', '7']),
      new Statute('320.261'),
      new Statute('320.38'),
      new Statute('322.03', ['1', '1a', '1b', '3', '3b', '4', '5']),
      new Statute('322.031'),
      new Statute('322.34', ['2', '2a', '2b', '2c', '5', '6a', '6b', '7a', '7b', '10b'])
    ];
  }
}
