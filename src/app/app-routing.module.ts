import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OfficerComponent } from './components/officer/officer.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';
import { OfficerSquadComponent } from './components/officer/officer-squad/officer-squad.component';
import { OfficerEffectiveDateComponent } from './components/officer/officer-effective-date/officer-effective-date.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { UploadComponent } from './components/upload/upload.component';
import { WipeEpisodesComponent } from './components/upload/wipe-episodes/wipe-episodes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'officers', component: OfficerComponent },
  { path: 'officers/new', component: OfficerNewComponent },
  { path: 'officers/squad', component: OfficerSquadComponent },
  { path: 'officers/effective-date', component: OfficerEffectiveDateComponent },
  { path: 'officers/edit/:id', component: OfficerEditComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'upload/wipe-episodes', component: WipeEpisodesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
