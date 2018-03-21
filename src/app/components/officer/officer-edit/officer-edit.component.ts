import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerService } from '../../../services/officer.http.service';

import { Officer } from '../../../models/officer.model';
import { Message } from '../../../models/message.model';
import { ReplaceOneResponse } from '../../../models/responses/replace.one.model';

@Component({
  selector: 'app-officer-edit',
  templateUrl: './officer-edit.component.html',
  styleUrls: ['./officer-edit.component.css']
})
export class OfficerEditComponent implements OnInit, OnDestroy {
  _id: string; // Mongo Object ID
  editOfficerForm: FormGroup;
  message: Message;
  responseX: Subscription;
  officerX: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ofcService: OfficerService
  ) { }

  ngOnInit() {
    this.editOfficerForm = this.fb.group({
      'deptID': ['loading...', Validators.required],
      'name': this.fb.group({
        'last': ['loading...', Validators.required],
        'first': ['loading...', Validators.required]
      }),
      'squad': 'loading...'
    });

    this.responseX = this.ofcService.response.subscribe(
      (res: ReplaceOneResponse) => {
        if (res.nModified === 1) {
          this.router.navigate(['/officers']);
        } else {
          this.message.info = undefined;
          this.message.danger = 'Unable to update officer';
        }
      }
    );

    this.officerX = this.ofcService.officer.subscribe(
      (ofc: Officer) => {
        this.editOfficerForm = this.fb.group({
          'deptID': [ofc.deptID, Validators.required],
          'name': this.fb.group({
            'last': [ofc.name.last, Validators.required],
            'first': [ofc.name.first, Validators.required]
          }),
          'squad': ofc.squad
        });
      }
    );

    this._id = this.route.snapshot.params.id;
    this.ofcService.getOfficer(this._id);
    this.message = new Message();
  }

  ngOnDestroy() {
    this.responseX.unsubscribe();
    this.officerX.unsubscribe();
  }

  onUpdate() {
    this.message.info = "Saving changes, please wait..."
    this.ofcService.updateOfficer(this._id, this.editOfficerForm.value);
  }

  onKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      this.onUpdate();
    }
  }

}
