import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { SingleResultComponent } from './single-result/single-result.component';
import { AddExaminationComponent } from './add-examination/add-examination.component';
import { ExaminationClientComponent } from './examination-client/examination-client.component';
import { ClientResultSubmitComponent } from './client-result-submit/client-result-submit.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';

const routes: Routes = [
  {path: 'patients', component: PatientDisplayComponent},
  {path: 'patients/results', component: ResultsDisplayComponent},
  {path: 'addExamination', component: AddExaminationComponent},
  {path: 'singleresult/result', component: SingleResultComponent},
  {path: 'shop', component: ExaminationClientComponent},
  //{ path: '', redirectTo: '/shop', pathMatch: 'full' },
  {path: 'singleresult', component: ClientResultSubmitComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'laboratories', component: LaboratoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
