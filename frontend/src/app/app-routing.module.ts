import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDisplayComponent } from './patient-display/patient-display.component';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
