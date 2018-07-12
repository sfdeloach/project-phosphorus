export class Department {
  private structure = {
    Operations: ['Alpha', 'Bravo', 'Charlie', 'Delta'],
    'Special Operations': ['Traffic', 'School Resource', 'Uptown', 'COPs'],
    Investigations: ['CIS', 'SIS', 'Street Crimes'],
    'Management Support': ['Training', 'Field Training', 'Emergency Management']
  };

  getDivisions() {
    return Object.getOwnPropertyNames(this.structure);
  }

  getSquads(division) {
    return this.structure[division];
  }
}
