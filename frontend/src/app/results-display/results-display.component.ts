import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { Examination } from '../examination';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parameter } from '../parameter';
import { Patient } from '../patient';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NormRange } from '../normRange';
import { ParameterWithNorm } from '../parameterAndNorms';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddDiagnosisComponent } from '../add-diagnosis/add-diagnosis.component';
import { MatDialog } from '@angular/material/dialog';
import { Diagnosis } from '../diagnosis';
import { catchError, of, throwError } from 'rxjs';
import {MatSliderModule} from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css'],
  standalone: true,
  imports: [MatIconModule,MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule , MatTableModule, MatFormFieldModule, MatInputModule, MatSliderModule]
})
export class ResultsDisplayComponent {
  patientId: number = 0;
  patient: Patient = new Patient(0, "", "", "", "");
  examinations: Examination[] = [];
  displayedColumns: string[] = ['Nazwa', 'Wartość', 'Przedział', /*'Wykres',*/ 'Powiadomienie'];
  parameters: { [key: number]: any } = {};
  diagnosisList: { [key: number]: any } = {};
  canWriteDiagnosis: boolean = false;

  constructor(private authService: AuthService,private _snackBar: MatSnackBar,private router: Router, private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog){
    
    }

  ngOnInit(): void{
    this.authService.checkAuthentication();

    this.route.queryParams.subscribe(params => {
      this.patientId = params['id'];
      this.canWriteDiagnosis = params['canWriteDiagnosis'];
      console.log(this.canWriteDiagnosis)
    });

   this.getPatientAndExaminationData();

  }

  getPatientAndExaminationData(): void {
    const authToken = localStorage.getItem('auth_token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${authToken}`
		  });

    this.http.get<Examination[]> (
      `http://localhost:8080/patients/${this.patientId}/examinations`, {headers}
    ).subscribe(data => {
      this.examinations = data;
      for(let exam of this.examinations){
        this.getDiagnosis(exam.id);
      }
    },
      (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });

    this.http.get<Patient> (
      `http://localhost:8080/patients/${this.patientId}`, {headers}
    ).subscribe(data => this.patient = data,
      (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });
  }

  onAuthFailure(){
    localStorage.setItem('isAuthenticated', 'false');
    this.authService.isAuthenticated = false;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
    }

    getPdfResults(examinationId: number, patientId: number){
      const url = `http://localhost:8080/pdf/generate/${patientId}/${examinationId}`;
      window.open(url, '_blank');
    }

  getExaminationData(id: number): void {
    this.http.get<ParameterWithNorm[]>(
      `http://localhost:8080/examinations/parameterswithnorms/${id}`
    ).subscribe(
      (data) => {
        this.parameters[id] = data;
        this.getDiagnosis(id);
      },
      (error) => {
        // Handle errors for the first request here.
        console.error('Error occurred while fetching examination data:', error);
      }
    );
  }
  
  getDiagnosis(examinationId: number): void {
    this.http.get<Diagnosis>(
      `http://localhost:8080/diagnosis/${examinationId}`
    ).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Diagnosis not found for examinationId:', examinationId);
          if (!this.diagnosisList[examinationId]) {
            this.diagnosisList[examinationId] = new Diagnosis(null, 0, "");
          }
          return of(null);
        } else if(error.status === 401){
          this.onAuthFailure();
          return of(null);
        }
        else {
          console.error('An error occurred while fetching diagnosis:', error);
          return throwError('Error occurred.');
        }
      })
    ).subscribe(
      (data) => {
        if (!this.diagnosisList[examinationId]) {
          this.diagnosisList[examinationId] = data;
        }
      }
    );
  }

  addDiagnosis(id: number): void{
      const dialogRef = this.dialog.open(AddDiagnosisComponent, {
        data: {
         examinationId: id,
         isNewExamination: true
        },
       
        width: '50%'
      });
     
      dialogRef.afterClosed().subscribe(result => {
       
      });
  }

  editDiagnosis(id: number): void {
    const oldDesc = this.diagnosisList[id].description;
    const diagnosisId = this.diagnosisList[id].id;
    const dialogRef = this.dialog.open(AddDiagnosisComponent, {
      data: {
       diagnosisId: diagnosisId,
       examinationId: id,
       isNewExamination: false,
       oldDesc: oldDesc
      },
      
      width: '50%'
    });
   
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  openSnackBar(message: string) {
		this._snackBar.open(message);
	  }
  
}
