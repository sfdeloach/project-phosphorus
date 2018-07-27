import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHttpService } from '../../../services/officer.http.service';
import { Department } from '../../../services/lists/department.list';

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
  message: Message = new Message();
  response: Subscription;
  department = new Department();
  divisions: string[] = [];
  squads: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ofcService: OfficerHttpService
  ) { }

  ngOnInit() {
    this.newOfficerForm = this.formBuilder.group({
      'deptID': ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}$|^[0-9]{2}|^[0-9]$'),
          Validators.max(9999)
        ]],
      'name': this.formBuilder.group({
        'last': ['', Validators.required],
        'first': ['', Validators.required]
      }),
      'division': ['', Validators.required],
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
          this.message.warning = 'Something just happened, and it should not have...';
          console.error(res);
        }
      }
    );

    this.divisions = this.department.getDivisions().sort();
  }

  ngOnDestroy() {
    this.response.unsubscribe();
  }

  onDivisionSelect() {
    this.squads = this.department
      .getSquads(this.newOfficerForm.value.division)
      .sort();
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
