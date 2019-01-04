import { Injectable } from '@angular/core';

@Injectable()
export class Department {
  private structure = {
    Staff: ['Chief', 'Deputy Chief', 'Commander'],
    Operations: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'CSO'],
    'Special Operations': ['COPs', 'School Resource', 'Traffic', 'Uptown'],
    Investigations: ['CIS', 'SIS', 'Street Crimes'],
    'Mgmt Support': ['Emergency Management', 'Field Training', 'Records', 'Support', 'Training'],
    Unassigned: ['OIT', 'OIT (CSO)', 'Resigned', 'Retired']
  };

  getDivisions() {
    return Object.getOwnPropertyNames(this.structure);
  }

  getSquads(division) {
    return this.structure[division];
  }

  getStructure() {
    return this.structure;
  }

  getStructureArray() {
    const result = [];

    this.getDivisions().forEach(div => {
      this.getSquads(div).forEach(element => {
        result.push({ squad: element, division: div });
      });
    });

    result.sort((a, b) => {
      if (a.division < b.division) {
        return -1;
      } else if (a.division > b.division) {
        return 1;
      } else {
        if (a.squad < b.squad) {
          return -1;
        } else if (a.squad > b.squad) {
          return 1;
        }
      }
    });

    return result;
  }
}
