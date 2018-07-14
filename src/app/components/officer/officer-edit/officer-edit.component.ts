import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHttpService } from '../../../services/officer.http.service';
import { Department } from '../../../services/lists/department.list';

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
  department = new Department();
  divisions: string[] = [];
  squads: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ofcService: OfficerHttpService
  ) {}

  ngOnInit() {
    this.divisions = this.department.getDivisions().sort();

    this.editOfficerForm = this.fb.group({
      'deptID': [
        'loading...',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$|^[0-9]{2}|^[0-9]$'),
          Validators.max(9999)
        ]
      ],
      'name': this.fb.group({
        last: ['loading...', Validators.required],
        first: ['loading...', Validators.required]
      }),
      'division': ['loading...', Validators.required],
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

    this.officer = this.ofcService.officer.subscribe((ofc: Officer) => {
      this.editOfficerForm = this.fb.group({
        'deptID': [
          ofc.deptID,
          [
            Validators.required,
            Validators.pattern('^[0-9]{3}$|^[0-9]{2}|^[0-9]$'),
            Validators.max(9999)
          ]
        ],
        'name': this.fb.group({
          last: [ofc.name.last, Validators.required],
          first: [ofc.name.first, Validators.required]
        }),
        'division': ofc.division,
        'squad': ofc.squad,
        'effDate': ofc.effDate,
        'include': ofc.include
      });
      this.onDivisionSelect();
    });

    this._id = this.route.snapshot.params.id;
    this.ofcService.getOfficer(this._id);
    this.message = new Message();
  }

  ngOnDestroy() {
    this.response.unsubscribe();
    this.officer.unsubscribe();
  }

  onDivisionSelect() {
    this.squads = this.department
      .getSquads(this.editOfficerForm.value.division)
      .sort();
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
