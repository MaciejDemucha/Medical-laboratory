import { Component, ElementRef, ViewChild } from '@angular/core';
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
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddDiagnosisComponent } from '../add-diagnosis/add-diagnosis.component';
import { MatDialog } from '@angular/material/dialog';
import { Diagnosis } from '../diagnosis';

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule , MatTableModule, MatFormFieldModule, MatInputModule]
})
export class ResultsDisplayComponent {
  patientId: number = 0;
  patient: Patient = new Patient(0, "", "", "", "");
  examinations: Examination[] = [];
  displayedColumns: string[] = ['Nazwa', 'Wartość', 'Przedział', 'Wykres'];
  parameters: { [key: number]: any } = {};
  diagnosisList: { [key: number]: any } = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog){
    
    }

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.patientId = params['id'];
    });
    this.http.get<Examination[]> (
      `http://localhost:8080/patients/${this.patientId}/examinations`
    ).subscribe(data => this.examinations = data);

    this.http.get<Patient> (
      `http://localhost:8080/patients/${this.patientId}`
    ).subscribe(data => this.patient = data);

  }

  getExaminationData(id: number): void{
    this.http.get<ParameterWithNorm[]> (
      `http://localhost:8080/examinations/${id}/parameterswithnorms`
    ).subscribe(data => {
      this.parameters[id] = data;
      this.getDiagnosis(id);
    });

  }

  getDiagnosis(examinationId: number): void{
    this.http.get<Diagnosis> (
      `http://localhost:8080/diagnosis/${examinationId}`
    ).subscribe(data => this.diagnosisList[examinationId] = data);
  }

  addDiagnosis(id: number): void{
      const dialogRef = this.dialog.open(AddDiagnosisComponent, {
        data: {
         examinationId: id
        },
        height: '80%',
        width: '80%'
      });
     
      dialogRef.afterClosed().subscribe(result => {
        
      });
  }

}
