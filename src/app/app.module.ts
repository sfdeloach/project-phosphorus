import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';

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

import { AuthService } from './services/auth.service';
import { CsvService } from './services/csv.service';
import { CafeService } from './services/cafe.service';
import { XCADService } from './services/xcad.service';
import { UploadService } from './services/upload.service';
import { OfficerHttpService } from './services/officer.http.service';
import { EpisodeHttpService } from './services/episode.http.service';
import { ApiUrlsList } from './services/lists/api.urls.list';
import { OfficerTabsComponent } from './components/officer/officer-tabs/officer-tabs.component';
import { LoginComponent } from './components/login/login.component';

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
    LoginComponent
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
    CsvService,
    CafeService,
    XCADService,
    UploadService,
    OfficerHttpService,
    EpisodeHttpService,
    ApiUrlsList
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
