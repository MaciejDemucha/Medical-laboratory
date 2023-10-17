import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Examination } from '../examination';
import { ExaminationOffer } from '../examinationOffer';

@Component({
  selector: 'app-examination-edit',
  templateUrl: './examination-edit.component.html',
  styleUrls: ['./examination-edit.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class ExaminationEditComponent {
  
  @Input() examination: ExaminationOffer = new ExaminationOffer(0, "", 0.0);

    @Output() editDataEvent = new EventEmitter();

    constructor(private http: HttpClient){}

    onSubmit(): void{
        this.http.post<Examination>(
          "http://localhost:8080/examinations",
          this.examination
        ).subscribe(data => this.editDataEvent.emit(data));
    }

}
