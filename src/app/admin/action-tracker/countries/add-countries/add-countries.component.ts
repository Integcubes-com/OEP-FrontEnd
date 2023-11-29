import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CCluster, CRegions, CUsers } from 'src/app/shared/common-interface/common-interface';
import { Regions } from '../../regions/region-main/region.model';
import { CountriesModel, CountryApiData } from './add-country.model';
import { AddCountriesService } from './add-countries.service';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { DeleteCountryFormComponent } from './dialogs/delete-country-form/delete-country-form.component';
import { AddCountryFormComponent } from './dialogs/add-country-form/add-country-form.component';

@Component({
  selector: 'app-add-countries',
  templateUrl: './add-countries.component.html',
  styleUrls: ['./add-countries.component.sass']
})
export class AddCountriesComponent  extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Common Variables
  errorMessage:string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Varaibles
  countries: CountriesModel[];
  regions:CRegions[];
  users:CUsers[];
  cluster:CCluster[];
  constructor(private snackBar: MatSnackBar, private dataService: AddCountriesService,private dataService2: CommonService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'regionTitle', 'countryTitle', 'countryCode', 'executiveDirectorTitle', 'executiveVpTitle', 'actions'];
  dataSource: MatTableDataSource<CountriesModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CountriesModel>(this.countries);
    this.getInterfaces();
    this.getCountries();
  }
  getInterfaces():void{
    this.subs.sink = this.dataService2.getAllRegions(this.user.id).subscribe({
      next: data => {
       this.regions = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
    this.subs.sink = this.dataService.getCluster(this.user.id).subscribe({
      next: data => {
       this.cluster = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
    this.subs.sink = this.dataService.getUsers(this.user.id, -1, -1).subscribe({
      next: data => {
       this.users = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getCountries(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getCountries(this.user.id).subscribe({
      next: data => {
        this.countries = [...data];
        this.dataSource.data = [...this.countries];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  deleteCountry(country:CountriesModel) {
    const dialogRef = this.dialog.open(DeleteCountryFormComponent, {
      data: {
        country: country
      }
    });
    dialogRef.afterClosed().subscribe((result: CountriesModel) => {
      if (result) {
        this.subs.sink = this.dataService.deleteCountry(this.user.id, result).subscribe({
          next: data => {
            this.getCountries();
            this.showNotification('snackbar-success', result.countryTitle + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  addCountry() {
    const dialogRef = this.dialog.open(AddCountryFormComponent, {
      width: '750px',
      data: {
        region: [...this.regions],
        users:this.users,
        cluster:this.cluster,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:CountryApiData) => {
      if (result) {
        this.subs.sink = this.dataService.saveCountry(this.user.id, result).subscribe({
          next:data=>{     
            this.getCountries();  
            this.showNotification('snackbar-success', result.country.countryTitle+' has been added sucessfully', 'bottom', 'center');
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  viewCountry(country: CountriesModel) {
    this.subs.sink = this.dataService.getSelectedData(this.user.id, country.countryId).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(AddCountryFormComponent, {
          width: '750px',
          data: {
            region: [...this.regions],
            country: country,
            cluster:this.cluster,
            users: this.users,
            selectedData: [...data],
            action: "view",
          },
        });
      },
      error: err => {
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  updateCountry(country: CountriesModel) {
    this.subs.sink = this.dataService.getSelectedData(this.user.id, country.countryId).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(AddCountryFormComponent, {
          width: '750px',
          data: {
            region: [...this.regions],
            country: country,
            cluster:this.cluster,
            users: this.users,
            selectedData: [...data],
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result: CountryApiData) => {
          if (result) {
            this.subs.sink = this.dataService.saveCountry(this.user.id,result).subscribe({
              next: data => {
                this.getCountries();
                this.showNotification('snackbar-success', result.country.countryTitle + ' has been added sucessfully', 'bottom', 'center');
              },
              error: err => {
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        });
      },
      error: err => {
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }

  //Common fns
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
