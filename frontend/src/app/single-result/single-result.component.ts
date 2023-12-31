import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { Examination } from '../examination';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parameter } from '../parameter';
import { Patient } from '../patient';
import { ActivatedRoute, Router } from '@angular/router';
import { NormRange } from '../normRange';
import { ParameterWithNorm } from '../parameterAndNorms';
import { AxiosService } from '../axios.service';
import {MatTableModule} from '@angular/material/table';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import { Doctor } from '../doctor';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';
import { Diagnosis } from '../diagnosis';
import { catchError, of, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-result',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule,MatTableModule, MatDialogModule, MatSnackBarModule]
})
export class SingleResultComponent {
  examinationNumber: string = "";
  password: string = "";
  id: number = 0;
  patient: Patient = new Patient(0, "", "", "", "");
  patientsDoctor = new Doctor(0, "", "", "");
  examination: Examination = new Examination(0,0, "", "", "");
  diagnosis: Diagnosis | null = new Diagnosis(0, 0, "");
  parametersWithNorms: ParameterWithNorm[] = [];
  displayedColumns: string[] = ['Nazwa', 'Wartość', 'Przedział', /*'Wykres',*/ 'Powiadomienie'];
  doctors: Doctor[] = [];

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog){
    
  }

ngOnInit(): void{
  this.route.queryParams.subscribe(params => {
    this.examinationNumber = params['number'];
    this.password = params['password'];
    this.id = params['id'];
  });

  

  this.http.get<Examination> (
    `http://localhost:8080/examinations/result/${this.examinationNumber}/${this.password}`
  ).subscribe(data => {
    this.examination = data;
    this.getExaminationParametersAndNorms(this.examination.id);
    this.getDiagnosis(this.examination.id);
  },
    error => this.openSnackBar("Podano błędne dane lub wyniki badań nie zostały jeszcze zamieszczone"));

  this.http.get<Patient> (
    `http://localhost:8080/patients/${this.id}`
  ).subscribe(data => {
    this.patient = data;
    this.getPatientsDoctor();
  });



  this.http.get<Doctor[]> (
    `http://localhost:8080/doctors`
  ).subscribe(data => {
    this.doctors = data
    
  });


}
  getExaminationParametersAndNorms(id: number): void{
    this.http.get<ParameterWithNorm[]> (
      `http://localhost:8080/examinations/parameterswithnorms/${id}`
    ).subscribe(data => this.parametersWithNorms = data);
  }
  

  getPatientsDoctor() :void{
    this.http.get<Doctor> (
      `http://localhost:8080/patients/doctor/${this.patient.id}`
    ).subscribe(data => this.patientsDoctor = data);
  }

  getPdfResults(): void{
    const url = `http://localhost:8080/pdf/generate/${this.patient.id}/${this.examination.id}`;
    window.open(url, '_blank');
  }


  consultationDialog() {
    const dialogRef = this.dialog.open(DialogDataComponent, {
      data: {
        patientId: this.patient.id,
        doctorList: this.doctors
      },
    });
   
    dialogRef.afterClosed().subscribe(result => {
      this.getPatientsDoctor();
    });
  }

  getDiagnosis(examinationId: number): void {
    this.http.get<Diagnosis>(
      `http://localhost:8080/diagnosis/${examinationId}`
    ).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Diagnosis not found for examinationId:', examinationId);
          return of(null);
        } else {
          console.error('An error occurred while fetching diagnosis:', error);
          return throwError('Error occurred.');
        }
      })
    ).subscribe(
      (data) => {
        this.diagnosis = data;
      }
    );
  }
  openSnackBar(message: string) {
		this._snackBar.open(message);
	  }
}
  




