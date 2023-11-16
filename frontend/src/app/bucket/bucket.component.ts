import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../shoppingcart.service';
import { ExaminationOffer } from '../examinationOffer';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
  standalone: true,
  imports: [FormsModule,MatSnackBarModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, CommonModule, MatButtonModule],
})
export class BucketComponent implements OnInit{
  bucket: any[] = [];
  sumToPay: number = 0;
  cardToShow = "summary";

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  repeatEmailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);

  email : string = "";
  repeatedEmail : string = "";
  firstName : string = "";
  lastName : string = "";

  matcher = new MyErrorStateMatcher();

    constructor(private shopService: ShoppingcartService, private http: HttpClient, public dialog: MatDialog, private _snackBar: MatSnackBar){}

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

    setCard(name: string){
        this.cardToShow = name;
    }

    submitOrder(){
        if(this.email === this.repeatedEmail && this.email != ""){
          const data = {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            sumToPay: this.sumToPay,
            bucket: this.bucket
          };

          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(`http://localhost:8080/order`, data, { headers }).subscribe(
      (response) => {
        this.setCard("confirm");
        this.bucket = [];
        this.shopService.clearCart();
      },
      (error) => {
        
        console.error(error);
      }
    );
        }
        else if (this.email != this.repeatedEmail){
            this.openSnackBar("Podane adresy email muszą być takie same"); 
        }
    }

    openSnackBar(message: string) {
      this._snackBar.open(message);
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}