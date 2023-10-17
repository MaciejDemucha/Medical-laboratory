import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExaminationDisplayComponent } from '../examination-display/examination-display.component';
import { ExaminationEditComponent } from '../examination-edit/examination-edit.component';
import { CommonModule } from '@angular/common';
import { Examination } from '../examination';
import { ExaminationOffer } from '../examinationOffer';

@Component({
  selector: 'app-examination-wrapper',
  templateUrl: './examination-wrapper.component.html',
  styleUrls: ['./examination-wrapper.component.css'],
  standalone: true,
  imports: [ExaminationDisplayComponent, ExaminationEditComponent, CommonModule]
})
export class ExaminationWrapperComponent {
    @Input() examination: ExaminationOffer = new ExaminationOffer(0, "", 0);
    @Output() removeItemEvent = new EventEmitter();

    editable: boolean = false;

    handleEditClick(): void {
      this.editable = true;
    }

    handleSaveEdition(examination: ExaminationOffer): void{
      this.editable = false;
      this.examination = examination;
    }
}
