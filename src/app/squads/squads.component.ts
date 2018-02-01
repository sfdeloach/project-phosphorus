import { Component, OnInit } from '@angular/core';
import { SquadService } from '../services/squad.service';
import { Officer } from '../models/officer.model';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {
  officers: Officer[];

  constructor(
    private squadService: SquadService
  ) { }

  ngOnInit() {
    this.squadService.getOfficers();
    this.squadService.officers.subscribe(officers => {
      this.officers = officers;
    });
  }

}
