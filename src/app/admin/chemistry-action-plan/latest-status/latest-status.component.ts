import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LatestStatusService } from './latest-status.service';
import { User } from 'src/app/core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CAPObservation, CAPSites, CAPStatus } from '../observation/observation.model';
import { CAPLatestStatus, CAPModel, CAPStatusll } from './latest-status.model';
import { DeleteLatestStatusComponent } from './dialog/delete-latest-status/delete-latest-status.component';
import { AddLatestStatusComponent } from './dialog/add-latest-status/add-latest-status.component';

@Component({
  selector: 'app-latest-status',
  templateUrl: './latest-status.component.html',
  styleUrls: ['./latest-status.component.sass']
})
export class LatestStatusComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Common Variables
  isTableLoading: boolean;
  errorMessage: string;

  //Variables
  latestStatus: CAPLatestStatus[];
  models: CAPModel[];
  status: CAPStatusll[];
  sites: CAPSites[];
  constructor(private dataService: LatestStatusService, private snackBar: MatSnackBar, private dialog: MatDialog, private router:Router) {
    super()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CAPLatestStatus>(this.latestStatus);
    this.getStatus();
  }

  displayedColumns: string[] = ['id', 'siteTitle', 'modelStatus', 'liveApplication', 'status','score','remarks','actions'];
  dataSource: MatTableDataSource<CAPLatestStatus>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  //Common Functions
  getStatus() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getObservations(this.user.id).subscribe({
      next: data => {
        this.latestStatus = [...data.latestStatus];
        this.models = [...data.model];
        this.status = [...data.status];
        this.sites = [...data.site];
        this.dataSource.data = [...this.latestStatus];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  addStatus(){
    const dialogRef = this.dialog.open(AddLatestStatusComponent, {
      width: '720px',
      data: {
        latestStatus: "",
        action: "add",
        models: [...this.models],
        status: [...this.status],
        sites:[...this.sites],
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPLatestStatus) => {
      if (result) {
        this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
          next: data => {
            this.latestStatus = [...data];
            this.dataSource.data = [...this.latestStatus];
            this.showNotification('snackbar-success', "New Status has been sucessfully added" + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  editStatus(row:CAPLatestStatus){
    const dialogRef = this.dialog.open(AddLatestStatusComponent, {
      width: '720px',
      data: {
        latestStatus: row,
        action: "edit",
        models: [...this.models],
        status: [...this.status],
        sites:[...this.sites],
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPLatestStatus) => {
      if (result) {
        this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
          next: data => {
            this.latestStatus = [...data];
            this.dataSource.data = [...this.latestStatus];
            this.showNotification('snackbar-success', "Selected observation" + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  deleteStatus(row:CAPLatestStatus){
    const dialogRef = this.dialog.open(DeleteLatestStatusComponent, {
      width: '400px',
      data: {
        latestStatus: row,
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPLatestStatus) => {
      if (result) {
        this.subs.sink = this.dataService.deleteObservation(result, this.user.id).subscribe({
          next: data => {
            let index = this.latestStatus.findIndex(a => a.updateId == data.updateId);
            this.latestStatus.splice(index, 1);
            this.dataSource.data = [...this.latestStatus];
            this.showNotification('snackbar-success', "Selected observation" + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
