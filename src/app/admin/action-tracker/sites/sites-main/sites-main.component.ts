import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { SitesFormComponent } from './dialogs/sites-form/sites-form.component';
import { SPStatus, SRegion, SSaveData, SitesI } from './sites.model';
import { SitesService } from './sites.service';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CCluster, CCountry, CRegions, CTechnology, CUsers } from 'src/app/shared/common-interface/common-interface';
import { ColumnFilterComponent } from './dialogs/column-filter/column-filter.component';

@Component({
  selector: 'app-sites-main',
  templateUrl: './sites-main.component.html',
  styleUrls: ['./sites-main.component.sass']
})
export class SitesMainComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  sites: SitesI[];
  siteRegions: CRegions[];
  siteCountry: CCountry[];
  siteTechnology: CTechnology[];
  countryListObj: any[] = [];
  technologyListObj: any[] = [];
  siteProjectStatus: SPStatus[];
  isTableLoading: boolean;
  selectedTechnologyList: CTechnology[];
  users: CUsers[];
  cluster: CCluster[];
  regionListObj: any[] = [];
  clusterListObj: any[] = [];
  addColumns() {
    const dialogRef = this.dialog.open(ColumnFilterComponent, {
      width: '750px',
      data: {
        column: this.displayedColumns,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.displayedColumns = [...result];
    });
  }
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  errorMessage: string;
  constructor(private dataService: SitesService, private dataService2: CommonService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    super()
  }
  displayedColumns: string[] = ['id', 'region', 'country', 'siteName', 'projectStatus', 'insurancePOC', 'tilPOC', 'actions'];
  dataSource: MatTableDataSource<SitesI>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SitesI>(this.sites);
    this.getSites();
    this.getInterfaces();
    this.getCluster();
  }
  getCluster(): void {
    this.subs.sink = this.dataService2.getClusters(this.user.id, -1, -1).subscribe({
      next: data => {
        this.cluster = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getInterfaces(): void {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.siteProjectStatus = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
    this.subs.sink = this.dataService2.getAllCountry(this.user.id, -1, -1).subscribe({
      next: data => {
        this.siteCountry = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
    this.subs.sink = this.dataService2.getAllRegions(this.user.id).subscribe({
      next: data => {
        this.siteRegions = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
    this.subs.sink = this.dataService2.getUsers(this.user.id, -1, -1).subscribe({
      next: data => {
        this.users = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
    this.subs.sink = this.dataService2.getTechnology(this.user.id, -1, -1).subscribe({
      next: data => {
        this.siteTechnology = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  countryList(country: CCountry) {
    let index = this.countryListObj.indexOf(country.countryId);
    if (index == -1) {
      this.countryListObj.push(country.countryId);
    }
    else {
      this.countryListObj.splice(index, 1);
    }
  }
  technologyList(technology: CTechnology) {
    let index = this.technologyListObj.indexOf(technology.technologyId);
    if (index == -1) {
      this.technologyListObj.push(technology.technologyId);
    }
    else {
      this.technologyListObj.splice(index, 1);
    }
  }
  regionList(region: SRegion) {
    let index = this.regionListObj.indexOf(region.regionId);
    if (index == -1) {
      this.regionListObj.push(region.regionId);
    }
    else {
      this.regionListObj.splice(index, 1);
    }
  }
  clusterList(cluster: CCluster) {
    let index = this.clusterListObj.indexOf(cluster.clusterId);
    if (index == -1) {
      this.clusterListObj.push(cluster.clusterId);
    }
    else {
      this.clusterListObj.splice(index, 1);
    }
  }
  getSites(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getSites(this.user.id, this.regionListObj.toString(), this.countryListObj.toString(), this.technologyListObj.toString(), this.clusterListObj.toString()).subscribe({
      next: data => {
        this.sites = [...data];
        this.dataSource.data = [...this.sites];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
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
  viewSite(sites: SitesI): void {
    this.subs.sink = this.dataService.getEditData(sites, this.user.id).subscribe({
      next: data => {

        const dialogRef = this.dialog.open(SitesFormComponent, {
          width: '720px',
          data: {
            site: sites,
            action: "view",
            siteRegions: [...this.siteRegions],
            cluster: this.cluster,
            siteCountry: [...this.siteCountry],
            siteTechnology: [...this.siteTechnology],
            siteProjectStatus: [...this.siteProjectStatus],
            selectedTechnology: [...data],
            users: [...this.users]
          },
        });
      },
      error: err => {
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  deleteSite(site: SitesI): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        sites: site
      }
    });
    dialogRef.afterClosed().subscribe((result: SitesI) => {
      if (result) {

        this.subs.sink = this.dataService.deleteSite(result).subscribe({
          next: data => {
            this.getSites();
            this.showNotification('snackbar-success', result.siteName + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  updateSite(sites: SitesI): void {
    this.subs.sink = this.dataService.getEditData(sites, this.user.id).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(SitesFormComponent, {
          width: '720px',
          data: {
            site: sites,
            action: "edit",
            siteRegions: [...this.siteRegions],
            cluster: this.cluster,
            siteCountry: [...this.siteCountry],
            siteTechnology: [...this.siteTechnology],
            siteProjectStatus: [...this.siteProjectStatus],
            selectedTechnology: [...data],
            users: [...this.users]
          },
        });
        dialogRef.afterClosed().subscribe((result: SSaveData) => {

          if (result) {
            this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
              next: data => {

                if (result.sites.insurenceReport instanceof File || result.sites.tilsReport instanceof File) {
                  this.subs.sink = this.dataService.uploadPDF(data, result, this.user.id).subscribe({
                    next: data => {

                    },
                    error: err => {
                      this.errorMessage = err;
                      this.showNotification('black', err, 'bottom', 'center');
                    }
                  })
                }
                this.getSites();
                this.showNotification('snackbar-success', result.sites.siteName + ' has been added sucessfully', 'bottom', 'center');
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
  addSite(): void {
    const dialogRef = this.dialog.open(SitesFormComponent, {
      width: '720px',
      data: {
        site: "",
        action: "add",
        siteRegions: [...this.siteRegions],
        siteCountry: [...this.siteCountry],
        siteTechnology: [...this.siteTechnology],
        siteProjectStatus: [...this.siteProjectStatus],
        cluster: this.cluster,

        users: [...this.users]
      },
    });
    dialogRef.afterClosed().subscribe((result: SSaveData) => {
      if (result) {
        this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
          next: data => {
            this.subs.sink = this.dataService.uploadPDF(data, result, this.user.id).subscribe({
              next: data => { },
              error: err => {
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
            this.getSites();
            this.showNotification('snackbar-success', data.siteName + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
}
