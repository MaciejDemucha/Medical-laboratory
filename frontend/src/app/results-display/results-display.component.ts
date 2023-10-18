import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { Examination } from '../examination';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, FormsModule, CommonModule ]
})
export class ResultsDisplayComponent {
  patientId: number = 1;
  examinations: Examination[] = [];
  constructor(private http: HttpClient){
    
    }

  ngOnInit(): void{
    this.http.get<Examination[]> (
      `http://localhost:8080/patients/${this.patientId}/examinations`
    ).subscribe(data => this.examinations = data);
  }
}
