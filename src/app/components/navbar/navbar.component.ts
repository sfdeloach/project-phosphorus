import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showSquads: boolean = false;
  timerID: any;

  constructor() { }

  ngOnInit() {
  }

  toggleSquads() {
    this.showSquads = !this.showSquads;
  }

  onExit() {
    // start timer
    this.timerID = setTimeout(() => {
      this.showSquads = false;
    }, 2500);
  }

  onEnter() {
    // stop timer
    clearTimeout(this.timerID);
  }

}
