import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerService } from '../../../services/officer.http.service';

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
  responseX: Subscription;
  @ViewChild('deptIDInput') deptID: ElementRef; // used to autofocus deptID field

  constructor(
    private fb: FormBuilder,
    private ofcService: OfficerService
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

    this.responseX = this.ofcService.response.subscribe(
      (res: InsertManyResponse<Officer>) => {
        this.message.info = undefined;
        if (res.result.ok) {
          this.message.success = "Officer added"
        } else {
          this.message.danger = "Unable to add officer"
        }
      }
    );

    this.message = new Message();
    this.resetForm();
  }

  ngOnDestroy() {
    this.responseX.unsubscribe();
  }

  onSubmit() {
    this.message = new Message('Saving officer, please wait...');
    this.resetForm();
    this.ofcService.insertOfficer(this.newOfficerForm.value);
  }

  resetForm() {
    this.newOfficerForm.reset();
    this.deptID.nativeElement.focus();
  }

}
