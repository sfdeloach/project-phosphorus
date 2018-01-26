import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SquadsComponent } from './squads/squads.component';
import { OfficerNewComponent } from './squads/officer-new/officer-new.component';
import { OfficerEditComponent } from './squads/officer-edit/officer-edit.component';
import { UploadComponent } from './upload/upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'squads', component: SquadsComponent },
  { path: 'squads/new', component: OfficerNewComponent },
  { path: 'squads/:id', component: OfficerEditComponent},
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
