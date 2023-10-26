import { Component, Input } from '@angular/core';
import { Diagnosis } from '../diagnosis';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-diagnosis-display',
  templateUrl: './diagnosis-display.component.html',
  styleUrls: ['./diagnosis-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class DiagnosisDisplayComponent {
  @Input() diagnosis = new Diagnosis(0, "");
}
