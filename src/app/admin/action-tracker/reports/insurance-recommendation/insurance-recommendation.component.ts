import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AddInsurenceService } from '../../insurence/add-insurence/add-insurence.service';
import { IRFilter, InsurenceRecommendationApi, IRecommendationType, IRSource, IRNomacStatus, IRInsurenceStatus, IRProactive, IRPriority, InsurenceRecommendation } from '../../insurence/add-insurence/insurence.model';
import { User } from 'src/app/core/models/user';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CCluster, CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { AddColumnsComponent } from '../../insurence/add-insurence/dialog/add-columns/add-columns.component';
import { Year } from '../../end-user/end-user-til/til-tracker.model';

@Component({
  selector: 'app-insurance-recommendation',
  templateUrl: './insurance-recommendation.component.html',
  styleUrls: ['./insurance-recommendation.component.sass']
})
export class InsuranceRecommendationComponent  extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit{
  
  searchFilter:IRFilter={
    startData: null,
    endDate: null,
    regionId: -1,
    siteId: -1,
    sourceId: -1,
    nomacStatusId: -1,
    insuranceStatusId: -1
  }

  errorMessage: string;
  isTableLoading: boolean;
  apiObj: InsurenceRecommendationApi;
  displayFilter:Boolean = false;
  documentTypes: DocumentType[];
  recommendationTypes: IRecommendationType[];
  sources: IRSource[];

  nomacStatuss: IRNomacStatus[];
  insurenceStatuss: IRInsurenceStatus[];

  proactives: IRProactive[];
  cluster:CCluster[];

  clusterFilterList:any[]=[];
  regions: CRegions[];
  sites: CSites[];
  selectedSites:CSites[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  priority: IRPriority[];
  recommendation: InsurenceRecommendation;
  recommendations: InsurenceRecommendation[];
    //Filter Lists
    regionsFilterList: any[] = [];
    sitesFilterList: any[] = [];
    sourceFilterList: any[] = [];
    nomacStatusFilterList: any[] = [];
    insuranceStatusFilterList: any[] = [];
    priorityFilterList: any[] = [];
    yearList:any[]=[];
    proactiveFilterList: any[] = [];
    year:Year[]=[];
  constructor(private dataService: AddInsurenceService, private dataService2:CommonService,private snackBar: MatSnackBar, public dialog: MatDialog) { super() }
  displayedColumns: string[] = ['id', 'siteTitle', 'regionTitle', 'referenceNumber', 'title', 'type', 'insuranceRecommendation', 'nomacStatusTitle', 'insurenceStatusTitle', 'report'];
  dataSource: MatTableDataSource<InsurenceRecommendation>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  toggleFilter(){
    this.displayFilter = !this.displayFilter;
  }
  calcYears(){
    let i = 2015;
    for(i; i<= 2050; i++){
      let y:Year = {
        year: i,
        isSelected: false
      }
      this.year.push({...y})
    }
  }
  ngOnInit(): void {
    this.calcYears()
    this.dataSource = new MatTableDataSource<InsurenceRecommendation>(this.recommendations);
    this.getRecommendations();
    this.getInterfaces();
    this.getSites(-1);
    this.getRegion();
    this.getClusters();
  }
  addColumns(){
    const dialogRef = this.dialog.open(AddColumnsComponent, {
      width: '750px',
      data: {
        column: this.displayedColumns,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.displayedColumns = [...result];
    });
  }
  getRegion(){
    this.subs.sink = this.dataService2.getUpdatedRegions(this.user.id,-1,-1).subscribe({
      next:data=>{this.regions = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
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
        this.documentTypes = [...data.documentType];
        this.recommendationTypes = [...data.recommendationType];
        this.sources = [...data.source];
        this.nomacStatuss = [...data.nomacStatus];
        this.insurenceStatuss = [...data.insurenceStatus];
        this.proactives = [...data.proactive];
        this.priority = [...data.priority];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  downloadReport(row:InsurenceRecommendation) {
    this.subs.sink = this.dataService.downloadReport(row.recommendationId).subscribe({
      next: data => {
        debugger;
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const fileExtension = row.reportName.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${row.reportName}.${fileExtension}`;
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
  getClusters(){
    this.subs.sink = this.dataService2.getClusters(this.user.id,-1,-1 ).subscribe({
      next: data => {
        this.cluster = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
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
  getRecommendations() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getRecommendationsList(this.user.id, this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.sourceFilterList.toString(), this.nomacStatusFilterList.toString(), this.insuranceStatusFilterList.toString(),this.priorityFilterList.toString(), this.clusterFilterList.toString(), this.yearList.toString(),this.proactiveFilterList.toString()).subscribe({
      next: data => {
        this.apiObj = { ...data };
        this.recommendations = [...data.reommendations];
        this.dataSource.data = [...this.recommendations];
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

  //Filters
  yearListFn(year:Year){
    let index = this.yearList.indexOf(year.year);
    if (index == -1) {
      this.yearList.push(year.year);
    }
    else {
      this.yearList.splice(index, 1);
    }
  }
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
  priorityListFn(status: IRPriority) {
    let index = this.priorityFilterList.indexOf(status.priorityId);
    if (index == -1) {
      this.priorityFilterList.push(status.priorityId);
    }
    else {
      this.priorityFilterList.splice(index, 1);
    }
  }
  proactiveListFn(proactive:IRProactive){
    let index = this.proactiveFilterList.indexOf(proactive.proactiveId);
    if (index == -1) {
      this.proactiveFilterList.push(proactive.proactiveId);
    }
    else {
      this.proactiveFilterList.splice(index, 1);
    }
  }
  sourceListFn(source: IRSource) {
    let index = this.sourceFilterList.indexOf(source.sourceId);
    if (index == -1) {
      this.sourceFilterList.push(source.sourceId);
    }
    else {
      this.sourceFilterList.splice(index, 1);
    }
  }
  nomacStatusListFn(status: IRNomacStatus) {
    let index = this.nomacStatusFilterList.indexOf(status.nomacStatusId);
    if (index == -1) {
      this.nomacStatusFilterList.push(status.nomacStatusId);
    }
    else {
      this.nomacStatusFilterList.splice(index, 1);
    }
  }
  insuranceStatusListFn(company: IRInsurenceStatus) {
    let index = this.insuranceStatusFilterList.indexOf(company.insurenceStatusId);
    if (index == -1) {
      this.insuranceStatusFilterList.push(company.insurenceStatusId);
    }
    else {
      this.insuranceStatusFilterList.splice(index, 1);
    }
  }

  filterFn() {
    this.getRecommendations();
  }
  clearFn() {
    this.regionsFilterList.length = 0;
    this.sitesFilterList.length = 0;
    this.sourceFilterList.length = 0;
    this.nomacStatusFilterList.length = 0;
    this.clusterFilterList.length = 0;
    this.insuranceStatusFilterList.length = 0;
    this.priorityFilterList.length = 0;
    this.yearList.length = 0;

    this.regions.map(a => a.isSelected = false)
    this.sites.map(a => a.isSelected = false)
    this.nomacStatuss.map(a => a.isSelected = false)
    this.sources.map(a => a.isSelected = false)
    this.insurenceStatuss.map(a => a.isSelected = false)
    this.priority.map(a=>a.isSelected = false)
    this.cluster.map(a=>a.isSelected = false)
    this.year.map(a=>a.isSelected = false)

  }
}
