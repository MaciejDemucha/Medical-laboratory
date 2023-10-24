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
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-single-result',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule ]
})
export class SingleResultComponent {
  examinationNumber: string = "";
  pesel: string = "";
  patient: Patient = new Patient(0, "", "", "", "");
  examination: Examination = new Examination(0, "", "", "");
  parametersWithNorms: ParameterWithNorm[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute){
    
  }

ngOnInit(): void{
  this.route.queryParams.subscribe(params => {
    this.examinationNumber = params['number'];
    this.pesel = params['pesel'];
  });

  this.http.get<Examination> (
    `http://localhost:8080/examinations/result/${this.pesel}/${this.examinationNumber}`
  ).subscribe(data => this.examination = data,
    error => alert("Podano błędne dane lub wyniki badań nie zostały jeszcze zamieszczone"));

  this.http.get<Patient> (
    `http://localhost:8080/patients/bypesel/${this.pesel}`
  ).subscribe(data => this.patient = data);


}
  getExaminationParametersAndNorms(id: number): void{
    this.http.get<ParameterWithNorm[]> (
      `http://localhost:8080/examinations/${id}/parameterswithnorms`
    ).subscribe(data => this.parametersWithNorms = data);
  }

  /*sendExaminationCredentials(): void{
    this.http.post<Examination>(
      `http://localhost:8080/examinations/singleresult/${this.examinationNumber}`,
      this.examinationForm.value
    ).subscribe(data => this.newDataEvent.emit(data));
  }*/
  
}
