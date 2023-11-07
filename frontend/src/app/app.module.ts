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
import { ExaminationDisplayComponent } from './examination-display/examination-display.component';
import { HttpClientModule } from '@angular/common/http';
import { ExaminationInputComponent } from './examination-input/examination-input.component';
import { ExaminationWrapperComponent } from './examination-wrapper/examination-wrapper.component';
import { ExaminationEditComponent } from './examination-edit/examination-edit.component';
import { ExaminationClientComponent } from './examination-client/examination-client.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { ClientResultSubmitComponent } from './client-result-submit/client-result-submit.component';
import { SingleResultComponent } from './single-result/single-result.component';
import { AddExaminationComponent } from './add-examination/add-examination.component';
import { AddDiagnosisComponent } from './add-diagnosis/add-diagnosis.component';
import { DiagnosisDisplayComponent } from './diagnosis-display/diagnosis-display.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { DialogDataComponent } from './dialog-data/dialog-data.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    ClientResultSubmitComponent,
    AddExaminationComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    ExaminationDisplayComponent,
    ExaminationInputComponent,
    ExaminationWrapperComponent,
    ExaminationEditComponent,
    ExaminationClientComponent,
    MatButtonModule,
    PatientDisplayComponent,
    ResultsDisplayComponent,
    SingleResultComponent, 
    DiagnosisDisplayComponent,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DialogDataComponent, 
    AddDiagnosisComponent,
    
  ],
  providers: [AxiosService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
