import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Examination } from '../examination';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-result-submit',
  templateUrl: './client-result-submit.component.html',
  styleUrls: ['./client-result-submit.component.css']
})
export class ClientResultSubmitComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  number: string = "";
  password: string = "";
  examination: Examination = new Examination(0,0 ,"", "", "");

  constructor(private _snackBar: MatSnackBar,private http: HttpClient,private router: Router){}

  onSubmitResult(): void{

    this.http.get<Examination> (
      `http://localhost:8080/examinations/result/${this.number}/${this.password}`
    ).subscribe(data => {
      this.examination = data;
      const url = this.router.serializeUrl(this.router.createUrlTree(['/singleresult/result'], { queryParams: { number: this.number, password: this.password, id: this.examination.patientId } }));
      //window.open(url, '_blank');
      this.router.navigateByUrl(url);
    },
      error => {
        this.openSnackBar("Podano błędne dane lub wyniki badań nie zostały jeszcze zamieszczone");
        return;
      }
      );
    
  }

  openSnackBar(message: string) {
		this._snackBar.open(message);
	  }
}
