import { Component, OnInit } from '@angular/core';
import { SquadService } from '../services/squad.service';
import { Officer } from '../models/officer.model';
import { ServerResponse } from '../models/server-response.model';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {
  officers: Officer[];
  serverResponse: ServerResponse;

  constructor(
    private squadService: SquadService
  ) { }

  ngOnInit() {
    this.getOfficers();
    this.squadService.serverResponse.subscribe(
      res => {
        this.serverResponse = res;
        setTimeout(() => {
          this.serverResponse = undefined;
        }, 1500);
      }
    );
  }

  getOfficers() {
    this.officers = [];
    this.squadService.getOfficers();
    this.squadService.officers.subscribe(officers => {
      this.officers = officers.sort(this.sortOfficers);
    });
  }

  deleteOfc(ofc: Officer) {
    this.squadService.deleteOfficer(ofc);
    this.officers.splice(this.officers.findIndex(
      element => {
        return element._id === ofc._id;
      }), 1);
  }

  // compare function used to sort officers by squad, last name, and deptID
  sortOfficers(a: Officer, b: Officer): number {
    if (a.squad < b.squad) return -1;
    if (a.squad > b.squad) return 1;
    if (a.squad === b.squad) {
      if (a.name.last < b.name.last) return -1;
      if (a.name.last > b.name.last) return 1;
      if (a.name.last === b.name.last) {
        if (a.deptID < b.deptID) return -1;
        if (a.deptID > b.deptID) return 1;
      }
    }
    return 0;
  }

}
