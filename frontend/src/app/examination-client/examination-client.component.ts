import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Examination } from '../examination';
import { ExaminationOffer } from '../examinationOffer';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-examination-client',
  templateUrl: './examination-client.component.html',
  styleUrls: ['./examination-client.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class ExaminationClientComponent {
  offers: ExaminationOffer[] = [new ExaminationOffer(1, "Badanie xyz","Opis", 60), new ExaminationOffer(1, "Badanie xyz","Opis", 60), new ExaminationOffer(1, "Badanie xyz","Opis", 60), new ExaminationOffer(1, "Badanie xyz","Opis", 60), new ExaminationOffer(1, "Badanie xyz","Opis", 60), new ExaminationOffer(1, "Badanie xyz","Opis", 60)];
 // @Input() examination = new ExaminationOffer(0, "", 0);
 // @Output() addItemEvent = new EventEmitter();

  constructor(private http: HttpClient){}

  ngOnInit(): void{
    /*this.http.get<ExaminationOffer[]> (
      "http://localhost:8080/offers"
    ).subscribe(data => this.offers = data);*/
  }

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

  addItemToBucket(examinationId: number|null): void {
		
	}

}
