import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExaminationDisplayComponent } from '../examination-display/examination-display.component';
import { ExaminationEditComponent } from '../examination-edit/examination-edit.component';
import { CommonModule } from '@angular/common';
import { Examination } from '../examination';

@Component({
  selector: 'app-examination-wrapper',
  templateUrl: './examination-wrapper.component.html',
  styleUrls: ['./examination-wrapper.component.css'],
  standalone: true,
  imports: [ExaminationDisplayComponent, ExaminationEditComponent, CommonModule]
})
export class ExaminationWrapperComponent {
    @Input() examination: Examination = new Examination(0, "", 0.00);
    @Output() removeItemEvent = new EventEmitter();

    editable: boolean = false;

    handleEditClick(): void {
      this.editable = true;
    }

    handleSaveEdition(examination: Examination): void{
      this.editable = false;
      this.examination = examination;
    }
}
