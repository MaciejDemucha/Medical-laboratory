import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Patient } from '../patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule]
})
export class PatientDisplayComponent {
  constructor(private router: Router) { }
  @Input() patient = new Patient(0,"", "","","");
  @Output() getItemEvent = new EventEmitter();

  showPatientExaminations(patient: Patient): void{
    const url = this.router.serializeUrl(this.router.createUrlTree(['/patient'], { queryParams: { id: patient.id } }));
    window.open(url, '_blank');

  }

}
