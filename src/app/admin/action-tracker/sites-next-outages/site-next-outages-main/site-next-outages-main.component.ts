import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { NextOutages, SiteNextOutage } from './site-next-outages.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { SitesNextOutagesService } from './sites-next-outages.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddNextOuatgeComponent } from './dialog/add-next-ouatge/add-next-ouatge.component';
import { DeleteNextOutagesComponent } from './dialog/delete-next-outages/delete-next-outages.component';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { OT_IEquipments } from 'src/app/admin/outage-tracker/next-outages/site-next-outages.model';

@Component({
  selector: 'app-site-next-outages-main',
  templateUrl: './site-next-outages-main.component.html',
  styleUrls: ['./site-next-outages-main.component.sass']
})
export class SiteNextOutagesMainComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  //Varaibles 
  sites: CSites[];
  nextOutages: NextOutages[];
  siteNextOutages: SiteNextOutage[];
  equipments:OT_IEquipments[]
  //common variables
  isTableLoading: boolean;
  errorMessage: string;

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: SitesNextOutagesService, private dataService2:CommonService,public dialog: MatDialog,) { super() }

  displayedColumns: string[] = ['id', 'siteTitle', 'unit','outageTitle', 'outageLevel', 'nextOutageDate', 'actions'];
  dataSource: MatTableDataSource<SiteNextOutage>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SiteNextOutage>(this.siteNextOutages);
    this.getInterface();
    this.getSiteNextOutages();
    this.getEquipments(-1);
  }
  getEquipments(siteId:number){
    this.subs.sink = this.dataService.getEquipments(siteId).subscribe({
      next: data => {
        this.equipments = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getInterface(): void {
    this.subs.sink = this.dataService2.getSites(this.user.id,-1,-1).subscribe({
      next: data => {
        this.sites = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
    this.subs.sink = this.dataService.getInterface(this.user.id).subscribe({
      next: data => {
        this.nextOutages = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getSiteNextOutages(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getSitesNextOutages(this.user.id).subscribe({
      next: data => {
        this.siteNextOutages = [...data];
        this.dataSource.data = [...this.siteNextOutages];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  viewSiteNextOutages(siteNextOutage: SiteNextOutage) {
    const dialogRef = this.dialog.open(AddNextOuatgeComponent, {
      width: '600px',
      data: {
        siteNextOutage: siteNextOutage,
        nextOutages: this.nextOutages,
        sites:this.sites,
        equipments:this.equipments,
        action: "view",
      },
    });

  }
  deleteSiteNextOutages(siteNextOutage: SiteNextOutage) {
    const dialogRef = this.dialog.open(DeleteNextOutagesComponent, {
      width: '300px',
      data: {
        siteNextOutage: siteNextOutage,
      }
    });
    dialogRef.afterClosed().subscribe((result: SiteNextOutage) => {
      if (result) {
        this.subs.sink = this.dataService.deleteSiteNextOutages(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', 'Site save Outage for ' + result.siteTitle + ' has been Deleted!!', 'bottom', 'center');
            this.getSiteNextOutages();
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  updateSiteNextOutages(siteNextOutage: SiteNextOutage) {
    const dialogRef = this.dialog.open(AddNextOuatgeComponent, {
      width: '600px',
      data: {
        siteNextOutage: siteNextOutage,
        nextOutages: this.nextOutages,
        sites:this.sites,
        equipments:this.equipments,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result: SiteNextOutage) => {
      if (result) {
        this.subs.sink = this.dataService.saveSiteNextOutages(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', 'Site save Outage for ' + result.siteTitle + ' has been updated!!', 'bottom', 'center');
            this.getSiteNextOutages();
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });

  }
  addSiteNextOutages() {
    const dialogRef = this.dialog.open(AddNextOuatgeComponent, {
      width: '600px',
      data: {
        siteNextOutage: "",
        nextOutages: this.nextOutages,
        sites:this.sites,
        equipments:this.equipments,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result: SiteNextOutage) => {
      if (result) {
        this.subs.sink = this.dataService.saveSiteNextOutages(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', 'Site save Outage for ' + result.siteTitle + ' has been saved!!', 'bottom', 'center');
            this.getSiteNextOutages();
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  //Common Fns
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
