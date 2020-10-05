import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideMenuItemsComponent } from './side-menu-items/side-menu-items.component';
import { IssuePostingComponent } from './issue-posting/issue-posting.component';
import { IssuePostingService } from './issue-posting/issue-posting.service';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    SideMenuItemsComponent,
    IssuePostingComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    IssuePostingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
