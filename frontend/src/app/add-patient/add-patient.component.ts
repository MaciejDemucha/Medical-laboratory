import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from '../bucket/bucket.component';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
  standalone: true,
  imports: [FormsModule,MatSnackBarModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, CommonModule, MatButtonModule],
})
export class AddPatientComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  postalFormControl = new FormControl('', [Validators.required]);
  peselFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  address: string = "";
  phone: string = "";
  city: string = "";
  postal: string = "";
  pesel: string = "";

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private router: Router) {}

  onAuthFailure(){
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
    location.reload();
    }

  addPatient(){
    if(this.email != "" && this.firstName != "" && this.lastName != "" && this.pesel != "" && this.address != "" && this.phone != "" && this.city != "" && this.postal != ""){
      var birthDate = this.getBirthDateFromPesel(this.pesel)
      const data = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        pesel: this.pesel,
        street: this.address,
        phone: this.phone,
        city: this.city,
        postalCode: this.postal,
        birthDate: birthDate
      };

      const authToken = localStorage.getItem('auth_token');
      const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` });

this.http.post<any>(`http://localhost:8080/patients`, data, { headers }).subscribe(
  (response) => {
    this.openSnackBar("Dodano pacjenta"); 
  },
  (error) => {
    console.error(error);
    if(error.status === 401){
      this.onAuthFailure();
    }
    this.openSnackBar("Nie podano wymaganych danych lub są one niewłaściwe"); 
  }
);
    }
    
  }

  getBirthDateFromPesel(pesel :string){
     
    var substring = pesel.substr(0, 6);
   
    var year = parseInt(substring.substr(0, 2), 10);
    var month = parseInt(substring.substr(2, 2),10);
    var day = parseInt(substring.substr(4, 2),10);

    if(month > 12){
      month -= 20;
      return  day.toString() + "." + month.toString() + "." + "20" + year.toString();
    }
    else{
      return day.toString() + "." + month.toString() + "." + "19" + year.toString();
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
