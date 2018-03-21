import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHTTPService } from '../../../services/officer.http.service';

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
  message: Message;
  response: Subscription;
  @ViewChild('deptIDInput') deptID: ElementRef; // used to autofocus deptID field

  constructor(
    private fb: FormBuilder,
    private ofcService: OfficerHTTPService
  ) { }

  ngOnInit() {
    this.newOfficerForm = this.fb.group({
      'deptID': ['', Validators.required],
      'name': this.fb.group({
        'last': ['', Validators.required],
        'first': ['', Validators.required]
      }),
      'squad': ''
    });

    this.response = this.ofcService.response.subscribe(
      (res: InsertManyResponse<Officer>) => {
        this.message.info = undefined;
        if (res.error) {
          this.message.danger = res.error;
          console.error(res);
        } else if (res.result.ok) {
          this.message.success = "Officer saved"
        } else {
          this.message.warning = 'Unsure what happened'
        }
      }
    );

    this.resetForm();
  }

  ngOnDestroy() {
    this.response.unsubscribe();
  }

  onSubmit() {
    this.message = new Message('Saving officer, please wait...');
    this.ofcService.insertOfficer(this.newOfficerForm.value);
    this.resetForm();
  }

  resetForm() {
    this.message = new Message();
    this.newOfficerForm.reset();
    this.deptID.nativeElement.focus();
  }

}
