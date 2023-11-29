import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { clusterAPIModel, clusterModel } from './cluster.model';
import { User } from 'src/app/core/models/user';
import { CRegions, CUsers } from 'src/app/shared/common-interface/common-interface';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CountriesModel } from '../../countries/add-countries/add-country.model';
import { AddCountryFormComponent } from '../../countries/add-countries/dialogs/add-country-form/add-country-form.component';
import { DeleteCountryFormComponent } from '../../countries/add-countries/dialogs/delete-country-form/delete-country-form.component';
import { ClusterMainService } from './cluster-main.service';
import { DeleteClusterComponent } from './dialogs/delete-cluster/delete-cluster.component';
import { AddClusterComponent } from './dialogs/add-cluster/add-cluster.component';

@Component({
  selector: 'app-cluster-main',
  templateUrl: './cluster-main.component.html',
  styleUrls: ['./cluster-main.component.sass']
})
export class ClusterMainComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Common Variables
  errorMessage:string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Varaibles
  clusters: clusterModel[];
  regions:CRegions[];
  users:CUsers[];
  constructor(private snackBar: MatSnackBar, private dataService: ClusterMainService,private dataService2: CommonService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'regionTitle', 'clusterTitle', 'clusterCode', 'executiveDirectorTitle', 'executiveVpTitle', 'actions'];
  dataSource: MatTableDataSource<clusterModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<clusterModel>(this.clusters);
    this.getInterfaces();
    this.getCluster();
  }
  getInterfaces():void{
    this.subs.sink = this.dataService2.getAllRegions(this.user.id).subscribe({
      next: data => {
       this.regions = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
    this.subs.sink = this.dataService2.getUsers(this.user.id, -1, -1).subscribe({
      next: data => {
       this.users = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getCluster(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getCountries(this.user.id).subscribe({
      next: data => {
        this.clusters = [...data];
        this.dataSource.data = [...this.clusters];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  deleteCluster(cluster:clusterModel) {
    const dialogRef = this.dialog.open(DeleteClusterComponent, {
      data: {
        cluster: cluster
      }
    });
    dialogRef.afterClosed().subscribe((result: clusterModel) => {
      if (result) {
        this.subs.sink = this.dataService.deletecluster(this.user.id, result).subscribe({
          next: data => {
            this.getCluster();
            this.showNotification('snackbar-success', result.clusterTitle + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  addCluster() {
    const dialogRef = this.dialog.open(AddClusterComponent, {
      width: '750px',
      data: {
        region: [...this.regions],
        users:this.users,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:clusterAPIModel) => {
      debugger;
      if (result) {
        this.subs.sink = this.dataService.savecluster(this.user.id, result).subscribe({
          next:data=>{     
            this.getCluster();  
            this.showNotification('snackbar-success', result.clusterTitle+' has been added sucessfully', 'bottom', 'center');
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  viewCluster(cluster: clusterModel) {
    this.subs.sink = this.dataService.getClusterInfo(this.user.id, cluster).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(AddClusterComponent, {
          width: '750px',
          data: {
            region: [...this.regions],
            cluster: cluster,
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
  updateCluster(cluster: clusterModel) {
    this.subs.sink = this.dataService.getClusterInfo(this.user.id, cluster).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(AddClusterComponent, {
          width: '750px',
          data: {
            region: [...this.regions],
            cluster: cluster,
            users: this.users,
            selectedData: [...data],
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result: clusterAPIModel) => {
          debugger;
          if (result) {
            this.subs.sink = this.dataService.savecluster(this.user.id,result).subscribe({
              next: data => {
                this.getCluster();
                this.showNotification('snackbar-success', result.clusterTitle + ' has been added sucessfully', 'bottom', 'center');
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
