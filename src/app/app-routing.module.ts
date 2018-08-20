import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OfficerComponent } from './components/officer/officer.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';
import { OfficerSquadComponent } from './components/officer/officer-squad/officer-squad.component';
import { OfficerEffectiveDateComponent } from './components/officer/officer-effective-date/officer-effective-date.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReportComponent } from './components/report/report.component';
import { ReportNewComponent } from './components/report/report-new/report-new.component';
import { ReportViewComponent } from './components/report/report-view/report-view.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UploadComponent } from './components/upload/upload.component';
import { WipeEpisodesComponent } from './components/upload/wipe-episodes/wipe-episodes.component';
import { UserComponent } from './components/user/user.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserViewComponent } from './components/user/user-view/user-view.component';

import { AuthAdminService } from './services/auth.admin.service';
import { AuthAuthorService } from './services/auth.author.service';
import { AuthViewOnlyService } from './services/auth.view-only.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthViewOnlyService] },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportComponent, canActivate: [AuthViewOnlyService] },
  {
    path: 'reports/new',
    component: ReportNewComponent,
    canActivate: [AuthAuthorService]
  },
  {
    path: 'reports/view',
    component: ReportViewComponent,
    canActivate: [AuthViewOnlyService]
  },
  { path: 'officers', component: OfficerComponent, canActivate: [AuthViewOnlyService] },
  {
    path: 'officers/new',
    component: OfficerNewComponent,
    canActivate: [AuthAuthorService]
  },
  {
    path: 'officers/squad',
    component: OfficerSquadComponent,
    canActivate: [AuthAuthorService]
  },
  {
    path: 'officers/effective-date',
    component: OfficerEffectiveDateComponent,
    canActivate: [AuthAuthorService]
  },
  {
    path: 'officers/edit/:id',
    component: OfficerEditComponent,
    canActivate: [AuthAuthorService]
  },
  { path: 'upload', component: UploadComponent, canActivate: [AuthAuthorService] },
  {
    path: 'upload/wipe-episodes',
    component: WipeEpisodesComponent,
    canActivate: [AuthAuthorService]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthAdminService]
  },
  {
    path: 'users/new',
    component: UserNewComponent,
    canActivate: [AuthAdminService]
  },
  {
    path: 'users/view/:id',
    component: UserViewComponent,
    canActivate: [AuthAdminService]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
