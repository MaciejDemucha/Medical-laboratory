import { Component, OnInit, ViewChild } from '@angular/core';
import { Laboratory } from '../laboratory';
import { Schedule } from '../schedule';
import { MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Address } from '../address';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css'],
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatMenuModule, MatCardModule],
})
export class LaboratoriesComponent implements OnInit {
  
  addressList: { [key: number]: any } = {};
  addressArray: Address[] = [];
  labs: Laboratory[] = [];
  labIdArray: number[] = [];
  scheduleList: { [key: number]: any } = {};
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['Ulica', 'Kod pocztowy', 'Miasto', 'Wybierz placówkę'];
  idLabToShow: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
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
         this.getLaboratoryAddress(lab.id);  
     });
    
     this.dataSource.paginator = this.paginator;
    }
      ,
      (error) => {
				console.log(error);
			  });

  }

  findLabById(id: number){
    let foundLab = this.labs.find(lab => lab.id === id);
    return foundLab;
  }

  getLaboratoryAddress(id: number): void {
    this.http.get<Address> (
      `http://localhost:8080/laboratories/address/${id}`
    ).subscribe(data =>{
      this.addressList[id] = data;
      this.getLaboratorySchedule(id);
    },
      (error) => {
        console.log(error);
        });
  }

  getLaboratorySchedule(id: number): void {
    this.http.get<Schedule[]> (
      `http://localhost:8080/schedule/${id}`
    ).subscribe(data => {
      this.scheduleList[id] = data;
      this.dataSource.data.push({labId: id, street: this.addressList[id].street, postalCode: this.addressList[id].postalCode, city: this.addressList[id].city});
      this.applyFilterOnInit()
    },
      (error) => {
        console.log(error);
        });
  }

  chooseLabGeocode(address: string, id:number): void{ 
    this.geocode({ address: address });
    this.idLabToShow = id;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterOnInit() {
    const filterValue = "";
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}
