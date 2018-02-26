import { Component, OnInit, OnDestroy } from '@angular/core'

import { OfficerService } from '../../services/officer.http.service';
import { Subscription } from 'rxjs/Subscription';

import { Officer } from '../../models/officer.model';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit, OnDestroy {
  officers: Officer[];
  officerSubscription: Subscription;
  result: Result;
  toggle: number = 1; // used for ascending and descending sorting

  constructor(
    private officerService: OfficerService
  ) { }

  ngOnInit() {
    this.getOfficers();
    this.officerSubscription = this.officerService.serverResponse.subscribe(
      res => {
        this.result = res;
        setTimeout(() => {
          this.result = undefined;
        }, 1500);
      }
    );
  }

  ngOnDestroy() {
    this.officerSubscription.unsubscribe();
  }

  getOfficers() {
    this.officers = [];
    this.officerService.getOfficers();
    this.officerService.officers.subscribe(officers => {
      this.officers = officers.sort(this.sortOfficers);
    });
  }

  deleteOfc(ofc: Officer) {
    this.officerService.deleteOfficer(ofc);
    this.officers.splice(this.officers.findIndex(
      element => {
        return element._id === ofc._id;
      }), 1);
  }

  onHeaderClick(parentProperty: string, childProperty?: string) {
    this.toggle = this.toggle * -1;
    this.officers.sort(
      this.sortByProperty(
        this.toggle, parentProperty, childProperty
      )
    );
  }

  /*
     this is the default sort when the component is initialized
     sort officers by squad, last name, and deptID
  */
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

  /*
     this is the sort used when the user clicks on a table header
  */
  sortByProperty(toggle: number, parent: string, child?: string) {
    if (child) {
      return (a: Officer, b: Officer): number => {
        if (a[parent][child] < b[parent][child]) return -1 * toggle;
        if (a[parent][child] > b[parent][child]) return 1 * toggle;
        return 0;
      }
    } else {
      return (a: Officer, b: Officer): number => {
        if (a[parent] < b[parent]) return -1 * toggle;
        if (a[parent] > b[parent]) return 1 * toggle;
        return 0;
      }
    }
  }
}
