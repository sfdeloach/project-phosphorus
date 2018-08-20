import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OfficerComponent } from './components/officer/officer.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { OfficerEffectiveDateComponent } from './components/officer/officer-effective-date/officer-effective-date.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';
import { OfficerSquadComponent } from './components/officer/officer-squad/officer-squad.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UploadComponent } from './components/upload/upload.component';
import { WipeEpisodesComponent } from './components/upload/wipe-episodes/wipe-episodes.component';
import { OfficerTabsComponent } from './components/officer/officer-tabs/officer-tabs.component';
import { LoginComponent } from './components/login/login.component';
import { ReportComponent } from './components/report/report.component';
import { ReportNewComponent } from './components/report/report-new/report-new.component';
import { ReportViewComponent } from './components/report/report-view/report-view.component';
import { UserComponent } from './components/user/user.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';

import { AuthService } from './services/auth.service';
import { AuthAdminService } from './services/auth.admin.service';
import { AuthAuthorService } from './services/auth.author.service';
import { AuthViewOnlyService } from './services/auth.view-only.service';
import { CafeService } from './services/cafe.service';
import { CsvService } from './services/csv.service';
import { EpisodeHttpService } from './services/episode.http.service';
import { OfficerHttpService } from './services/officer.http.service';
import { ReportHttpService } from './services/report.http.service';
import { ReportService } from './services/report.service';
import { XCADService } from './services/xcad.service';
import { UploadService } from './services/upload.service';
import { UserHttpService } from './services/user.http.service';

import { ApiUrlsList } from './services/lists/api.urls.list';
import { ReportTypesList } from './services/lists/report.types.list';
import { AuthTypesList } from './services/lists/auth.types.list';

import { EpisodeInfoPipe } from './pipes/episode.info.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FindDatePipe } from './pipes/find.date.pipe';
import { FindNumberPipe } from './pipes/find.number.pipe';
import { IsolatePipe } from './pipes/isolate.pipe';
import { TotalPipe } from './pipes/total.pipe';
import { UserViewComponent } from './components/user/user-view/user-view.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OfficerComponent,
    OfficerEditComponent,
    OfficerEffectiveDateComponent,
    OfficerNewComponent,
    OfficerSquadComponent,
    PageNotFoundComponent,
    UploadComponent,
    WipeEpisodesComponent,
    OfficerTabsComponent,
    LoginComponent,
    ReportComponent,
    ReportNewComponent,
    ReportViewComponent,
    UserComponent,
    UserNewComponent,
    EpisodeInfoPipe,
    IsolatePipe,
    FilterPipe,
    FindDatePipe,
    FindNumberPipe,
    TotalPipe,
    UserViewComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthAdminService,
    AuthAuthorService,
    AuthViewOnlyService,
    CafeService,
    CsvService,
    EpisodeHttpService,
    OfficerHttpService,
    ReportHttpService,
    ReportService,
    UploadService,
    XCADService,
    UserHttpService,
    ApiUrlsList,
    ReportTypesList,
    AuthTypesList
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
