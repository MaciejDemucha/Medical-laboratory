import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Patient } from '../patient';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule]
})
export class PatientDisplayComponent {
  @Input() patient = new Patient(0,"", "","","");
  @Output() getItemEvent = new EventEmitter();

  showPatientExaminations(): void{

  }

}
