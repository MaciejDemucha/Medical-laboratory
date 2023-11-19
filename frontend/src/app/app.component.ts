import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AxiosService } from './axios.service';
import { Examination } from './examination';
import { Patient } from './patient';
import { ExaminationOffer } from './examinationOffer';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Laboratorium medyczne';
  patients: Patient[] = [];
  componentToShow: string = "";
  //isAuthenticated: boolean = false;
  //loggedId: number|null = null;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar,private route: ActivatedRoute, private http: HttpClient, private axiosService: AxiosService, private router: Router){

  }

  public getIsAuthenticated(): any {
    return this.authService.isAuthenticated;
  }

  public getLoggedId(): any{
    return this.authService.loggedId;
  }

  homeIcon() {
	this.componentToShow = "";
	if(this.getIsAuthenticated() === false)
		this.router.navigate(['/shop']);
	else
		this.router.navigate(['/patients']);
	
  }

  ngOnInit(): void{
	//this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
	//if(this.isAuthenticated)
	//this.loggedId = parseInt(localStorage.getItem('loggedId') ?? "", 10);

	/*this.router.events.subscribe((event) => {
		const routeConfig = this.route.snapshot?.routeConfig;
		if (event instanceof NavigationEnd && routeConfig && routeConfig.path === '') {
		  this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
		}
	  });*/
  }

  onPatientsTab(): void{
	this.componentToShow = "";
	const url = this.router.serializeUrl(this.router.createUrlTree(['/patients'], { queryParams: { id: this.getLoggedId()} }));
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

  onLaboratoriesTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/laboratories']);
  }

  onShopTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/shop']);
  }

  onBucketTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/bucket']);
  }

  onAddPatientTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/addpatient']);
  }
  onAddResultTab(): void {
	this.componentToShow = "";
	this.router.navigate(['/addresult']);
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
				this.authService.loggedId = response.data.id;
		        this.componentToShow = "restricted";
				//this.isAuthenticated = true;
				this.authService.isAuthenticated = true;
				localStorage.setItem('isAuthenticated', 'true');
				if(this.authService.loggedId?.toString() !== undefined)
					localStorage.setItem('loggedId', this.authService.loggedId?.toString());
				this.onPatientsTab();

		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				this.openSnackBar("Błędne dane logowania");
				
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
		        /*this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "restricted";
				//this.isAuthenticated = true;
				this.authService.isAuthenticated = true;
				localStorage.setItem('isAuthenticated', 'true');*/
				this.openSnackBar("Utworzono konto");
				
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "login";
				this.openSnackBar("Błąd rejestracji");
				
		    }
		);
	}

	openSnackBar(message: string) {
		this._snackBar.open(message);
	  }

	onLogout(): void {
		//this.isAuthenticated = false;
		this.authService.isAuthenticated = false;
		localStorage.setItem('isAuthenticated', 'false');
		localStorage.removeItem('auth_token');
		this.showComponent("login");
	}

	

	


}
