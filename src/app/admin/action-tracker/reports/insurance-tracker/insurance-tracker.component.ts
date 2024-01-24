import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EUIFilterObj } from '../../end-user/end-user-insurence/end-user-insurance.model';
import { EndUserInsuranceService } from '../../end-user/end-user-insurence/end-user-insurance.service';
import { IRPriority, IRRegion, InsurenceRecommendation } from '../../insurence/add-insurence/insurence.model';
import { IATAPIData, InsurenceTracker, ITRegions, ITRecommendation, ITSource, ITCompany, ITStatus, ITUser, ITDayStatus, ITEvidence } from '../../insurence/insurence-tracker/insurence-tracker.model';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CCluster, CSites } from 'src/app/shared/common-interface/common-interface';
import { FileUploadDialogComponent } from '../../file-upload-dialog/file-upload-dialog.component';
import { TableColmComponent } from '../../end-user/end-user-insurence/dialog/table-colm/table-colm.component';

@Component({
  selector: 'app-insurance-tracker',
  templateUrl: './insurance-tracker.component.html',
  styleUrls: ['./insurance-tracker.component.sass']
})
export class  InsuranceTrackerComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit{
  // InsuranceTrackerComponent 
  filterObj: EUIFilterObj = {
    startDate: null,
    endDate: null,
    sourceId: -1,
    departmentId: -1,
    statusId: -1,
    daysToTarget: '',
    regionId: -1,
    siteId: -1
  }
  displayFilter: Boolean = false;
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  cluster:CCluster[];

  clusterFilterList:any[]=[];
  recInsurence: InsurenceRecommendation[];
  apiObj: IATAPIData;
  actionTracker: InsurenceTracker;
  actionTrackers: InsurenceTracker[];
  isTableLoading: boolean;
  regions: ITRegions[];
  recommendations: ITRecommendation[];
  selectedSites:CSites[];
  priority: IRPriority[];

  sources: ITSource[];
  companies: ITCompany[];
  statuss: ITStatus[];
  users: ITUser[];
  sites: CSites[];
  dayStatuss: ITDayStatus[];
  evidenceStatuss:  ITEvidence[];
  errorMessage: string;
  //Get data from browsers Local Storage

  //filter opts
  daysToTargetList = [
    { title: 'Closed', isSelected: false },
    { title: 'OverDue', isSelected: false },
    { title: 'Less than a week', isSelected: false },
    { title: 'Less than a Month', isSelected: false },
    { title: 'Less than 6 Month', isSelected: false },
    { title: 'Greate than 6 Month', isSelected: false },
    { title: 'Greate than 6 Month', isSelected: false },
    { title: 'NotDue', isSelected: false },
  ]
  //  'OverDue', 'Less than a week', 'Less than a Month', 'Less than 6 Month', 'Greate than 6 Month', 'Greate than 6 Month', 'NotDue']
  //Filter Lists
  regionsFilterList:any[]=[];
  sitesFilterList:any[]=[];
  sourceFilterList:any[]=[];
  statusFilterList:any[]=[];
  companyFilterList:any[]=[];
  daysToTargetFilterList:any[]=[];
  priorityFilterList: any[] = [];

  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: EndUserInsuranceService, private dataService2:CommonService,public dialog: MatDialog,) {
    super();
  }
  displayedColumns: string[] = ['id','regionTitle','siteTitle','statusTitle','recommendationReference', 'action', 'targetDate', 'daysToTarget',  'report'];
  dataSource: MatTableDataSource<InsurenceTracker>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<InsurenceTracker>(this.actionTrackers);
    this.getActionTracker();
    this. getUsers();
    this.getRegions();
    this.getSites(-1);
    this.getInterfaces();
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
  getUsers(){
    this.subs.sink = this.dataService2.getUsers(this.user.id,-1,-1).subscribe({
      next:data=>{this.users = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }

  getRegions(){
    this.subs.sink = this.dataService2.getUpdatedRegions(this.user.id,-1,-1).subscribe({
      next:data=>{this.regions = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  addColumns(){
    const dialogRef = this.dialog.open(TableColmComponent, {
      width: '750px',
      data: {
        column: this.displayedColumns,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.displayedColumns = [...result];
    });
  }
  getSites(regionId:number){
    this.subs.sink = this.dataService2.getSites(this.user.id,regionId,-1).subscribe({
      next:data=>{
        if(regionId == -1){
          this.sites = [...data];
        }
      this.selectedSites = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  getInterfaces() {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.sources = [...data.iatSource];
        this.companies = [...data.iatCompany];
        this.statuss = [...data.iatStatus];
        this.dayStatuss = [...data.daysStatus];
        this.evidenceStatuss = [...data.evidenceAvailable];
        this.recommendations = [...data.recommendation];
        this.priority = [...data.priority];

      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  openFile(row:InsurenceTracker){
    const dialogPosition: DialogPosition = {
      right: 30 + 'px'
    };
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      panelClass: 'custom-dialog-container',
      width:'340px',
      height:'700px',
      position: dialogPosition,
      data: {
        actionTracker:row,
        action:'insurance',
        mode:'view'
      },
    });
  }
  downloadReport(row:InsurenceTracker){
    this.subs.sink = this.dataService.downloadReport(row.insurenceActionTrackerId).subscribe({
      next: data => { 
        debugger;
        if(data.body.size < 100){
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else{
          const fileExtension = row.reportName.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${row.reportName}`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.showNotification('snackbar-success', "File Downloaded Sucessfully", 'bottom', 'center');
        }
        
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  getActionTracker() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionTrackerReport(this.user.id, this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.sourceFilterList.toString(), this.statusFilterList.toString(), this.daysToTargetFilterList.toString(), this.companyFilterList.toString(), this.priorityFilterList.toString(), this.clusterFilterList.toString()).subscribe({
      next: data => {
        this.actionTrackers = [...data.tracker];
        this.dataSource.data = [...this.actionTrackers];
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
  // viewInsurence(track: InsurenceTracker) {
  //   let insurenceRecc = this.recInsurence.find(data => data.recommendationId == track.recommendationId);
  //   const dialogRef = this.dialog.open(ViewInsurenceComponent, {
  //     width: '750px',
  //     data: {
  //       recommend: insurenceRecc,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: InsurenceRecommendation) => {
  //     if (result) {

  //     }
  //   })
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // updateInsurenceTracker(track: InsurenceTracker) {
  //   const dialogRef = this.dialog.open(InsuranceFormComponent, {
  //     width: '750px',
  //     data: {
  //       tracker: track,
  //       sites: this.sites,
  //       regions: this.regions,
  //       recommendations: this.recInsurence,
  //       sources: this.sources,
  //       companies: this.companies,
  //       statuss: this.statuss,
  //       users: this.users,
  //       action: "edit",
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
  //     if (result) {
  //       this.subs.sink = this.dataService.saveActionTracker(result, this.user.id).subscribe({
  //         next: data => {
  //           let index = this.actionTrackers.findIndex(a => a.insurenceActionTrackerId === result.insurenceActionTrackerId);
  //           this.actionTrackers[index] = { ...result };
  //           this.dataSource.data = [...this.actionTrackers];
  //           this.showNotification('snackbar-success', result.action + ' has been added sucessfully', 'bottom', 'center');
  //         },
  //         error: err => {
  //           this.errorMessage = err;
  //           this.showNotification("err", err, "bottom", "center")
  //         }
  //       })
  //     }
  //   })
  // }
  // viewAction(track: InsurenceTracker) {
  //   this.subs.sink = this.dataService.getUsers(track).subscribe({
  //     next: data => {
  //       const dialogRef = this.dialog.open(ViewActionComponent, {
  //         width: '750px',
  //         data: {
  //           tracker: track,
  //           actionUsers: [...data],
  //         },
  //       });
  //       dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
  //         if (result) {

  //         }
  //       })
  //     },
  //     error: err => {
  //       this.errorMessage = err;
  //       this.showNotification("err", err, "bottom", "center")
  //     }
  //   })
  // }
    //filters
    regionListFn(region: ITRegions) {
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
    priorityListFn(status: IRPriority) {
      let index = this.priorityFilterList.indexOf(status.priorityId);
      if (index == -1) {
        this.priorityFilterList.push(status.priorityId);
      }
      else {
        this.priorityFilterList.splice(index, 1);
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
    statusListFn(status: ITStatus) {
      let index = this.statusFilterList.indexOf(status.statusId);
      if (index == -1) {
        this.statusFilterList.push(status.statusId);
      }
      else {
        this.statusFilterList.splice(index, 1);
      }
    }
    companyListFn(company: ITCompany) {
      let index = this.companyFilterList.indexOf(company.companyId);
      if (index == -1) {
        this.companyFilterList.push(company.companyId);
      }
      else {
        this.companyFilterList.splice(index, 1);
      }
    }
    daysToTargetListFn(days: any) {
      let index = this.daysToTargetFilterList.indexOf(days.title);
      if (index == -1) {
        this.daysToTargetFilterList.push(days.title);
      }
      else {
        this.daysToTargetFilterList.splice(index, 1);
      }
    }
    filterFn(){
      this.getActionTracker();
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

    clearFn(){
      this.regionsFilterList.length = 0;
      this.clusterFilterList.length = 0;
      this.sitesFilterList.length = 0;
      this.sourceFilterList.length = 0;
      this.statusFilterList.length = 0;
      this.companyFilterList.length = 0;
      this.daysToTargetFilterList.length = 0;
      this.priorityFilterList.length = 0;

      this.regions.map(a=>a.isSelected = false)
      this.sites.map(a=>a.isSelected = false)
      this.companies.map(a=>a.isSelected = false)
      this.sources.map(a=>a.isSelected = false)
      this.statuss.map(a=>a.isSelected = false)
      this.daysToTargetList.map(a=>a.isSelected = false)
      this.priority.map(a=>a.isSelected = false)
      this.cluster.map(a=>a.isSelected = false)

    }
}
