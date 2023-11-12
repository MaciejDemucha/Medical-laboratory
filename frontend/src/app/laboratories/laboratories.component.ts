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
  
  
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();
  map?: google.maps.Map = undefined;
  marker: google.maps.Marker = new google.maps.Marker({
    
  });


  constructor(private http: HttpClient){}
  
  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 10,
      center: { lat: 51.107482, lng: 17.010159 },
      mapTypeControl: false,
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

  chooseLabGeocode(address: string): void{ 
    this.geocode({ address: address });
  }

  geocode(request: google.maps.GeocoderRequest): void {
    if(this.markerPositions.length > 0){
      this.markerPositions = [];
    }
  
    this.geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        if(this.map){
          this.map.setCenter(results[0].geometry.location);
          this.marker.setPosition(results[0].geometry.location);
          this.marker.setMap(this.map);
        }
        
      
        return results;
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }

 
}
