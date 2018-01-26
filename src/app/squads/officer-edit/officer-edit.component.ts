import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SquadService } from '../../services/squad.service';

@Component({
  selector: 'app-officer-edit',
  templateUrl: './officer-edit.component.html',
  styleUrls: ['./officer-edit.component.css']
})
export class OfficerEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private squadService: SquadService
  ) { }

  ngOnInit() {
  }

}
