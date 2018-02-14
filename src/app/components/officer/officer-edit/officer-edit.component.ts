import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OfficerService } from '../../../services/officer.service';

import { Officer } from '../../../models/officer.model';
import { ServerResponse } from '../../../models/server-response.model';

@Component({
  selector: 'app-officer-edit',
  templateUrl: './officer-edit.component.html',
  styleUrls: ['./officer-edit.component.css']
})
export class OfficerEditComponent implements OnInit {
  database_id: string; // this will hold the MongoDB assigned _id field
  editOfficerForm: FormGroup;
  serverResponse: ServerResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ofcService: OfficerService
  ) { }

  ngOnInit() {
    this.editOfficerForm = this.fb.group({
      'deptID': ['loading...please wait...', Validators.required],
      'radioID': 'loading...please wait...',
      'name': this.fb.group({
        'last': ['loading...please wait...', Validators.required],
        'first': ['loading...please wait...', Validators.required]
      }),
      'squad': 'loading...please wait...'
    });

    this.database_id = this.route.snapshot.params.id;

    this.ofcService.getOfficer(this.database_id);

    this.ofcService.officer.subscribe(
      (ofc: Officer) => {
        this.editOfficerForm = this.fb.group({
          'deptID': [ofc.deptID, Validators.required],
          'radioID': ofc.radioID,
          'name': this.fb.group({
            'last': [ofc.name.last, Validators.required],
            'first': [ofc.name.first, Validators.required]
          }),
          'squad': ofc.squad
        });
      }
    );
  }

  onUpdate() {
    // add the db ID back to the object before sending to the update service
    this.editOfficerForm.value._id = this.database_id;
    this.ofcService.updateOfficer(this.editOfficerForm.value);

    this.ofcService.serverResponse.subscribe(
      (res: ServerResponse) => {
        // navigate back to squad overview after successful response
        if (!res.error) {
          this.router.navigate(['/officers']);
        } else {
          console.error("An error occurred during the update");
          this.serverResponse = res;
        }
      }
    );
  }

  onKeypress(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      this.onUpdate();
    }
  }

}
