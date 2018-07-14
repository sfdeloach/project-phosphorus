import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, NgControlStatusGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHttpService } from '../../../services/officer.http.service';
import { Department } from '../../../services/lists/department.list';

import { Officer } from '../../../models/officer.model';
import { Message } from '../../../models/message.model';
import { UpdateResponse } from '../../../models/responses/update.model';

@Component({
  selector: 'app-officer-squad',
  templateUrl: './officer-squad.component.html',
  styleUrls: ['./officer-squad.component.css']
})
export class OfficerSquadComponent implements OnInit, OnDestroy {
  divisionForm: FormGroup;
  department = new Department();
  squads = [];
  message: Message = new Message();
  response: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private ofcService: OfficerHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.squads = this.department.getStructureArray();

    const form = {};
    this.squads.forEach(element => {
      form[element.squad] = false;
    });

    this.divisionForm = this.formBuilder.group(form);

    this.response = this.ofcService.response.subscribe(
      (res: UpdateResponse) => {
        this.message.info = undefined;
        if (res.keg) {
          this.message.danger = 'API is working, but unable to connect to database';
          console.error(res);
        } else if (res.message) {
          this.message.danger = 'Unable to connect to the API';
          console.error(res);
        } else if (res.ok) {
          this.router.navigate(['/officers']);
        } else {
          this.message.warning = 'Something weird just happened...';
          console.log('We received something unexpected from the server.');
          console.error(res);
        }
      }
    );

    this.message = new Message();
  }

  ngOnDestroy() {
    this.response.unsubscribe();
  }

  onSubmit() {
    this.message.info = 'Updating squad assignments';
    const query = [];

    for (const squad in this.divisionForm.value) {
      if (this.divisionForm.value[squad]) {
        query.push({ squad: squad });
      }
    }

    this.ofcService.updateSquadAssignments({
      '$or': ((query.length === 0) ? null : query)
    });
  }

  setAll(bool: boolean) {
    const form = {};
    this.squads.forEach(element => {
      form[element.squad] = bool;
    });

    this.divisionForm.setValue(form);
  }

}
