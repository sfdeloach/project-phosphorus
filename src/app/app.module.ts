import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

import { CsvService } from './services/csv.service';
import { UploadService } from './services/upload.service';
import { RetrieveService } from './services/retrieve.service';
import { SquadService } from './services/squad.service';
import { SquadsComponent } from './squads/squads.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OfficerEditComponent } from './squads/officer-edit/officer-edit.component';
import { OfficerNewComponent } from './squads/officer-new/officer-new.component';

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
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CsvService,
    RetrieveService,
    UploadService,
    SquadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
