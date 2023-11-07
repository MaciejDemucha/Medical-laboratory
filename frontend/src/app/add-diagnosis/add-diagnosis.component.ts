import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Diagnosis } from '../diagnosis';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogData } from '../dialog-data/dialog-data.component';
import { MAT_DIALOG_DATA , MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule, CommonModule],
})
export class AddDiagnosisComponent implements OnInit {
	@ViewChild('desc') input?: ElementRef<HTMLInputElement>;
	oldDesc: string = "";
	activeButton: boolean = true;
	diagnosis: Diagnosis | null = new Diagnosis(0, 0, "");

  constructor(private http: HttpClient, private desc: ElementRef, @Inject(MAT_DIALOG_DATA) public data: DiagnosisDialogData){
  }

  ngOnInit() {
	this.getDiagnosis(this.data.examinationId);
  }

  onTextChange(value: any): void {
	this.oldDesc = value;
    if(this.oldDesc.trim() !== ''){
      this.activeButton = true;
    }
	else{
		this.activeButton = false;
	}
  }

  getDiagnosis(examinationId: number): void {
    this.http.get<Diagnosis>(
      `http://localhost:8080/diagnosis/${examinationId}`
    ).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Diagnosis not found for examinationId:', examinationId);
          return of(null);
        } else {
          console.error('An error occurred while fetching diagnosis:', error);
          return throwError('Error occurred.');
        }
      })
    ).subscribe(
      (data) => {  
          this.diagnosis = data;
		  if(this.diagnosis)
		  	this.oldDesc = this.diagnosis?.description;
      }
    );
  }

  /*diagnosises: Diagnosis[] = [];

  appendData(newDiagnosis: any): void {
		this.diagnosises.push(newDiagnosis);
	}

	removeItem(diagnosisId: number): void {
		this.http.delete(
			"http://localhost:8080/diagnosis/" + diagnosisId
		).subscribe(data => 
			this.diagnosises = this.diagnosises.filter((diagnosis: Diagnosis) =>
			diagnosis.id != diagnosisId));
	}*/

	onSubmit(): void{
		const descRef = this.desc.nativeElement.querySelector('#desc');
		if(descRef){
			this.data.oldDesc = descRef.value;
		if(this.data.isNewExamination === true){
			
				this.http.post("http://localhost:8080/diagnosis", {
				examinationId: this.data.examinationId,
				description: descRef.value
			}).subscribe((response) => {
				console.log(response);
			  }, (error) => {
				console.log(error);
			  });
			
		} else if(this.data.isNewExamination === false){
			
				this.http.put(`http://localhost:8080/diagnosis/${this.data.examinationId}`, {
				id: this.data.diagnosisId,
				examinationId: this.data.examinationId,
				description: descRef.value
			}).subscribe((response) => {
				console.log(response);
			  }, (error) => {
				console.log(error);
			  });
		}
	}
		
		
	}	

}

export interface DiagnosisDialogData {
	diagnosisId: number | null;
	examinationId: number;
	isNewExamination: boolean;
	oldDesc: string
  }
