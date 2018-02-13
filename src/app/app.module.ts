import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { SquadsComponent } from './components/squads/squads.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OfficerEditComponent } from './components/squads/officer-edit/officer-edit.component';
import { OfficerNewComponent } from './components/squads/officer-new/officer-new.component';

import { CsvService } from './services/csv.service';
import { UploadService } from './services/upload.service';
import { SquadService } from './services/squad.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent,
    HomeComponent,
    SquadsComponent,
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
    UploadService,
    SquadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
