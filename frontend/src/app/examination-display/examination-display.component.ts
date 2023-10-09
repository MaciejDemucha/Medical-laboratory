import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Examination } from './examination';

@Component({
  selector: 'app-examination-display',
  templateUrl: './examination-display.component.html',
  styleUrls: ['./examination-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class ExaminationDisplayComponent {
    @Input() examination = new Examination(0, "", 0);
}
