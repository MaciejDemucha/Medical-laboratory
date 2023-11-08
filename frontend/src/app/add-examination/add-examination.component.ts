import { Component } from '@angular/core';
import { ExaminationOffer } from '../examinationOffer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.css']
})
export class AddExaminationComponent {
  constructor(private router: Router, private http: HttpClient){}
  offers: ExaminationOffer[] = [new ExaminationOffer(1, "Badanie xyz", 60)];


  appendData(newExamination: any): void {
		this.offers.push(newExamination);
	}

	onAuthFailure(){
		localStorage.setItem('isAuthenticated', 'false');
		this.router.navigate(['/']);
	  }

	removeItem(examinationId: number): void {
		const authToken = localStorage.getItem('auth_token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${authToken}`
		  });

		this.http.delete(
			"http://localhost:8080/offers/" + examinationId, {headers}
		).subscribe(data => 
			this.offers = this.offers.filter((examination: ExaminationOffer) =>
			examination.id != examinationId),
			 (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });
	}

}
