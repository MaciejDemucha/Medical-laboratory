import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../shoppingcart.service';
import { ExaminationOffer } from '../examinationOffer';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit{
  bucket: any[] = [];
  sumToPay: number = 0;
    constructor(private shopService: ShoppingcartService){}

    ngOnInit(){
      this.bucket = this.shopService.getCart();
      this.calculateSumOfPrices(this.bucket);
    }

    removeFromBucket(examination: any){
      this.bucket = this.bucket.filter(item => item !== examination);
      this.shopService.saveCart(this.bucket);
      this.calculateSumOfPrices(this.bucket);
    }

    calculateSumOfPrices(exams: ExaminationOffer[]) {
      this.sumToPay = exams.reduce((sum, exam) => sum + exam.price, 0); 
  }

    inputCredentials(){
      
    }
}
