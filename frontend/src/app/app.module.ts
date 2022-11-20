import { Injectable, NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltrareCentreComponent } from './filtrare-centre/filtrare-centre.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CentersComponent } from './centers/centers.component';
import { AddRecycleCenterComponent } from './add-recycle-center/add-recycle-center.component';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CentreService } from './centre.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivitiesComponent } from './activities/activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
  
@NgModule({
  declarations: [
    AppComponent,
    FiltrareCentreComponent,
    CentersComponent,
    AddRecycleCenterComponent,
    ActivitiesComponent,
    AddActivityComponent,
    // TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule,
    
  ],
  providers: [CentreService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
