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

import { AuthAdminGuard } from './guards/auth.admin.guard';
import { AuthAuthorGuard } from './guards/auth.author.guard';
import { AuthViewOnlyGuard } from './guards/auth.view-only.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthViewOnlyGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportComponent, canActivate: [AuthViewOnlyGuard] },
  {
    path: 'reports/new',
    component: ReportNewComponent,
    canActivate: [AuthAuthorGuard]
  },
  {
    path: 'reports/view',
    component: ReportViewComponent,
    canActivate: [AuthViewOnlyGuard]
  },
  { path: 'officers', component: OfficerComponent, canActivate: [AuthViewOnlyGuard] },
  {
    path: 'officers/new',
    component: OfficerNewComponent,
    canActivate: [AuthAuthorGuard]
  },
  {
    path: 'officers/squad',
    component: OfficerSquadComponent,
    canActivate: [AuthAuthorGuard]
  },
  {
    path: 'officers/effective-date',
    component: OfficerEffectiveDateComponent,
    canActivate: [AuthAuthorGuard]
  },
  {
    path: 'officers/edit/:id',
    component: OfficerEditComponent,
    canActivate: [AuthAuthorGuard]
  },
  { path: 'upload', component: UploadComponent, canActivate: [AuthAuthorGuard] },
  {
    path: 'upload/wipe-episodes',
    component: WipeEpisodesComponent,
    canActivate: [AuthAuthorGuard]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'users/new',
    component: UserNewComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'users/view/:id',
    component: UserViewComponent,
    canActivate: [AuthAdminGuard]
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
