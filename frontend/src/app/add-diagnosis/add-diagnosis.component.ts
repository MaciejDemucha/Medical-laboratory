import { Component } from '@angular/core';
import { Diagnosis } from '../diagnosis';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css']
})
export class AddDiagnosisComponent {

  constructor(private http: HttpClient){}

  diagnosises: Diagnosis[] = [];

  appendData(newDiagnosis: any): void {
		this.diagnosises.push(newDiagnosis);
	}

	removeItem(diagnosisId: number): void {
		this.http.delete(
			"http://localhost:8080/diagnosises/" + diagnosisId
		).subscribe(data => 
			this.diagnosises = this.diagnosises.filter((diagnosis: Diagnosis) =>
			diagnosis.id != diagnosisId));
	}

}
