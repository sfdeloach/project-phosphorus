import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Department } from '../../../lists/department.list';

@Component({
  selector: 'app-officer-tabs',
  templateUrl: './officer-tabs.component.html',
  styleUrls: ['./officer-tabs.component.css']
})
export class OfficerTabsComponent implements OnInit {
  department: Department = new Department();
  tabs: string[];
  activeTab = 'All';
  @Output()
  tabEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.tabs = this.department.getDivisions().sort();
  }

  onTabClick(tab: string) {
    this.activeTab = tab;
    this.tabEmitter.emit(tab);
  }
}
