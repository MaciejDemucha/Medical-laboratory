import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Examination } from '../examination';
import { ExaminationOffer } from '../examinationOffer';

@Component({
  selector: 'app-examination-display',
  templateUrl: './examination-display.component.html',
  styleUrls: ['./examination-display.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class ExaminationDisplayComponent {
    @Input() examination = new ExaminationOffer(0, "", 0);
    @Output() removeItemEvent = new EventEmitter();
    @Output() editItemEvent = new EventEmitter();
}
