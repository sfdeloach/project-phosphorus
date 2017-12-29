import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadComponent } from './upload/upload.component';

import { UploadService } from './services/upload.service';
import { CsvService } from './services/csv.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CsvService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
