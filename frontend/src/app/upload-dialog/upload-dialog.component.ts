import { NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf, CommonModule, MatListModule, MatIconModule],
})
export class UploadDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: UploadDialogData, private http: HttpClient){}
fileName = '';
file: File|null = null;

onFileSelected(event: any) {

  this.file = event.target.files[0];

}

uploadFile() {

  if (this.file) {

      this.fileName = this.file.name;

      const formData = new FormData();

      formData.append("thumbnail", this.file);

      const upload$ = this.http.post("http://localhost:8080/examinations", formData);

      upload$.subscribe();
  }
}


}


export interface UploadDialogData {
  patientId: any,
}