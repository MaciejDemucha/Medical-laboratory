import { Component, OnInit } from '@angular/core';
import { Laboratory } from '../laboratory';
import { Schedule } from '../schedule';
import { MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Address } from '../address';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit {
  
  addressList: { [key: number]: any } = {};
  labs: Laboratory[] = [];
  scheduleList: { [key: number]: any } = {};
  
  center: google.maps.LatLngLiteral = {lat: 51.107482, lng: 17.010159};
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private http: HttpClient){}
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.http.get<Laboratory[]> (
      `http://localhost:8080/laboratories`
    ).subscribe(data => {
      this.labs = data
      this.labs.forEach((lab) => {
         this.getLaboratorySchedule(lab.id);
         this.getLaboratoryAddress(lab.id);
     });
    }
      ,
      (error) => {
				console.log(error);
			  });

  }

  getLaboratorySchedule(id: number): void {
    this.http.get<Schedule[]> (
      `http://localhost:8080/schedule/${id}`
    ).subscribe(data => this.scheduleList[id] = data,
      (error) => {
        console.log(error);
        });
  }

  getLaboratoryAddress(id: number): void {
    this.http.get<Address[]> (
      `http://localhost:8080/laboratories/address/${id}`
    ).subscribe(data => this.addressList[id] = data,
      (error) => {
        console.log(error);
        });
  }

  chooseLab(lab: any): void {
    if(this.markerPositions.length > 0){
      this.markerPositions = [];
    }

    const address: string = `${lab.street} ${lab.postalCode} ${lab.city}`; 

    const apiKey = 'AIzaSyCjr0X1g_VEnZTKerF1_szlhiJRrcTz5-g';
    const geocodingApiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

     this.http.get(geocodingApiUrl).pipe(
      map((response: any) => {
        const location = response.results[0].geometry.location;
        const position: google.maps.LatLngLiteral = { lat: location.lat, lng: location.lng };
        this.markerPositions.push(position);
        console.log(this.markerPositions)
      })
    );
    
    /*const position: google.maps.LatLngLiteral = { lat: 49.70396911336614, lng: 10.287894531249998 };
    this.markerPositions.push(position);
    console.log(this.markerPositions)*/
  }

  
    
  


  /*addMarker(event: google.maps.MapMouseEvent) {
    if(this.markerPositions.length > 0){
      this.markerPositions = [];
    }

    if(event.latLng)
    this.markerPositions.push(event.latLng.toJSON());
  }*/

  /*removeMarker(index: number) {
    this.markerPositions.splice(index, 1);
  }*/
}
