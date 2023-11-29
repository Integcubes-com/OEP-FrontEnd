import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ObervationService } from './obervation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { CAPAction, CAPDept, CAPObs, CAPObservation, CAPPriority, CAPRegion, CAPSites, CAPStatus, CAPUsers } from './observation.model';
import { ObservationFormComponent } from './dialogs/observation-form/observation-form.component';
import { DeleteObservationComponent } from './dialogs/delete-observation/delete-observation.component';
import { Route, Router } from '@angular/router';
import { CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { ActionFormComponent } from './observation-action/dialogs/action-form/action-form.component';
import { DeleteActionComponent } from './observation-action/dialogs/delete-action/delete-action.component';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.sass']
})
export class ObservationComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Common Variables
  isTableLoading: boolean;
  actions:CAPAction;
  observation:CAPObs;
  errorMessage: string;
  site:CSites[];
  region:CRegions[];
  depts: CAPDept[];
  prioritys: CAPPriority[];
  statuss: CAPStatus[];
  users: CAPUsers[];
  //Component Variables
  observations: CAPObservation[];
  sites: CAPSites[];
  regions: CAPRegion[];
  displayAllSites = false;
  displayAllRegions = false;
  siteListObj: any[] = [];
  regionListObj:any[] = [];
  constructor(private dataService: ObervationService, private snackBar: MatSnackBar, private dialog: MatDialog, private router:Router) {
    super()
  }

  siteList(site:CAPSites){

    let index = this.siteListObj.indexOf(site.siteId);
    if (index==-1) {
      this.siteListObj.push(site.siteId);
    }
   else{
    this.siteListObj.splice(index, 1);
   }
  }
  filterFn(){
    this.subs.sink = this.dataService.getObservations(this.user.id,this.regionListObj.toString(), this.siteListObj.toString()).subscribe({
      next: data => {
        this.observations = [...data.observation];
        this.dataSource.data = [...this.observations]
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  regionList(region:CAPRegion){

    let index = this.regionListObj.indexOf(region.regionId);
    if (index==-1) {
      this.regionListObj.push(region.regionId);
    }
   else{
    this.regionListObj.splice(index, 1);
   }
  }
  toggleRegions(){
    this.displayAllRegions=!this.displayAllRegions;
  }
  toggleSites(){
    this.displayAllSites = ! this.displayAllSites
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CAPObservation>(this.observations);
    this.getObservations();
  }
  icon: boolean = false;

  click(){
      this.icon = !this.icon;
    }
  displayedColumns: string[] = ['id',  'plantTitle', 'observationTitle', 'actionTitle','actions'];
  dataSource: MatTableDataSource<CAPObservation>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  panelOpenState = true;
  getObservations() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getObservations(this.user.id, "", "").subscribe({
      next: data => {
        this.depts = [...data.dept];
        this.prioritys = [...data.priority];
        this.statuss = [...data.status];
        this.users = [...data.appUser];
        this.sites = [...data.sites];
        this.regions = [...data.regions];
        this.observations = [...data.observation];
        this.dataSource.data = [...this.observations];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }


  // CRUDS
  addObservation() {
    const dialogRef = this.dialog.open(ObservationFormComponent, {
      width: '720px',
      data: {
        observation: "",
        depts: this.depts,
        prioritys: this.prioritys,
        statuss: this.statuss,
        users: this.users,
        action: "add",
        sites: [...this.sites],
        regions: [...this.regions],
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPObservation) => {
      if (result) {
        debugger;
        this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
          next: data => {
            this.observations.unshift({ ...data });
            this.dataSource.data = [...this.observations];
            this.showNotification('snackbar-success', "New Observation has been sucessfully added" + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }

  deleteObservation(obs: CAPObservation) {
    const dialogRef = this.dialog.open(DeleteObservationComponent, {
      width: '400px',
      data: {
        observation: obs,
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPObservation) => {
      if (result) {
        debugger;
        this.subs.sink = this.dataService.deleteObservation(result, this.user.id).subscribe({
          next: data => {
            let index = this.observations.findIndex(a => a.observationId === result.observationId);
            this.observations.splice(index, 1);
            this.dataSource.data = [...this.observations];
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
  editObservation(obs: CAPObservation) {
    const dialogRef = this.dialog.open(ObservationFormComponent, {
      width: '720px',
      data: {
        observation: obs,
        depts: this.depts,
        prioritys: this.prioritys,
        statuss: this.statuss,
        users: this.users,
        action: "edit",
        sites: [...this.sites],
        regions: [...this.regions],
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPObservation) => {
      if (result) {
        this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
          next: data => {
            let index = this.observations.findIndex(a => a.observationId === result.observationId);
            this.observations[index] = { ...data };
            this.dataSource.data = [...this.observations];
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

  //Common Functions
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
