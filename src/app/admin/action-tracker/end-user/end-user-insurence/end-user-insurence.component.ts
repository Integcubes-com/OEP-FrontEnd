import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ViewInsurenceComponent } from '../../insurence/add-insurence/dialog/view-insurence/view-insurence.component';
import { IRPriority, InsurenceRecommendation } from '../../insurence/add-insurence/insurence.model';
import { IATAPIData, InsurenceTracker, ITRecommendation, ITSource, ITCompany, ITStatus, ITEvidence, ITDayStatus } from '../../insurence/insurence-tracker/insurence-tracker.model';
import { InsuranceFormComponent } from './dialog/insurance-form/insurance-form.component';
import { EndUserInsuranceService } from './end-user-insurance.service';
import { EUIFilterObj } from './end-user-insurance.model';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';
import { ViewActionComponent } from '../../insurence/insurence-tracker/dialogs/view-action/view-action.component';
import { TableColmComponent } from './dialog/table-colm/table-colm.component';

@Component({
  selector: 'app-end-user-insurence',
  templateUrl: './end-user-insurence.component.html',
  styleUrls: ['./end-user-insurence.component.sass']
})
export class EndUserInsurenceComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  
  filterObj: EUIFilterObj = {
    startDate: null,
    endDate: null,
    sourceId: -1,
    departmentId: -1,
    statusId: -1,
    daysToTarget: '',
    regionId: -1,
    siteId:-1,
  }
  displayFilter: Boolean = false;
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  recInsurence: InsurenceRecommendation[];
  apiObj: IATAPIData;
  dayStatuss: ITDayStatus[];
  evidenceStatuss:  ITEvidence[];
  actionTracker: InsurenceTracker;
  actionTrackers: InsurenceTracker[];
  isTableLoading: boolean;
  sites: CSites[];
  regions: CRegions[];
  recommendations: ITRecommendation[];
  sources: ITSource[];
  companies: ITCompany[];
  statuss: ITStatus[];
  users: CUsers[];
  selectedSites:CSites[];
  priority: IRPriority[];

  errorMessage: string;
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

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: EndUserInsuranceService,private dataService2:CommonService, public dialog: MatDialog,) {
    super();
  }
  displayedColumns: string[] = ['id','regionTitle','siteTitle','statusTitle','recommendationReference', 'action', 'targetDate', 'daysToTarget',  'actions'];
  dataSource: MatTableDataSource<InsurenceTracker>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<InsurenceTracker>(this.actionTrackers);
    this.getUsers();
    this.getRegions();
    this.getSites(-1);
    this.getInterfaces();

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
  getUsers(){
    this.subs.sink = this.dataService2.getUsers(this.user.id,-1,-1).subscribe({
      next:data=>{this.users = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  getRegions() {
    this.subs.sink = this.dataService2.getRegions(this.user.id, -1, -1).subscribe({
      next: data => {
        this.regions = [...data];
        this.regions[0].isSelected = true;
        this.regionsFilterList.push(this.regions[0].regionId);
        this.getActionTracker();
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
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
  getActionTracker() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionTracker(this.user.id,this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.sourceFilterList.toString(), this.statusFilterList.toString(), this.daysToTargetFilterList.toString(), this.companyFilterList.toString(), this.priorityFilterList.toString()).subscribe({
      next: data => {
        this.apiObj = { ...data };
        this.actionTrackers = [...data.tracker];
        this.dataSource.data = [...this.actionTrackers];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  viewAction(track: InsurenceTracker) {
    const dialogRef = this.dialog.open(ViewActionComponent, {
      width: '700px',
      data: {
        tracker: track,
      },
        });
      }
  viewInsurence(track: InsurenceTracker) {
    this.subs.sink = this.dataService.getInsuranceRecommendation(this.user.id, track.recommendationId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(ViewInsurenceComponent, {
          width: '700px',
          data: {
            recommend: data,
          },
        });
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })

  }
  downloadReport(track: InsurenceTracker){
    this.subs.sink = this.dataService.downloadReport(track.insurenceActionTrackerId).subscribe({
      next: data => { 
        if(data.body.size < 100){
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else{
          const fileExtension = track.reportName.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${track.reportName}.${fileExtension}`;
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
  //Cruds
  updateInsurenceTracker(track: InsurenceTracker) {
    const dialogRef = this.dialog.open(InsuranceFormComponent, {
      disableClose: true, // Prevent closing by clicking outside
      width: '700px',
      data: {
        selectedUser: this.user.id,
        tracker: track,
        sites: this.sites,
        regions: this.regions,
        recommendations: this.recommendations,
        sources: this.sources,
        companies: this.companies,
        statuss: this.statuss,
        users: this.users,
        dayStatuss:this.dayStatuss,
        evidenceStatuss:this.evidenceStatuss,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
      if (result) {
        this.subs.sink = this.dataService.saveActionTracker(result, this.user.id).subscribe({
          next: data => {
            if(result.reportFile instanceof File){
              this.subs.sink = this.dataService.uploadPDF(data, result, this.user.id).subscribe({
                next:data=>{  
                  this.getActionTracker()         
              },
                error:err=>{
                  this.errorMessage = err;
                  this.showNotification("err", err, "bottom", "center")
                }
              })
            }
            else{
              this.getActionTracker();
            }
            // let index = this.actionTrackers.findIndex(a => a.insurenceActionTrackerId === result.insurenceActionTrackerId);
            // this.actionTrackers[index] = { ...result };
            // this.dataSource.data = [...this.actionTrackers];
            this.showNotification('snackbar-success', result.action + ' has been added sucessfully', 'bottom', 'center');
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

    //filters
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
    priorityListFn(status: IRPriority) {
      let index = this.priorityFilterList.indexOf(status.priorityId);
      if (index == -1) {
        this.priorityFilterList.push(status.priorityId);
      }
      else {
        this.priorityFilterList.splice(index, 1);
      }
    }
    filterFn(){
      this.getActionTracker();
    }
    clearFn(){
      this.regionsFilterList.length = 0;
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
    }
}
