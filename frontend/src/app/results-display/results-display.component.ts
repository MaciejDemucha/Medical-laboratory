import { Component } from '@angular/core';
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

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule , MatTableModule]
})
export class ResultsDisplayComponent {
  patientId: number = 0;
  patient: Patient = new Patient(0, "", "", "", "");
  examinations: Examination[] = [];
  displayedColumns: string[] = ['Nazwa', 'Wartość', 'Przedział', 'Wykres'];
  parameters: { [key: number]: any } = {};

  constructor(private http: HttpClient, private route: ActivatedRoute){
    
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

  getExaminationParametersAndNorms(id: number): void{
    this.http.get<ParameterWithNorm[]> (
      `http://localhost:8080/examinations/${id}/parameterswithnorms`
    ).subscribe(data => this.parameters[id] = data);

  }

}
