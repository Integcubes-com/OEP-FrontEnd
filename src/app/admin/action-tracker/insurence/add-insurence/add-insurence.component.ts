import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AddInsurenceService } from './add-insurence.service';
import { AddInsurenceFormComponent } from './dialog/add-insurence-form/add-insurence-form.component';
import { ConfirmDeleteComponent } from './dialog/confirm-delete/confirm-delete.component';
import { InsurenceRecommendation, InsurenceRecommendationApi, IRecommendationType, IRFilter, IRInsurenceStatus, IRNomacStatus, IRPriority, IRProactive, IRRegion, IRSite, IRSource } from './insurence.model';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CCluster, CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { AddColumnsComponent } from './dialog/add-columns/add-columns.component';
import { Year } from '../../end-user/end-user-til/til-tracker.model';

@Component({
  selector: 'app-add-insurence',
  templateUrl: './add-insurence.component.html',
  styleUrls: ['./add-insurence.component.sass']
})
export class AddInsurenceComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  searchFilter: IRFilter = {
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
  displayFilter: Boolean = false;
  documentTypes: DocumentType[];
  recommendationTypes: IRecommendationType[];
  sources: IRSource[];
  selectedSites: CSites[];
  nomacStatuss: IRNomacStatus[];
  insurenceStatuss: IRInsurenceStatus[];

  proactives: IRProactive[];

  regions: CRegions[];
  sites: CSites[];
  cluster:CCluster[];

  clusterFilterList:any[]=[];
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
  proactiveFilterList: any[] = [];
  yearList:any[]=[];
  year:Year[]=[];
  constructor(private dataService: AddInsurenceService, private dataService2: CommonService, private snackBar: MatSnackBar, public dialog: MatDialog) { super() }
  displayedColumns: string[] = ['id', 'siteTitle', 'regionTitle', 'referenceNumber', 'title', 'type', 'insuranceRecommendation', 'nomacStatusTitle', 'insurenceStatusTitle', 'report', 'actions'];
  dataSource: MatTableDataSource<InsurenceRecommendation>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  toggleFilter() {
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
    this.calcYears();
    this.dataSource = new MatTableDataSource<InsurenceRecommendation>(this.recommendations);
    this.getRecommendations();
    this.getInterfaces();
    this.getSites(-1);
    this.getRegion();
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
  downloadReport(rec: InsurenceRecommendation) {
    this.subs.sink = this.dataService.downloadReport(rec.recommendationId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const fileExtension = rec.reportName.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${rec.reportName}.${fileExtension}`;
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
  getRegion() {
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
  getRecommendations() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getRecommendationsList(this.user.id, this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.sourceFilterList.toString(), this.nomacStatusFilterList.toString(), this.insuranceStatusFilterList.toString(), this.priorityFilterList.toString(), this.clusterFilterList.toString(), this.yearList.toString(), this.proactiveFilterList.toString()
    ).subscribe({
      next: data => {
        this.apiObj = { ...data };
        this.recommendations = [...data.reommendations]
        this.dataSource.data = [...this.recommendations];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  //Cruds
  addInsurence() {
    if (this.apiObj) {
      const dialogRef = this.dialog.open(AddInsurenceFormComponent, {
        width: '750px',
        data: {
          recommend: "",
          documentType: this.documentTypes,
          recommendationType: this.recommendationTypes,
          source: this.sources,
          nomacStatus: this.nomacStatuss,
          insurenceStatus: this.insurenceStatuss,
          proactive: this.proactives,
          region: this.regions,
          site: this.sites,
          priority: this.priority,
          action: "add",
        },
      });
      dialogRef.afterClosed().subscribe((result: InsurenceRecommendation) => {
        if (result) {
          this.subs.sink = this.dataService.saveRecommendations(result, this.user.id).subscribe({
            next: data => {
              if (result.insuranceReport instanceof File) {
                this.subs.sink = this.dataService.uploadPDF(result, data, this.user.id).subscribe({
                  next: data => {
                    this.getRecommendations();
                  },
                  error: err => {
                    this.errorMessage = err;
                    this.showNotification("snackbar-error", err, "bottom", "center")
                  }
                })
              }
              else {
                this.getRecommendations();
              }
              // this.recommendations.unshift({ ...data });
              // this.dataSource.data = [...this.recommendations];
              this.showNotification('snackbar-success', result.title + ' has been added sucessfully', 'bottom', 'center');
            },
            error: err => {
              this.errorMessage = err;
              this.showNotification("snackbar-error", err, "bottom", "center")
            }
          })
        }
      })
    }
    else {
      this.showNotification('snackbar-warning', 'Please wait the data is being loaded', 'bottom', 'center');
    }
  }
  viewInsurence(recommendation: InsurenceRecommendation) {
    const dialogRef = this.dialog.open(AddInsurenceFormComponent, {
      width: '750px',
      data: {
        recommend: recommendation,
        documentType: this.documentTypes,
        recommendationType: this.recommendationTypes,
        source: this.sources,
        nomacStatus: this.nomacStatuss,
        insurenceStatus: this.insurenceStatuss,
        proactive: this.proactives,
        region: this.regions,
        site: this.sites,
        priority: this.priority,
        action: "view",
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceRecommendation) => {
      if (result) {

      }
    })
  }
  deleteRecommendation(recommendation: InsurenceRecommendation) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        recommend: recommendation,
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceRecommendation) => {
      if (result) {
        this.subs.sink = this.dataService.deleteRecommendations(result).subscribe({
          next: data => {
            // let index = this.recommendations.findIndex(a => a.recommendationId === data.recommendationId);
            // this.recommendations.splice(index, 1);
            // this.dataSource.data = [...this.recommendations];
            this.showNotification('snackbar-success', result.title + ' has been added sucessfully', 'bottom', 'center');
            this.getRecommendations();
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification("snackbar-error", err, "bottom", "center")
          }
        })

      }
    })
  }
  updateRecommendation(recommendation: InsurenceRecommendation) {
    this.recommendation = { ...recommendation };
    const dialogRef = this.dialog.open(AddInsurenceFormComponent, {
      width: '750px',
      data: {
        recommend: this.recommendation,
        documentType: this.documentTypes,
        recommendationType: this.recommendationTypes,
        source: this.sources,
        nomacStatus: this.nomacStatuss,
        insurenceStatus: this.insurenceStatuss,
        proactive: this.proactives,
        region: this.regions,
        site: this.sites,
        priority: this.priority,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result: InsurenceRecommendation) => {
      if (result) {
        this.subs.sink = this.dataService.saveRecommendations(result, this.user.id).subscribe({
          next: data => {
            if (result.insuranceReport instanceof File) {
              this.subs.sink = this.dataService.uploadPDF(result, data, this.user.id).subscribe({
                next: data => {
                  this.getRecommendations();
                },
                error: err => {
                  this.errorMessage = err;
                  this.showNotification("snackbar-error", err, "bottom", "center");
                }
              })
            }
            else {
              this.getRecommendations();
            }
            // let index = this.recommendations.findIndex(a => a.recommendationId === result.recommendationId);
            // this.recommendations[index] = { ...result };
            // this.dataSource.data = [...this.recommendations];
            this.showNotification('snackbar-success', result.title + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification("snackbar-error", err, "bottom", "center")
          }
        })
      }
    });
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
  clusterListFn(cluster: CCluster) {
    let index = this.clusterFilterList.indexOf(cluster.clusterId);
    if (index == -1) {
      this.clusterFilterList.push(cluster.clusterId);
    }
    else {
      this.clusterFilterList.splice(index, 1);
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
    this.insuranceStatusFilterList.length = 0;
    this.clusterFilterList.length = 0;
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
