import { Routes } from '@angular/router';
import { IssuePostingComponent } from '../issue-posting/issue-posting.component';
import { AboutComponent } from '../about/about.component';

export const routes: Routes = [
        { path: 'home', component: IssuePostingComponent },
        { path: 'about', component: AboutComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
];
