import { NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule,MatDialogModule, MatButtonModule, NgIf, CommonModule, MatListModule, MatIconModule, MatSnackBarModule],
})
export class UploadDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: UploadDialogData, private http: HttpClient,private authService: AuthService,private _snackBar: MatSnackBar, private router: Router){}
fileName = '';
file: File|null = null;
showSpinner: boolean = false;

onFileSelected(event: any) {

  this.file = event.target.files[0];

}

uploadFile(patientId: number) {

  if (this.file) {

      this.fileName = this.file.name;

      const formData = new FormData();

      const authToken = localStorage.getItem('auth_token');
      const jsonHeaders = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      formData.append('file', this.file);
      formData.append('patientId', patientId.toString());
      
    this.showSpinner = true;
    this.http.post('http://localhost:8080/examinations', formData, { headers: jsonHeaders }).subscribe(

    (response) => {
      this.openSnackBar("Dodano wyniki"); 
      this.showSpinner = false;
    },
    (error) => {
      this.showSpinner = false;
      console.error(error);
      if(error.status === 401){
        this.onAuthFailure();
      }
      this.openSnackBar("Błąd. Nie podano pliku we właściwym formacie"); 
    }
    );
  }
}

onAuthFailure(){
  localStorage.setItem('isAuthenticated', 'false');
  this.authService.isAuthenticated = false;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('role');
  this.router.navigate(['/']);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

}


export interface UploadDialogData {
  patientId: any,
}