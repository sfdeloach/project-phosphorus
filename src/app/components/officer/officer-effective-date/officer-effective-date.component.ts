import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHTTPService } from '../../../services/officer.http.service';

import { Message } from '../../../models/message.model';
import { UpdateResponse } from '../../../models/responses/update.model';

@Component({
  selector: 'app-officer-effective-date',
  templateUrl: './officer-effective-date.component.html',
  styleUrls: ['./officer-effective-date.component.css']
})
export class OfficerEffectiveDateComponent implements OnInit, OnDestroy {
  squadForm: FormGroup;
  squads: string[];
  message: Message;
  response: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private ofcService: OfficerHTTPService,
    private router: Router
  ) { }

  ngOnInit() {
    this.squadForm = this.formBuilder.group({
      'effDate': ''
    });

    this.response = this.ofcService.response.subscribe(
      (res: UpdateResponse) => {
        this.message.info = undefined;
        if (res.keg) {
          this.message.danger = 'API is working, but unable to connect to database';
          console.error(res);
        } else if (res.message) {
          this.message.danger = 'Unable to connect to the API';
          console.error(res);
        } else if (res.ok) {
          this.router.navigate(['/officers']);
        } else {
          this.message.warning = 'Something weird just happened...';
          console.log('We received something unexpected from the server.');
          console.error(res);
        }
      }
    );

    this.message = new Message();
  }

  ngOnDestroy() {
    this.response.unsubscribe();
  }

  onSubmit() {
    this.message = new Message('Updating effective dates');
    this.ofcService.updateEffectiveDates(this.squadForm.value.effDate);
  }

}
