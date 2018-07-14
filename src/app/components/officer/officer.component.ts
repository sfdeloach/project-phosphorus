import { Component, OnInit, OnDestroy } from '@angular/core';

import { OfficerHttpService } from '../../services/officer.http.service';
import { Subscription } from 'rxjs/Subscription';

import { Officer } from '../../models/officer.model';
import { Message } from '../../models/message.model';
import { HttpErrorResponse } from '../../models/responses/http.error.model';
import { RemoveResponse } from '../../models/responses/remove.model';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit, OnDestroy {
  allOfficers: Officer [];
  officers: Officer[];
  officer: Officer;
  ofcSubscription: Subscription;
  response: Subscription;
  message: Message = new Message();
  sortToggle = 1;

  constructor(
    private officerService: OfficerHttpService
  ) { }

  ngOnInit() {
    this.ofcSubscription = this.officerService.officers.subscribe(officers => {
      if (!officers[0].error) {
        this.allOfficers = officers.sort(this.sortOfficers);
        this.onTabChange('All');
      } else if (<HttpErrorResponse>officers[0].name === 'HttpErrorResponse') {
        this.message.danger = 'Unable to connect to API';
        console.error(officers[0]);
      } else {
        this.message.danger = 'Unable to connect to database';
        console.error(officers[0]);
      }
    });

    this.response = this.officerService.response.subscribe((res: RemoveResponse) => {
      if (res.n === 1 && res.ok === 1) {
        this.message.success = this.officer.name.last + ', '
          + this.officer.name.first + ' removed';
      } else if (res.n === 0 && res.ok === 1) {
        this.message.warning = 'Unable to remove officer';
        console.warn(res);
      } else if (res.n === 0 && res.ok === 0) {
        this.message.danger = 'Response from database not ok';
        console.error(res);
      }
    });

    this.officerService.getOfficers();
  }

  ngOnDestroy() {
    this.ofcSubscription.unsubscribe();
    this.response.unsubscribe();
  }

  onTabChange(tab) {
    this.officers = this.allOfficers;
    if (tab !== 'All') {
      const filteredOfcList: Officer[] = [];
      this.officers.forEach(ofc => {
        if (ofc.division === tab) {
          filteredOfcList.push(ofc);
        }
      });
      this.officers = filteredOfcList;
    }
  }

  deleteOfc(ofc: Officer) {
    this.officer = ofc;
    this.officerService.deleteOfficer(ofc);
    this.officers.splice(this.officers.findIndex(
      element => {
        return element._id === ofc._id;
      }), 1);
  }

  onHeaderClick(parentProperty: string, childProperty?: string) {
    this.sortToggle = this.sortToggle * -1;
    this.officers.sort(
      this.sortByProperty(
        this.sortToggle, parentProperty, childProperty
      )
    );
  }

  /*
     this is the default sort when the component is initialized
     sort officers by squad, last name, and deptID
  */
  sortOfficers(a: Officer, b: Officer): number {
    if (a.squad < b.squad) { return -1; }
    if (a.squad > b.squad) { return 1; }
    if (a.squad === b.squad) {
      if (a.name.last < b.name.last) { return -1; }
      if (a.name.last > b.name.last) { return 1; }
      if (a.name.last === b.name.last) {
        if (a.deptID < b.deptID) { return -1; }
        if (a.deptID > b.deptID) { return 1; }
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
        if (a[parent][child] < b[parent][child]) { return -1 * toggle; }
        if (a[parent][child] > b[parent][child]) { return 1 * toggle; }
        return 0;
      };
    } else {
      return (a: Officer, b: Officer): number => {
        if (a[parent] < b[parent]) { return -1 * toggle; }
        if (a[parent] > b[parent]) { return 1 * toggle; }
        return 0;
      };
    }
  }
}
