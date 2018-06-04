import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHttpService } from '../../../services/officer.http.service';
import { SquadList } from '../../../services/lists/squad.list';

import { Officer } from '../../../models/officer.model';
import { Message } from '../../../models/message.model';
import { InsertManyResponse } from '../../../models/responses/insert.many.model';

@Component({
  selector: 'app-officer-new',
  templateUrl: './officer-new.component.html',
  styleUrls: ['./officer-new.component.css']
})
export class OfficerNewComponent implements OnInit, OnDestroy {
  newOfficerForm: FormGroup;
  officer: Officer;
  message: Message;
  response: Subscription;
  squads: string[];

  constructor(
    private formBuilder: FormBuilder,
    private ofcService: OfficerHttpService,
    private squadList: SquadList
  ) { }

  ngOnInit() {
    this.newOfficerForm = this.formBuilder.group({
      'deptID': ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$|^[0-9]{2}|^[0-9]$')
        ]],
      'name': this.formBuilder.group({
        'last': ['', Validators.required],
        'first': ['', Validators.required]
      }),
      'squad': ['', Validators.required],
      'effDate': ['', Validators.required],
      'include': [true, Validators.required]
    });

    this.response = this.ofcService.response.subscribe(
      (res: InsertManyResponse<Officer>) => {
        this.message.info = undefined;
        if (res.error) {
          this.message.danger = res.error;
          console.error(res);
        } else if (res.result.ok) {
          this.message.success = this.officer.name.last + ', '
            + this.officer.name.first + ' successfully added';
        } else {
          this.message.warning = 'Something happened, and it should not have';
          console.error(res);
        }
      }
    );

    this.squads = this.squadList.squads;
    this.message = new Message();
  }

  ngOnDestroy() {
    this.response.unsubscribe();
  }

  onSubmit() {
    this.message = new Message('Saving officer, please wait...');
    this.officer = this.newOfficerForm.value;
    this.ofcService.insertOfficer(this.officer);
    this.resetForm();
  }

  resetForm() {
    this.message = new Message();
    this.newOfficerForm.reset();
  }

}
