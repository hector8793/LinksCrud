import { Routes } from '@angular/router';
import { AuthGuard } from '../core/_guard/auth.guard';
import { HomeComponent } from './home/home.component';

export const LinksRouting: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '*', redirectTo: '/login', pathMatch: 'full' }
];