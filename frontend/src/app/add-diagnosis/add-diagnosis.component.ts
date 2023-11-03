import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule],
})
export class AddDiagnosisComponent {

  constructor(private http: HttpClient, private desc: ElementRef, @Inject(MAT_DIALOG_DATA) public data: DiagnosisDialogData){
	const textareaElement = document.getElementById('desc') as HTMLTextAreaElement;
    if (textareaElement && data.isNewExamination === false) {
      textareaElement.value = data.oldDesc;
    }
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
		if(this.data.isNewExamination === true){
			if(descRef){
				this.http.post("http://localhost:8080/diagnosis", {
				examinationId: this.data.examinationId,
				description: descRef.value
			}).subscribe((response) => {
				console.log(response);
			  }, (error) => {
				console.log(error);
			  });
			}
		} else if(this.data.isNewExamination === false){
			if(descRef){
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
