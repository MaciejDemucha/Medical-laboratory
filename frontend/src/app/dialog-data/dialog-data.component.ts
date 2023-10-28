import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf, CommonModule, MatListModule],
})
export class DialogDataComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient) {}

  assignDoctor(patientId :number, doctorId :number) :void{
    this.http.put(
      `http://localhost:8080/assign-doctor/${doctorId}/${patientId}`
    , {}).subscribe(
      (response) => {
        console.log('Data updated successfully:', response);
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );

  }

}

export interface DialogData {
  patientId: any,
  doctorList: [any];
}
