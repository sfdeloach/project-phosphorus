import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('deptIDInput') deptID: ElementRef; // used to autofocus deptID field

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
        setTimeout(() => {
          this.serverResponse = undefined;
        }, 1500);
      }
    );

    this.resetForm();
  }

  onSubmit() {
    this.squadService.insertOfficer(this.newOfficerForm.value);
    this.resetForm();
  }

  resetForm() {
    this.newOfficerForm.reset();
    this.deptID.nativeElement.focus();
  }

}
