import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouting } from './authentication/authentication.routing';
import { LinksRouting } from './links-crud/links-crud.routing';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  ...AuthRouting,
  ...LinksRouting,
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
