import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Diagnosis } from '../diagnosis';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogData } from '../dialog-data/dialog-data.component';
import { MAT_DIALOG_DATA , MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule ,FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule, CommonModule],
})
export class AddDiagnosisComponent implements OnInit {
	@ViewChild('desc') input?: ElementRef<HTMLInputElement>;
	oldDesc: string = "";
	activeButton: boolean = true;
	diagnosis: Diagnosis | null = new Diagnosis(0, 0, "");
	showSpinner: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddDiagnosisComponent>,private authService: AuthService,private _snackBar: MatSnackBar, private router: Router, private http: HttpClient, private desc: ElementRef, @Inject(MAT_DIALOG_DATA) public data: DiagnosisDialogData){
  }

  ngOnInit() {
	this.authService.checkAuthentication();
	this.getDiagnosis(this.data.examinationId);
  }

  onTextChange(value: any): void {
	this.oldDesc = value;
    if(this.oldDesc.trim() !== ''){
      this.activeButton = true;
    }
	else{
		this.activeButton = false;
	}
  }

  onAuthFailure(){
	localStorage.setItem('isAuthenticated', 'false');
    this.authService.isAuthenticated = false;
    localStorage.removeItem('auth_token');
	localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  getDiagnosis(examinationId: number): void {
	const authToken = localStorage.getItem('auth_token');
	const headers = new HttpHeaders({
		'Authorization': `Bearer ${authToken}`
	  });
	  
    this.http.get<Diagnosis>(
      `http://localhost:8080/diagnosis/${examinationId}`, 
	  { headers }
    ).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Diagnosis not found for examinationId:', examinationId);
          return of(null);
        } else if (error.status === 401) {
			this.onAuthFailure();
			return of(null);
		} 
		else {
          console.error('An error occurred while fetching diagnosis:', error);
          return throwError('Error occurred.');
        }
      })
    ).subscribe(
      (data) => {  
          this.diagnosis = data;
		  if(this.diagnosis)
		  	this.oldDesc = this.diagnosis?.description;
      }
    );
  }

	onSubmit(): void{
		this.showSpinner = true;
		const authToken = localStorage.getItem('auth_token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${authToken}`
		  });

		const descRef = this.desc.nativeElement.querySelector('#desc');
		if(descRef){
			this.data.oldDesc = descRef.value;
		if(this.data.isNewExamination === true){
				this.http.post("http://localhost:8080/diagnosis", {
				examinationId: this.data.examinationId,
				description: descRef.value
			}, {headers}).subscribe((response) => {
				
				this.openSnackBar("Diagnoza została dodana");
				this.dialogRef.close();
			  }, (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });
			
		} else if(this.data.isNewExamination === false){
			
				this.http.put(`http://localhost:8080/diagnosis/${this.data.examinationId}`, {
				id: this.data.diagnosisId,
				examinationId: this.data.examinationId,
				description: descRef.value
			}, {headers}).subscribe((response) => {
				this.openSnackBar("Diagnoza została zmieniona");
				this.dialogRef.close();
			  }, (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });
		}
	}
		
		
	}	

	openSnackBar(message: string) {
		this._snackBar.open(message);
	  }

}

export interface DiagnosisDialogData {
	diagnosisId: number | null;
	examinationId: number;
	isNewExamination: boolean;
	oldDesc: string
  }
