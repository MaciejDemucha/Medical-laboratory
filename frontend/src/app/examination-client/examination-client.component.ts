import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Examination } from '../examination';


@Component({
  selector: 'app-examination-client',
  templateUrl: './examination-client.component.html',
  styleUrls: ['./examination-client.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class ExaminationClientComponent {
  @Input() examination = new Examination(0, "", 0);
  @Output() addItemEvent = new EventEmitter();

}
