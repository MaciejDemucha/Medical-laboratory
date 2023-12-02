import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Examination } from '../examination';
import { ExaminationOffer } from '../examinationOffer';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ShoppingcartService } from '../shoppingcart.service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-examination-client',
  templateUrl: './examination-client.component.html',
  styleUrls: ['./examination-client.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatSnackBarModule, MatExpansionModule],
})
export class ExaminationClientComponent {
  offers: ExaminationOffer[] = [];
  bucket: any[] = [];

  constructor(private http: HttpClient, private shopService: ShoppingcartService, private _snackBar: MatSnackBar){}

  ngOnInit(): void{
    this.http.get<ExaminationOffer[]> (
      "http://localhost:8080/offers"
    ).subscribe(data => this.offers = data);
  }

  appendData(newExamination: any): void {
		this.offers.push(newExamination);
	}

  isInBucket(examination: ExaminationOffer){
    let checkBucket = this.bucket;
   const result = checkBucket.filter(f => 
      f.id === examination.id &&
      f.name === examination.name);

      return result.length > 0;
  }

  addItemToBucket(examination: ExaminationOffer): void {
      this.bucket = this.shopService.getCart();
      
    if (!this.isInBucket(examination)) {
      this.shopService.addToCart(examination);
      this.bucket = this.shopService.getCart();
      this.openSnackBar("Dodano pozycję do koszyka"); 
    }
    else {
      this.openSnackBar("Pozycja już jest w koszyku"); 
    }
		
	}

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

}
