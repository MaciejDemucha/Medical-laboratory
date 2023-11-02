import { Component, ElementRef, Inject } from '@angular/core';
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

  constructor(private http: HttpClient, private desc: ElementRef, @Inject(MAT_DIALOG_DATA) public data: DiagnosisDialogData){}

  diagnosises: Diagnosis[] = [];

  appendData(newDiagnosis: any): void {
		this.diagnosises.push(newDiagnosis);
	}

	onSubmit(): void{
		const descRef = this.desc.nativeElement.querySelector('#desc');
		if(descRef){
			this.http.post("http://localhost:8080/diagnosis", {
			examinationId: this.data.examinationId,
			description: descRef.value
		}).subscribe((response) => {
			console.log(response);
		  }, (error) => {
			console.log(error);
			console.log(descRef)
		  });
		}
		
	}

	removeItem(diagnosisId: number): void {
		this.http.delete(
			"http://localhost:8080/diagnosis/" + diagnosisId
		).subscribe(data => 
			this.diagnosises = this.diagnosises.filter((diagnosis: Diagnosis) =>
			diagnosis.id != diagnosisId));
	}
	

}

export interface DiagnosisDialogData {
	examinationId: any;
  }
