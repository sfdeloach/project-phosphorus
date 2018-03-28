import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHTTPService } from '../../../services/officer.http.service';
import { SquadList } from '../../../services/lists/squad.list';

import { Officer } from '../../../models/officer.model';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-officer-squad',
  templateUrl: './officer-squad.component.html',
  styleUrls: ['./officer-squad.component.css']
})
export class OfficerSquadComponent implements OnInit, OnDestroy {
  squadForm: FormGroup;
  squads: string[];

  constructor(
    private formBuilder: FormBuilder,
    private squadList: SquadList,
    private ofcService: OfficerHTTPService
  ) { }

  ngOnInit() {
    this.squads = this.squadList.squads;
    let form = {};
    this.squads.forEach(squad => {
      form[squad] = false;
    });

    this.squadForm = this.formBuilder.group(form);
  }

  ngOnDestroy() {

  }

  // TODO: In progress
  onSubmit() {
    // send please wait message to screen
    this.ofcService.updateSquadAssignments();
    // wait for response from server and redirect to /officers
  }

}
