import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OfficerComponent } from './components/officer/officer.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'officers', component: OfficerComponent },
  { path: 'officers/new', component: OfficerNewComponent },
  { path: 'officers/squad', component: PageNotFoundComponent },
  { path: 'officers/effective-date', component: PageNotFoundComponent },
  { path: 'officers/edit/:id', component: OfficerEditComponent},
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
