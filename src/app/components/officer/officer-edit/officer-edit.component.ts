import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHttpService } from '../../../services/officer.http.service';
import { SquadList } from '../../../services/lists/squad.list';

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
  response: Subscription;
  officer: Subscription;
  squads: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ofcService: OfficerHttpService,
    private squadList: SquadList
  ) { }

  ngOnInit() {
    this.editOfficerForm = this.fb.group({
      'deptID': ['loading...',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$|^[0-9]{2}|^[0-9]$')
        ]],
      'name': this.fb.group({
        'last': ['loading...', Validators.required],
        'first': ['loading...', Validators.required]
      }),
      'squad': ['loading...', Validators.required],
      'effDate': ['', Validators.required],
      'include': ['', Validators.required]
    });

    this.response = this.ofcService.response.subscribe(
      (res: ReplaceOneResponse) => {
        if (res.nModified === 1) {
          this.router.navigate(['/officers']);
        } else {
          this.message.info = undefined;
          this.message.danger = 'Unable to update officer';
          console.error(res);
        }
      }
    );

    this.officer = this.ofcService.officer.subscribe(
      (ofc: Officer) => {
        this.editOfficerForm = this.fb.group({
          'deptID': [ofc.deptID, Validators.required],
          'name': this.fb.group({
            'last': [ofc.name.last, Validators.required],
            'first': [ofc.name.first, Validators.required]
          }),
          'squad': ofc.squad,
          'effDate': ofc.effDate,
          'include': ofc.include
        });
      }
    );

    this._id = this.route.snapshot.params.id;
    this.ofcService.getOfficer(this._id);
    this.message = new Message();
    this.squads = this.squadList.squads;
  }

  ngOnDestroy() {
    this.response.unsubscribe();
    this.officer.unsubscribe();
  }

  onUpdate() {
    this.message.info = 'Saving changes, please wait...';
    this.ofcService.updateOfficer(this._id, this.editOfficerForm.value);
  }

  onKeypress(evt: KeyboardEvent) {
    if (evt.key === 'Enter') {
      this.onUpdate();
    }
  }

}
