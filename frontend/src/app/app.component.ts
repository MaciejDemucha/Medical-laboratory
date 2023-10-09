import { Component } from '@angular/core';
import { Examination } from './examination-display/examination';
import {HttpClient} from '@angular/common/http';
import { AxiosService } from './axios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Laboratorium medyczne';

  examinations: Examination[] = [];
  componentToShow: string = "login";
	showError: boolean = false;
	message: string = " ";

  constructor(private http: HttpClient, private axiosService: AxiosService){

  }

  ngOnInit(): void{
    this.http.get<Examination[]> (
      "http://localhost:8080/examinations"
    ).subscribe(data => this.examinations = data);
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

	onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/login",
		    {
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
				
				
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				this.showError = true;
				this.message = "Invalid username or password"
				
		    }
		);

	}

	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
				
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				this.showError = true;
				this.message = "Error with register"
				
		    }
		);
	}


}
