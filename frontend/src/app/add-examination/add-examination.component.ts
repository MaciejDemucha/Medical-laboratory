import { Component } from '@angular/core';
import { ExaminationOffer } from '../examinationOffer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.css']
})
export class AddExaminationComponent {
  constructor(private http: HttpClient){}
  offers: ExaminationOffer[] = [new ExaminationOffer(1, "Badanie xyz", 60)];


  appendData(newExamination: any): void {
		this.offers.push(newExamination);
	}

	removeItem(examinationId: number): void {
		this.http.delete(
			"http://localhost:8080/offers/" + examinationId
		).subscribe(data => 
			this.offers = this.offers.filter((examination: ExaminationOffer) =>
			examination.id != examinationId));
	}

}
