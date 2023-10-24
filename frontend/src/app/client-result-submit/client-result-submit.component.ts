import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Examination } from '../examination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-result-submit',
  templateUrl: './client-result-submit.component.html',
  styleUrls: ['./client-result-submit.component.css']
})
export class ClientResultSubmitComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  number: string = "";
  pesel: string = "";
  examination: Examination = new Examination(0, "", "", "");

  constructor(private http: HttpClient,private router: Router){}

  onSubmitResult(): void{

    this.http.get<Examination> (
      `http://localhost:8080/examinations/result/${this.pesel}/${this.number}`
    ).subscribe(data => {
      this.examination = data;
      const url = this.router.serializeUrl(this.router.createUrlTree(['/singleresult'], { queryParams: { number: this.number, pesel: this.pesel } }));
      window.open(url, '_blank');
    },
      error => {
        alert("Podano błędne dane lub wyniki badań nie zostały jeszcze zamieszczone");
        return;
      }
      );
    
  }

  
}
