import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { OfficerHTTPService } from '../../../services/officer.http.service';
import { SquadList } from '../../../services/lists/squad.list';

import { Officer } from '../../../models/officer.model';
import { Message } from '../../../models/message.model';

@Component({
  selector: 'app-officer-squad',
  templateUrl: './officer-squad.component.html',
  styleUrls: ['./officer-squad.component.css']
})
export class OfficerSquadComponent implements OnInit, OnDestroy {
  squadForm: FormGroup;
  squads: string[];

  constructor(
    private formBuilder: FormBuilder,
    private squadList: SquadList
  ) { }

  ngOnInit() {
    this.squadForm = this.formBuilder.group({
      'selectedSquads': ''
    });

    this.squads = this.squadList.squads;
  }

  ngOnDestroy() {

  }

  onSubmit() {
    console.log(this.squadForm.value);
  }

}
