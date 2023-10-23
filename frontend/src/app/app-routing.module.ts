import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { SingleResultComponent } from './single-result/single-result.component';

const routes: Routes = [
  {path: 'patient', component: ResultsDisplayComponent},
  {path: 'singleresult', component: SingleResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
