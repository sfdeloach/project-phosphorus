import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHTTPService } from '../../../services/officer.http.service';
import { SquadList } from '../../../services/lists/squad.list';

import { Officer } from '../../../models/officer.model';
import { Message } from '../../../models/message.model';
import { UpdateResponse } from '../../../models/responses/update.model';

@Component({
  selector: 'app-officer-squad',
  templateUrl: './officer-squad.component.html',
  styleUrls: ['./officer-squad.component.css']
})
export class OfficerSquadComponent implements OnInit, OnDestroy {
  squadForm: FormGroup;
  squads: string[];
  message: Message;
  response: Subscription;

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

    this.response = this.ofcService.response.subscribe(
      (res: UpdateResponse) => {
        this.message.info = undefined;
        // TODO: this is not working!!!
        if (res.keg) {
          this.message.danger = "Unable to connect to API";
          console.error(res);
        } else if (res.message) {
          this.message.danger = "Unable to connect to database";
          console.error(res);
        } else if (res.ok) {
          // TODO: route to overview
        } else {
          this.message.warning = 'Something happened, and it should not have';
          console.error(res);
        }
      }
    );

    this.message = new Message();
  }

  ngOnDestroy() {

  }

  // TODO: In progress
  onSubmit() {
    this.message = new Message("Updating squad assignments");
    // send please wait message to screen
    this.ofcService.updateSquadAssignments();
    // wait for response from server and redirect to /officers
  }

}
