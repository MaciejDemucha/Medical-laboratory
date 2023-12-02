import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
  standalone: true,
  imports: [FormsModule,MatSnackBarModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, CommonModule, MatButtonModule],
})
export class AddPatientComponent implements OnInit {

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

  constructor(private authService: AuthService,private _snackBar: MatSnackBar, private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.checkAuthentication();
  }

  onAuthFailure(){
    localStorage.setItem('isAuthenticated', 'false');
    this.authService.isAuthenticated = false;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
    }

  addPatient(){
    if(!this.emailFormControl.hasError('email') && 
    !this.emailFormControl.hasError('required') &&  
    !this.firstNameFormControl.hasError('required') && 
    !this.lastNameFormControl.hasError('required')  && 
    this.pesel.length == 11 && 
    !this.addressFormControl.hasError('required')  && 
    this.phone.length >= 9  && 
    !this.cityFormControl.hasError('required')  && 
    !this.postalFormControl.hasError('required') ) {
      
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
    else {
      this.openSnackBar("Pacjent o tym numerze PESEL już istnieje lub podane dane są niewłaściwe"); 
    }
    
  }

  getBirthDateFromPesel(pesel :string){
    var substring = pesel.substr(0, 6);
   
    var year = substring.substr(0, 2);
    var day = substring.substr(4, 2);
    var monthString = substring.substr(2, 2);
    var month = parseInt(substring.substr(2, 2),10);

    if(month >= 21){
      month -= 20;
      monthString = month.toString();
      
      if(month < 10){
         monthString = "0" + month.toString()
      }

      return  day + "." + monthString + "." + "20" + year;
    }
    else{
      return day + "." + monthString + "." + "19" + year;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
