import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ViewInsurenceComponent } from '../add-insurence/dialog/view-insurence/view-insurence.component';
import { IRPriority, InsurenceRecommendation } from '../add-insurence/insurence.model';
import { ConfirmDeleteComponentAT } from './dialogs/confirm-delete/confirm-delete.component';
import { InsurenceTrackerFormComponent } from './dialogs/insurence-tracker-form/insurence-tracker-form.component';
import { ViewActionComponent } from './dialogs/view-action/view-action.component';
import { IATAPIData, InsurenceTracker, ITCompany, ITFilterObj, ITRecommendation, ITSource, ITStatus, ITUser } from './insurence-tracker.model';
import { InsurenceTrackerService } from './insurence-tracker.service';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CCluster, CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-insurence-tracker',
  templateUrl: './insurence-tracker.component.html',
  styleUrls: ['./insurence-tracker.component.sass']
})
export class InsurenceTrackerComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  filterObj: ITFilterObj = {
    startData: null,
    endDate: null,
    regionId: -1,
    siteId: -1,
    department: -1,
    source: -1
  }
  
  cluster:CCluster[];

  clusterFilterList:any[]=[];
  selectedSites: CSites[];
  displayFilter: Boolean = false;
  recInsurence: InsurenceRecommendation[];
  apiObj: IATAPIData;
  selectUsers: ITUser[];
  actionTracker: InsurenceTracker;
  actionTrackers: InsurenceTracker[];
  isTableLoading: boolean;
  sites: CSites[];
  priority: IRPriority[];

  regions: CRegions[];
  recommendations: ITRecommendation[];
  sources: ITSource[];
  companies: ITCompany[];
  statuss: ITStatus[];
  users: CUsers[];

  //Filter Lists
  regionsFilterList: any[] = [];
  sitesFilterList: any[] = [];
  sourceFilterList: any[] = [];
  departmentFilterList: any[] = [];
  priorityFilterList: any[] = [];

  errorMessage: string;
  constructor(private snackBar: MatSnackBar, private dataService: InsurenceTrackerService, private dataService2: CommonService, public dialog: MatDialog,) {
    super();
  }
  displayedColumns: string[] = ['id', 'regionTitle', 'siteTitle','cluster', 'recommendationReference', 'action', 'priorityTitle','actions'];
  dataSource: MatTableDataSource<InsurenceTracker>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<InsurenceTracker>(this.actionTrackers);
    this.getActionTracker();
    this.getInterfaces();
    this.getSites(-1);
    this.getRegions();
    this.getUsers();
    this.getClusters();

  }
  getClusters(){
    this.subs.sink = this.dataService2.getClusters(this.user.id,-1,-1 ).subscribe({
      next: data => {
        this.cluster = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  //Get Requests
  getUsers() {
    this.subs.sink = this.dataService2.getUsers(this.user.id, -1, -1).subscribe({
      next: data => { this.users = [...data] },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getRegions() {
    this.subs.sink = this.dataService2.getUpdatedRegions(this.user.id, -1, -1).subscribe({
      next: data => { this.regions = [...data] },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getSites(regionId: number) {
    this.subs.sink = this.dataService2.getSites(this.user.id, regionId, -1).subscribe({
      next: data => {
        if (regionId == -1) {
          this.sites = [...data];

        }
        this.selectedSites = [...data]
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  
  getInterfaces() {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {

        this.recommendations = [...data.recommendation];
        this.sources = [...data.iatSource];
        this.companies = [...data.iatCompany];
        this.statuss = [...data.iatStatus];
        this.priority = [...data.priority];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getActionTracker() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionTrackerList(this.user.id, this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.sourceFilterList.toString(), this.departmentFilterList.toString(), this.priorityFilterList.toString(), this.clusterFilterList.toString()).subscribe({
      next: data => {
        this.actionTrackers = [...data.tracker];
        this.dataSource.data = [...this.actionTrackers];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  //View Insurance
  viewInsurence(track: InsurenceTracker) {
    this.subs.sink = this.dataService.getInsuranceRecommendation(this.user.id, track.recommendationId).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(ViewInsurenceComponent, {
          width: '750px',
          data: {
            recommend: data,
          },
        });
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })

  }
  //Cruds
  addInsurenceTracker() {
    const dialogRef = this.dialog.open(InsurenceTrackerFormComponent, {
      width: '750px',
      data: {
        tracker: "",
        sites: this.sites,
        regions: this.regions,
        recommendations: this.recommendations,
        sources: this.sources,
        companies: this.companies,
        statuss: this.statuss,
        users: this.users,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
      if (result) {
        this.subs.sink = this.dataService.saveActionTracker(result, this.user.id).subscribe({
          next: data => {

            this.showNotification('snackbar-success', result.action + ' has been added sucessfully', 'bottom', 'center');
            this.getActionTracker()
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification("err", err, "bottom", "center")
          }
        })
      }
    })
  }
  updateInsurenceTracker(track: InsurenceTracker) {
    const dialogRef = this.dialog.open(InsurenceTrackerFormComponent, {
      width: '750px',

      data: {
        tracker: track,
        sites: this.sites,
        regions: this.regions,
        recommendations: this.recommendations,
        sources: this.sources,
        companies: this.companies,
        statuss: this.statuss,
        users: this.users,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
      if (result) {
        this.subs.sink = this.dataService.saveActionTracker(result, this.user.id).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.action + ' has been added sucessfully', 'bottom', 'center');
            this.getActionTracker()
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification("err", err, "bottom", "center")
          }
        })
      }
    })
  }
  viewAction(track: InsurenceTracker) {
    const dialogRef = this.dialog.open(ViewActionComponent, {
      width: '750px',
      data: {
        tracker: track,
      },
    });
  }



  deleteInsurenceTracker(track: InsurenceTracker) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponentAT, {
      data: {
        tracker: track,
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
      if (result) {
        this.subs.sink = this.dataService.delActionTracker(result, this.user.id).subscribe({
          next: data => {

            this.showNotification('snackbar-success', result.action + ' has been added sucessfully', 'bottom', 'center');
            this.getActionTracker()
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification("err", err, "bottom", "center")
          }
        })
      }
    })
  }
  //Common
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

  //Filter
  regionListFn(region: CRegions) {
    let index = this.regionsFilterList.indexOf(region.regionId);
    if (index == -1) {
      this.regionsFilterList.push(region.regionId);
    }
    else {
      this.regionsFilterList.splice(index, 1);
    }
  }
  siteListFn(site: CSites) {
    let index = this.sitesFilterList.indexOf(site.siteId);
    if (index == -1) {
      this.sitesFilterList.push(site.siteId);
    }
    else {
      this.sitesFilterList.splice(index, 1);
    }
  }
  sourceListFn(source: ITSource) {
    let index = this.sourceFilterList.indexOf(source.sourceId);
    if (index == -1) {
      this.sourceFilterList.push(source.sourceId);
    }
    else {
      this.sourceFilterList.splice(index, 1);
    }
  }
  departmentListFn(dept: ITCompany) {
    let index = this.departmentFilterList.indexOf(dept.companyId);
    if (index == -1) {
      this.departmentFilterList.push(dept.companyId);
    }
    else {
      this.departmentFilterList.splice(index, 1);
    }
  }
  priorityListFn(status: IRPriority) {
    let index = this.priorityFilterList.indexOf(status.priorityId);
    if (index == -1) {
      this.priorityFilterList.push(status.priorityId);
    }
    else {
      this.priorityFilterList.splice(index, 1);
    }
  }
  clusterListFn(cluster: CCluster) {
    let index = this.clusterFilterList.indexOf(cluster.clusterId);
    if (index == -1) {
      this.clusterFilterList.push(cluster.clusterId);
    }
    else {
      this.clusterFilterList.splice(index, 1);
    }
  }
  filterFn() {
    this.getActionTracker();
  }
  clearFn() {
    this.regionsFilterList.length = 0;
    this.clusterFilterList.length = 0;
    this.sitesFilterList.length = 0;
    this.sourceFilterList.length = 0;
    this.departmentFilterList.length = 0;
    this.priorityFilterList.length = 0;

    this.regions.map(a => a.isSelected = false)
    this.sites.map(a => a.isSelected = false)
    this.companies.map(a => a.isSelected = false)
    this.sources.map(a => a.isSelected = false)
    this.priority.map(a=>a.isSelected = false)
    this.cluster.map(a=>a.isSelected = false)

  }
}
