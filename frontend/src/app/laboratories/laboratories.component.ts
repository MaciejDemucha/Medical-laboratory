import { Component, OnInit } from '@angular/core';
import { Laboratory } from '../laboratory';
import { Schedule } from '../schedule';
import { MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit {
  schedule: Schedule[] = [new Schedule(1,'Poniedziałek', '08:00:00', '17:00:00'),
  new Schedule(2,'Wtorek', '08:00:00', '17:00:00'),
  new Schedule(3,'Środa', '08:00:00', '17:00:00'),
  new Schedule(4,'Czwartek', '08:00:00', '17:00:00'),
  new Schedule(5,'Piątek', '08:00:00', '17:00:00'),]
  labs: Laboratory[] = [new Laboratory(1, '121334423','plac Grunwaldzki 18-20', '50-384', 'Wrocław', this.schedule),
  new Laboratory(1, '121334423','plac Grunwaldzki 18-20', '50-384', 'Wrocław', this.schedule)]
  
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private httpClient: HttpClient){}
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
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

     this.httpClient.get(geocodingApiUrl).pipe(
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
