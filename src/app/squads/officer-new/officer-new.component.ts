import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SquadService } from '../../services/squad.service';

import { ServerResponse } from '../../models/server-response.model';

@Component({
  selector: 'app-officer-new',
  templateUrl: './officer-new.component.html',
  styleUrls: ['./officer-new.component.css']
})
export class OfficerNewComponent implements OnInit {
  newOfficerForm: FormGroup;
  serverResponse: ServerResponse;

  constructor(
    private fb: FormBuilder,
    private squadService: SquadService
  ) { }

  ngOnInit() {
    this.newOfficerForm = this.fb.group({
      'deptID': ['', Validators.required],
      'radioID': '',
      'name': this.fb.group({
        'last': ['', Validators.required],
        'first': ['', Validators.required]
      }),
      'squad': ''
    });

    this.squadService.serverResponse.subscribe(
      (res: ServerResponse) => {
        this.serverResponse = res;
      }
    );
  }

  onSubmit() {
    console.log(this.newOfficerForm.value);
    this.squadService.insertOfficer(this.newOfficerForm.value);
    this.resetForm();
  }

  resetForm() {
    this.newOfficerForm.reset();
  }

  closeAlert() {
    this.serverResponse = null;
  }

}
