import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';  
import {MatButtonModule} from '@angular/material/button';

import { AxiosService } from './axios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ExaminationClientComponent } from './examination-client/examination-client.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { ClientResultSubmitComponent } from './client-result-submit/client-result-submit.component';
import { SingleResultComponent } from './single-result/single-result.component';
import { AddDiagnosisComponent } from './add-diagnosis/add-diagnosis.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { DialogDataComponent } from './dialog-data/dialog-data.component';
import { MatMenuModule} from '@angular/material/menu';
import { GoogleMapsModule } from '@angular/google-maps';
import { LaboratoriesComponent } from './laboratories/laboratories.component';
import { BucketComponent } from './bucket/bucket.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddResultsComponent } from './add-results/add-results.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    ClientResultSubmitComponent,
   
   
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    ExaminationClientComponent,
    MatButtonModule,
    PatientDisplayComponent,
    ResultsDisplayComponent,
    SingleResultComponent, 
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DialogDataComponent, 
    AddDiagnosisComponent,
    MatMenuModule,
    BucketComponent,
    ErrorDialogComponent,
    AddPatientComponent,
    AddResultsComponent,
    LaboratoriesComponent,
  ],
  providers: [AxiosService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
