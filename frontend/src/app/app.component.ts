import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AxiosService } from './axios.service';
import { Examination } from './examination';
import { Patient } from './patient';
import { ExaminationOffer } from './examinationOffer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Laboratorium medyczne';
  patients: Patient[] = [];
  componentToShow: string = "";
  isAuthenticated: boolean = false;
  loggedId: number|null = null;

  constructor(private http: HttpClient, private axiosService: AxiosService, private router: Router){
	this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  homeIcon() {
	this.componentToShow = "";
	this.router.navigate(['/shop']);
  }

  ngOnInit(): void{
    //this.router.navigate(['/shop'])
  }

  onPatientsTab(): void{
	this.componentToShow = "";
	const url = this.router.serializeUrl(this.router.createUrlTree(['/patients'], { queryParams: { id: this.loggedId} }));
	this.router.navigateByUrl(url);
  }

  onAddTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/addExamination']);
  }

  showComponent(componentToShow: string): void {
	this.router.navigate(['/'])
    this.componentToShow = componentToShow;
  }

  onLoginTab(): void {
	this.componentToShow = "";
	this.showComponent("login");
  }

  onResultTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/singleresult']);
  }

  onShopTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/shop']);
  }

  onBucketTab(): void {
	this.componentToShow = "";
	
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
				this.loggedId = response.data.id;
		        this.componentToShow = "restricted";
				this.isAuthenticated = true;
				localStorage.setItem('isAuthenticated', 'true');

		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
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
				this.isAuthenticated = true;
				localStorage.setItem('isAuthenticated', 'true');
				
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				alert("Błąd rejestracji")
				
		    }
		);
	}

	onLogout(): void {
		this.isAuthenticated = false;
		localStorage.setItem('isAuthenticated', 'false');
		localStorage.removeItem('auth_token');
		this.showComponent("login");
	}

	

	


}
