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
  constructor(private http: HttpClient, private route: ActivatedRoute){
    
    }

  ngOnInit(): void{
    //this.patient = this.patientService.patient;
    this.route.queryParams.subscribe(params => {
      this.patientId = params['id'];
    });
    console.log(this.patientId);
    this.http.get<Examination[]> (
      `http://localhost:8080/patients/${this.patientId}/examinations`
    ).subscribe(data => this.examinations = data);

    /*this.examinations.forEach((element) => {
      
      this.getExaminationParameters(element.id);

    });*/
  }

  getExaminationParameters(id: number): void{
    this.http.get<Parameter[]> (
      `http://localhost:8080/examinations/${id}/parameters`
    ).subscribe(data => this.parameters = data);

        console.log(id);
  }
}
