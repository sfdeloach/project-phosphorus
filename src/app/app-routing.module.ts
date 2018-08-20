import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReportComponent } from './components/report/report.component';
import { ReportNewComponent } from './components/report/report-new/report-new.component';
import { ReportViewComponent } from './components/report/report-view/report-view.component';
import { OfficerComponent } from './components/officer/officer.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';
import { OfficerSquadComponent } from './components/officer/officer-squad/officer-squad.component';
import { OfficerEffectiveDateComponent } from './components/officer/officer-effective-date/officer-effective-date.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { UploadComponent } from './components/upload/upload.component';
import { WipeEpisodesComponent } from './components/upload/wipe-episodes/wipe-episodes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';

import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportComponent, canActivate: [AuthService] },
  {
    path: 'reports/new',
    component: ReportNewComponent,
    canActivate: [AuthService]
  },
  {
    path: 'reports/view',
    component: ReportViewComponent,
    canActivate: [AuthService]
  },
  { path: 'officers', component: OfficerComponent, canActivate: [AuthService] },
  {
    path: 'officers/new',
    component: OfficerNewComponent,
    canActivate: [AuthService]
  },
  {
    path: 'officers/squad',
    component: OfficerSquadComponent,
    canActivate: [AuthService]
  },
  {
    path: 'officers/effective-date',
    component: OfficerEffectiveDateComponent,
    canActivate: [AuthService]
  },
  {
    path: 'officers/edit/:id',
    component: OfficerEditComponent,
    canActivate: [AuthService]
  },
  { path: 'upload', component: UploadComponent, canActivate: [AuthService] },
  {
    path: 'upload/wipe-episodes',
    component: WipeEpisodesComponent,
    canActivate: [AuthService]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthService]
  },
  {
    path: 'users/new',
    component: UserNewComponent,
    canActivate: [AuthService]
  },
  {
    path: 'users/view/:id',
    component: UserViewComponent,
    canActivate: [AuthService]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
