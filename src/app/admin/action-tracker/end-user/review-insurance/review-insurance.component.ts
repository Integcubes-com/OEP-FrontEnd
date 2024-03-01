import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CSites, CRegions, CUsers, CCluster } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { ViewInsurenceComponent } from '../../insurence/add-insurence/dialog/view-insurence/view-insurence.component';
import { InsurenceRecommendation, IRPriority } from '../../insurence/add-insurence/insurence.model';
import { ViewActionComponent } from '../../insurence/insurence-tracker/dialogs/view-action/view-action.component';
import { IATAPIData, ITDayStatus, ITEvidence, InsurenceTracker, ITRecommendation, ITSource, ITCompany, ITStatus } from '../../insurence/insurence-tracker/insurence-tracker.model';
import { InsuranceFormComponent } from '../end-user-insurence/dialog/insurance-form/insurance-form.component';
import { TableColmComponent } from '../end-user-insurence/dialog/table-colm/table-colm.component';
import { EUIFilterObj } from '../end-user-insurence/end-user-insurance.model';
import { EndUserInsuranceService } from '../end-user-insurence/end-user-insurance.service';
import { User } from 'src/app/core/models/user';
import { Year } from '../end-user-til/til-tracker.model';

@Component({
  selector: 'app-review-insurance',
  templateUrl: './review-insurance.component.html',
  styleUrls: ['./review-insurance.component.sass']
})
export class ReviewInsuranceComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  startDate: Date | null = null;
  endDate: Date | null = null;
  filterObj: EUIFilterObj = {
    startDate: null,
    endDate: null,
    sourceId: -1,
    departmentId: -1,
    statusId: -1,
    daysToTarget: '',
    regionId: -1,
    siteId: -1,
  }
  quarterData=[
    {title:'Quarter 1', id:1, isSelected:false},
    {title:'Quarter 2', id:2, isSelected:false},
    {title:'Quarter 3', id:3, isSelected:false},
    {title:'Quarter 4', id:4, isSelected:false},
  ]
  displayFilter: Boolean = false;
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  recInsurence: InsurenceRecommendation[];
  apiObj: IATAPIData;
  dayStatuss: ITDayStatus[];
  evidenceStatuss: ITEvidence[];
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
  selectedSites: CSites[];
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
  regionsFilterList: any[] = [];
  sitesFilterList: any[] = [];
  sourceFilterList: any[] = [];
  statusFilterList: any[] = [4];
  companyFilterList: any[] = [];
  daysToTargetFilterList: any[] = [];
  priorityFilterList: any[] = [];
  quaterFilterList:any[] = [];
  issueYearList: any[] = [];
  issueYear: Year[] = [];
  cluster: CCluster[];

  clusterFilterList: any[] = [];
  yearList:any[]=[];
  year:Year[]=[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: EndUserInsuranceService, private dataService2: CommonService, public dialog: MatDialog,) {
    super();
  }
  displayedColumns: string[] = ['id', 'regionTitle', 'siteTitle', 'statusTitle', 'recommendationReference', 'action', 'targetDate', 'daysToTarget', 'actions'];
  dataSource: MatTableDataSource<InsurenceTracker>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.calcYears();
    this.dataSource = new MatTableDataSource<InsurenceTracker>(this.actionTrackers);
    this.getUsers();
    this.getRegions();
    this.getSites(-1);
    this.getInterfaces();
    this.getClusters();

  }
  calcYears(){
    let i = 2015;
    for(i; i<= 2050; i++){
      let y:Year = {
        year: i,
        isSelected: false
      }
      this.year.push({...y})
      this.issueYear.push({ ...y })
    }
  }
  addColumns() {
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
  getClusters() {
    this.subs.sink = this.dataService2.getClusters(this.user.id, -1, -1).subscribe({
      next: data => {
        this.cluster = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getUsers() {
    this.subs.sink = this.dataService2.getUsers(this.user.id, -1, -1).subscribe({
      next: data => { this.users = [...data] },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getRegions() {
    this.subs.sink = this.dataService2.getUpdatedRegions(this.user.id, -1, -1).subscribe({
      next: data => {
        this.regions = [...data];
        // this.regions[0].isSelected = true;
        // this.regionsFilterList.push(this.regions[0].regionId);
        this.getActionTracker();
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
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
    this.subs.sink = this.dataService.getActionTracker(this.user.id, this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.sourceFilterList.toString(), this.statusFilterList.toString(), this.daysToTargetFilterList.toString(), this.companyFilterList.toString(), this.priorityFilterList.toString(), this.clusterFilterList.toString(), this.quaterFilterList.toString(), this.yearList.toString(), this.issueYearList.toString()).subscribe({
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
      next: data => {
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


  downloadReport(track: InsurenceTracker) {
    this.subs.sink = this.dataService.downloadReport(track.insurenceActionTrackerId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
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
        dayStatuss: this.dayStatuss,
        evidenceStatuss: this.evidenceStatuss,
        action: "review",
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceTracker) => {
      if (result) {
        this.subs.sink = this.dataService.saveReviewActionTracker(result, this.user.id).subscribe({
          next: data => {
            if (result.reportFile instanceof File) {
              this.subs.sink = this.dataService.uploadPDF(data, result, this.user.id).subscribe({
                next: data => {
                  this.getActionTracker()
                },
                error: err => {
                  this.errorMessage = err;
                  this.showNotification("err", err, "bottom", "center")
                }
              })
            }
            else {
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
  yearListFn(year:Year){
    let index = this.yearList.indexOf(year.year);
    if (index == -1) {
      this.yearList.push(year.year);
    }
    else {
      this.yearList.splice(index, 1);
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
  quaterListFn(num:any){
    let index = this.quaterFilterList.indexOf(num.id);
    if (index == -1) {
      this.quaterFilterList.push(num.id);
    }
    else {
      this.quaterFilterList.splice(index, 1);
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
  issueYearListFn(year: Year) {
    let index = this.issueYearList.indexOf(year.year);
    if (index == -1) {
      this.issueYearList.push(year.year);
    }
    else {
      this.issueYearList.splice(index, 1);
    }
  }
  filterFn() {
    this.getActionTracker();
  }
  clearFn() {
    this.quaterFilterList.length = 0;
    this.regionsFilterList.length = 0;
    this.sitesFilterList.length = 0;
    this.sourceFilterList.length = 0;
    this.clusterFilterList.length = 0;
    this.yearList.length = 0;
    this.issueYearList.length = 0;
    this.companyFilterList.length = 0;
    this.daysToTargetFilterList.length = 0;
    this.priorityFilterList.length = 0;
    this.regions.map(a => a.isSelected = false)
    this.sites.map(a => a.isSelected = false)
    this.companies.map(a => a.isSelected = false)
    this.sources.map(a => a.isSelected = false)
    this.statuss.map(a => a.isSelected = false)
    this.daysToTargetList.map(a => a.isSelected = false)
    this.priority.map(a => a.isSelected = false)
    this.quarterData.map(a => a.isSelected = false)
    this.year.map(a => a.isSelected = false)
    this.issueYear.map(a => a.isSelected = false)
  }

}
