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

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule ]
})
export class ResultsDisplayComponent {
  //patient: Patient = new Patient(0,"","","","");
  patientId: number = 0;
  examinations: Examination[] = [];
  parameters: Parameter[] = [];
  parametersWithNorms: ParameterWithNorm[] = [];
  norm: NormRange = new NormRange(0, "", 0, 0);
  constructor(private http: HttpClient, private route: ActivatedRoute){
    
    }

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.patientId = params['id'];
    });
    this.http.get<Examination[]> (
      `http://localhost:8080/patients/${this.patientId}/examinations`
    ).subscribe(data => this.examinations = data);

  }

  getExaminationParameters(id: number): void{
    this.http.get<Parameter[]> (
      `http://localhost:8080/examinations/${id}/parameters`
    ).subscribe(data => this.parameters = data);
      this.parameters.forEach(param => {
          this.getNormsForParameter(param.id);
         // param.norm = this.norm;
          //console.log(this.norm.unit);
      });
  }

  getExaminationParametersAndNorms(id: number): void{
    this.http.get<ParameterWithNorm[]> (
      `http://localhost:8080/examinations/${id}/parametersv2`
    ).subscribe(data => this.parametersWithNorms = data);
  }

  getNormsForParameter(id: number): void{
    this.http.get<NormRange> (
      `http://localhost:8080/parameters/${id}/norms`
    ).subscribe(data => this.norm = data);
    console.log("aaaaa: "+ this.norm.min +" "+ this.norm.max +" "+ this.norm.unit);
  }
}
