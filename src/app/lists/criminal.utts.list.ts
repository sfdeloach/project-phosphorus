import { Injectable } from '@angular/core';
import { Statute } from '../models/statute.model';

@Injectable()
export class CriminalUttsList {
  get criminalUtts(): Statute[] {
    return [
      new Statute('316.027', '2a'),
      new Statute('316.027', '2b'),
      new Statute('316.027', '2c'),
      new Statute('316.061', '1'),
      new Statute('316.066', '3b'),
      new Statute('316.066', '3c'),
      new Statute('316.066', '3d'),
      new Statute('316.192', ''),
      new Statute('316.193', ''),
      new Statute('316.1935', ''),
      new Statute('316.1939', ''),
      new Statute('320.02', ''),
      new Statute('320.07', '3c'),
      new Statute('320.131', '5'),
      new Statute('320.131', '6'),
      new Statute('320.131', '7'),
      new Statute('320.261', ''),
      new Statute('320.38', ''),
      new Statute('322.03', '1'),
      new Statute('322.03', '1a'),
      new Statute('322.03', '1b'),
      new Statute('322.03', '3'),
      new Statute('322.03', '3b'),
      new Statute('322.03', '4'),
      new Statute('322.03', '5'),
      new Statute('322.031', ''),
      new Statute('322.34', '2'),
      new Statute('322.34', '2a'),
      new Statute('322.34', '2b'),
      new Statute('322.34', '2c'),
      new Statute('322.34', '5'),
      new Statute('322.34', '6a'),
      new Statute('322.34', '6b'),
      new Statute('322.34', '7a'),
      new Statute('322.34', '7b'),
      new Statute('322.34', '10b')
    ];
  }
}
