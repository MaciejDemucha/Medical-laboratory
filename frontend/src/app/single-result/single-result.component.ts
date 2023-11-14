import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { Examination } from '../examination';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parameter } from '../parameter';
import { Patient } from '../patient';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-single-result',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule,MatTableModule, MatDialogModule]
})
export class SingleResultComponent {
  examinationNumber: string = "";
  pesel: string = "";
  patient: Patient = new Patient(0, "", "", "", "");
  patientsDoctor = new Doctor(0, "", "", "");
  examination: Examination = new Examination(0, "", "", "");
  diagnosis: Diagnosis | null = new Diagnosis(0, 0, "");
  parametersWithNorms: ParameterWithNorm[] = [];
  displayedColumns: string[] = ['Nazwa', 'Wartość', 'Przedział', 'Wykres', 'Powiadomienie'];
  doctors: Doctor[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog){
    
  }

ngOnInit(): void{
  this.route.queryParams.subscribe(params => {
    this.examinationNumber = params['number'];
    this.pesel = params['pesel'];
  });

  

  this.http.get<Examination> (
    `http://localhost:8080/examinations/result/${this.pesel}/${this.examinationNumber}`
  ).subscribe(data => {
    this.examination = data;
    this.getExaminationParametersAndNorms(this.examination.id);
    this.getDiagnosis(this.examination.id);
  },
    error => alert("Podano błędne dane lub wyniki badań nie zostały jeszcze zamieszczone"));

  this.http.get<Patient> (
    `http://localhost:8080/patients/bypesel/${this.pesel}`
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

  /*sendExaminationCredentials(): void{
    this.http.post<Examination>(
      `http://localhost:8080/examinations/singleresult/${this.examinationNumber}`,
      this.examinationForm.value
    ).subscribe(data => this.newDataEvent.emit(data));
  }*/

  

  consultationDialog() {
    const dialogRef = this.dialog.open(DialogDataComponent, {
      data: {
        patientId: this.patient.id,
        doctorList: this.doctors
      },
    });
   
    dialogRef.afterClosed().subscribe(result => {
      this.getPatientsDoctor()
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
}
  

export class TableBasicExample {
  
}

/*export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}*/


