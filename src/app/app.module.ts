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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OfficerEditComponent } from './components/officer/officer-edit/officer-edit.component';
import { OfficerNewComponent } from './components/officer/officer-new/officer-new.component';

import { CsvService } from './services/csv.service';
import { CafeService } from './services/cafe.service';
import { XCADService } from './services/xcad.service';
import { UploadService } from './services/upload.service';
import { OfficerService } from './services/officer.service';
import { EpisodeService } from './services/episode.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent,
    HomeComponent,
    OfficerComponent,
    PageNotFoundComponent,
    OfficerEditComponent,
    OfficerNewComponent
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
    OfficerService,
    EpisodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
