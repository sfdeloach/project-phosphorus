import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OfficerService } from '../../../services/officer.http.service';

@Component({
  selector: 'app-officer-new',
  templateUrl: './officer-new.component.html',
  styleUrls: ['./officer-new.component.css']
})
export class OfficerNewComponent implements OnInit {
  newOfficerForm: FormGroup;
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

    this.resetForm();
  }

  onSubmit() {
    this.ofcService.insertOfficer(this.newOfficerForm.value);
    this.resetForm();
  }

  resetForm() {
    this.newOfficerForm.reset();
    this.deptID.nativeElement.focus();
  }

}
