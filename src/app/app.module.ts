import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { OfficerComponent } from './components/officer/officer.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';
import { OfficerSquadComponent } from './components/officer/officer-squad/officer-squad.component';
import { OfficerEffectiveDateComponent } from './components/officer/officer-effective-date/officer-effective-date.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { CsvService } from './services/csv.service';
import { CafeService } from './services/cafe.service';
import { XCADService } from './services/xcad.service';
import { UploadService } from './services/upload.service';
import { OfficerHTTPService } from './services/officer.http.service';
import { EpisodeHTTPService } from './services/episode.http.service';
import { SquadList } from './services/lists/squad.list';
import { ApiUrlsList } from './services/lists/api.urls.list';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UploadComponent,
    OfficerComponent,
    OfficerEditComponent,
    OfficerNewComponent,
    OfficerSquadComponent,
    OfficerEffectiveDateComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CsvService,
    CafeService,
    XCADService,
    UploadService,
    OfficerHTTPService,
    EpisodeHTTPService,
    SquadList,
    ApiUrlsList
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
