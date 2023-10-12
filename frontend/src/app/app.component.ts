import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AxiosService } from './axios.service';
import { Examination } from './examination';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Laboratorium medyczne';

  examinations: Examination[] = [];
  componentToShow: string = "examinations";
	showError: boolean = false;
	isAuthenticated: boolean = false;
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

  onLoginTab(): void {
	this.componentToShow = "login";
  }

  onShopTab(): void {
	this.componentToShow = "examinations";
  }

  onBucketTab(): void {
	
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
		        this.componentToShow = "restricted";
				this.showError = false;
				this.isAuthenticated = true;
				
				
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				//this.showError = true;
				//this.message = "Invalid username or password"
				alert("Błędne dane logowania");
				
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
		        this.componentToShow = "restricted";
				this.showError = false;
				this.isAuthenticated = true;
				
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				//this.showError = true;
				//this.message = "Error with register"
				alert("Błąd rejestracji")
				
		    }
		);
	}

	onLogout(): void {
		this.isAuthenticated = false;
		localStorage.removeItem('auth_token');
		this.showComponent("login");
	}

	appendData(newExamination: any): void {
		this.examinations.push(newExamination);
	}

	removeItem(examinationId: number): void {
		this.http.delete(
			"http://localhost:8080/examinations/" + examinationId
		).subscribe(data => 
			this.examinations = this.examinations.filter((examination: Examination) =>
			examination.id != examinationId));
	}

	addItemToBucket(examinationId: number): void {
		
	}


}
