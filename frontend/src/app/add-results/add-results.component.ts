import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-add-results',
  templateUrl: './add-results.component.html',
  styleUrls: ['./add-results.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatDialogModule],
})
export class AddResultsComponent implements OnInit, AfterViewInit{
  patients: Patient[] = [];
  displayedColumns: string[] = ['Pesel', 'Imię', 'Nazwisko', 'Dodaj', 'Badania'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Patient> = new MatTableDataSource(this.patients);

  constructor(private authService: AuthService,private http: HttpClient, private router: Router, public dialog: MatDialog){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.authService.checkAuthentication();
    this.getPatients();
  }

  getPatients(){
    const authToken = localStorage.getItem('auth_token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${authToken}`
		  });

    this.http.get<Patient[]> (
      `http://localhost:8080/patients`, {headers}
    ).subscribe(data => {
      this.patients = data;
      this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.paginator = this.paginator;

    },
      (error) => {
				console.log(error);
				if(error.status === 401){
					this.onAuthFailure();
				}
			  });
  }

  addResult(patient: Patient) {
   
      const dialogRef = this.dialog.open(UploadDialogComponent, {
        data: {
          patientId: patient.id,
        },
      });
     
      dialogRef.afterClosed().subscribe(result => {
       
      });
  }

  showPatientExaminations(patient: Patient): void{
    const url = this.router.serializeUrl(this.router.createUrlTree(['/patients/results'], { queryParams: { id: patient.id, canWriteDiagnosis: false } }));
    this.router.navigateByUrl(url);
    //window.open(url, '_blank');

  }

  onAuthFailure(){
    localStorage.setItem('isAuthenticated', 'false');
    this.authService.isAuthenticated = false;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
    }


}
