import { Injectable } from '@angular/core';
import { Menu } from './menu';
import { SIDEMENU } from './sidemenu';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class SideMenuService {
  constructor() { }
  getMenu(): Observable<Menu[]> {
    return of(SIDEMENU);
    //.pipe(delay(2000));
  }


}
