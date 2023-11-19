import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  public isAuthenticated : boolean = false;
  loggedId: number|null = null;

  constructor() { }

  ngOnInit(): void {
    this.checkAuthentication();
    if(this.isAuthenticated)
	    this.loggedId = parseInt(localStorage.getItem('loggedId') ?? "", 10);
  }

  public checkAuthentication(){
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }
}
