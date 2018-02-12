import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SquadsComponent } from './components/squads/squads.component';
import { OfficerEditComponent } from './components/squads/officer-edit/officer-edit.component';
import { OfficerNewComponent } from './components/squads/officer-new/officer-new.component';
import { UploadComponent } from './components/upload/upload.component';

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
