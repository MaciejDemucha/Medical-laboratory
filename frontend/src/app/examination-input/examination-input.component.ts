import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Examination } from '../examination';


@Component({
  selector: 'app-examination-input',
  templateUrl: './examination-input.component.html',
  styleUrls: ['./examination-input.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class ExaminationInputComponent {
    @ViewChild("examinationForm") examinationForm!: NgForm;

    @Output() newDataEvent = new EventEmitter();

    constructor(private http: HttpClient){}

    onSubmit(): void{
        this.http.post<Examination>(
          "http://localhost:8080/examinations",
          this.examinationForm.value
        ).subscribe(data => this.newDataEvent.emit(data));
    }
}
