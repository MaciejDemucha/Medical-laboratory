import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Patient } from '../patient';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule]
})
export class PatientDisplayComponent {
  constructor(private authService: AuthService,private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  @Input() patient = new Patient(0,"", "","","");
  @Output() getItemEvent = new EventEmitter();
  patients: Patient[] = [];
  doctorId: number|null = null;

  ngOnInit(): void {
    this.authService.checkAuthentication();

    this.route.queryParams.subscribe(params => {
      this.doctorId = params['id'];
    });

    this.getPatientsByDoctorId();
    
  }

  onAuthFailure(){
    localStorage.setItem('isAuthenticated', 'false');
    this.authService.isAuthenticated = false;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
    }

  getPatientsByDoctorId(){
    const authToken = localStorage.getItem('auth_token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${authToken}`
		  });

    this.http.get<Patient[]> (
      `http://localhost:8080/doctor/${this.doctorId}/patients`, {headers}
    ).subscribe(data => this.patients = data,
      (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });
  }

  showPatientExaminations(patient: Patient): void{
    const url = this.router.serializeUrl(this.router.createUrlTree(['/patients/results'], { queryParams: { id: patient.id, canWriteDiagnosis: true } }));
    this.router.navigateByUrl(url);
    //window.open(url, '_blank');

  }

}
