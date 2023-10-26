import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Patient } from '../patient';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule]
})
export class PatientDisplayComponent {
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  @Input() patient = new Patient(0,"", "","","");
  @Output() getItemEvent = new EventEmitter();
  patients: Patient[] = [];
  doctorId: number|null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.doctorId = params['id'];
    });


    this.http.get<Patient[]> (
      `http://localhost:8080/${this.doctorId}/patients`
    ).subscribe(data => this.patients = data);
  }

  showPatientExaminations(patient: Patient): void{
    const url = this.router.serializeUrl(this.router.createUrlTree(['/patients/results'], { queryParams: { id: patient.id } }));
    window.open(url, '_blank');

  }

}
