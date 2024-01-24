import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Regions } from '../../action-tracker/regions/region-main/region.model';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { APISaveData, OT_OutageStatus, OT_OutageTrackerFilter, OT_outageTracker } from './track-outages.model';
import { TrackOutagesService } from './track-outages.service';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { TrackOutagesForm2Component } from './dialogs/track-outages-form2/track-outages-form2.component';

@Component({
  selector: 'app-track-outages',
  templateUrl: './track-outages.component.html',
  styleUrls: ['./track-outages.component.sass']
})
export class TrackOutagesComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Common Variables
  errorMessage: string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  nameToRemove:any[]=[	"admin", "n.maheta"];
  //Varaibles
  sites: CSites[];
  status: OT_OutageStatus[];
  phaseNumber: any[];
  outages: any[];
  actions: OT_outageTracker[];
  filterObj: OT_OutageTrackerFilter = {
    phaseNumber: -1,
    siteId: -1,
    outageId: -1,
    status: -1
  }
  displayFilter: Boolean = false;

  constructor(private snackBar: MatSnackBar, private dataService: TrackOutagesService, private dataService2: CommonService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'siteTitle', 'unit', 'phaseNumber', 'phaseTitle', 'phaseReadDesc', 'outageTitle', 'nextOutageDate', 'statusTitle','name', 'actions'];
  dataSource: MatTableDataSource<OT_outageTracker>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<OT_outageTracker>(this.actions);
    this.getActions();
    this.getInterfaces();
    this.getSites();
  }
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  getSites(): void {
    this.subs.sink = this.dataService2.getUpdatedSites(this.user.id, -1, -1,-1).subscribe({
      next: data => {
        this.sites = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getInterfaces(): void {
    this.subs.sink = this.dataService.getInterface(this.user.id).subscribe({
      next: data => {
        this.phaseNumber = [...data.phaseNumber];
        this.outages = [...data.outage];
        this.status = [...data.status];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getActions(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActions(this.user.id, this.filterObj).subscribe({
      next: data => {
        this.actions = [...data];
        this.dataSource.data = [...this.actions];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  viewAction(action: OT_outageTracker) {
    const dialogRef = this.dialog.open(TrackOutagesForm2Component, {
      width: '750px',
      data: {
        action: "view",
        outageAction: action
      },
    });
    dialogRef.afterClosed().subscribe((result: Regions) => {

    });
  }
  // downloadReport(action: OT_outageTracker) {
  //   this.subs.sink = this.dataService.downloadReport(action.potId).subscribe({
  //     next: data => {
  //       if (data.body.size < 100) {
  //         this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
  //       }
  //       else {
  //         const url = window.URL.createObjectURL(data.body);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = `${action.fileName}`;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       }

  //     },
  //     error: err => {
  //       this.showNotification('black', err, 'bottom', 'center');
  //     }
  //   })
  // }
  updateAction(action: OT_outageTracker) {
    this.subs.sink = this.dataService.getOTData(this.user.id, action).subscribe({
      next: dataOT => {
        const dialogRef = this.dialog.open(TrackOutagesForm2Component, {
          width: '750px',
          data: {
            action: "edit",
            outageAction: action,
            dataOt: dataOT
          },
        });
        dialogRef.afterClosed().subscribe((result: APISaveData) => {
          if (result) {
            this.subs.sink = this.dataService.saveAction(this.user.id, result).subscribe({
              next:data=>{
                this.getActions()
                this.showNotification('snackbar-success', result.outageTracker.phaseTitle + ' has been added sucessfully', 'bottom', 'center');
              },
              error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
            })           
          }
        });
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
}
