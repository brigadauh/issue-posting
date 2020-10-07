import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  hidden: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  sideMenuClick() {
    this.hidden = !this.hidden;
    // console.log('hidden', this.hidden);
  }
  closeMenuHandler(event?: any) {
    this.hidden = true;
  }
}
