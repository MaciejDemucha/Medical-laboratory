import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, NgIf, CommonModule],
})
export class DialogDataComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}

export interface DialogData {
  patientid: any,
  doctorList: any;
}
