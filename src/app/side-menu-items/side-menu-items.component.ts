import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../side-menu/menu';
import { SideMenuService } from '../side-menu/side-menu.service';

@Component({
  selector: 'app-side-menu-items',
  templateUrl: './side-menu-items.component.html',
  styleUrls: ['./side-menu-items.component.scss']
})
export class SideMenuItemsComponent implements OnInit {

  @Input() sideMenu: Menu[];
  @Input() hidden: boolean = true;
  @Output() closeMenu = new EventEmitter<any>();
  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
    if (!this.sideMenu) {
      this.sideMenuService.getMenu()
        .subscribe(menu => this.sideMenu = menu);
    }
  }
  menuItemClick(menu,event) {
    // console.log('event', event);
    if (menu.submenu.length > 0) {
      this.hidden = !this.hidden;
    } else {
      this.closeMenu.emit();
    }

  }

}
