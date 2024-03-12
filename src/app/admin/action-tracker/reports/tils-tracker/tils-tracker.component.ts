import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EndUserTilService } from '../../end-user/end-user-til/end-user-til.service';
import { TAPBudgetSource, TAPEquipment, TAPPriority } from '../../tils/tils-tracker/tils-tracker-assignment.model';
import { TAFilterObj } from '../../end-user/end-user-til/end-user-til.component';
import { TilsTrackerService } from '../../tils/tils-tracker/tils-tracker.service';
import { tataStatus, ActionTrackerEndUser, tatapart, tataFinalImplementation, tataEv, tataSAP, tataBudget, unitTypes } from '../../end-user/end-user-til/til-tracker.model';
import { CSites, CRegions, CCluster } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { FileUploadDialogComponent } from '../../file-upload-dialog/file-upload-dialog.component';
import { TableColmTilComponent } from '../../end-user/end-user-til/table-colm/table-colm.component';
import { TSeverity, TFocus, tbEquipemnt } from '../../tils/add-tils/add-tils.model';

@Component({
  selector: 'app-tils-tracker',
  templateUrl: './tils-tracker.component.html',
  styleUrls: ['./tils-tracker.component.sass']
})
export class TilsTrackerComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  isTableLoading: boolean;
filterObj:TAFilterObj={
  startDate: null,
  endDate: null,
  sap: -1,
  status: -1,
  equipment: -1,
  daysToTarget: "",
  regionId: -1,
  siteId: -1
}
cluster:CCluster[];

clusterFilterList:any[]=[];
statusList:tataStatus[]
displayFilter:Boolean = false;
priority:TAPPriority[]
budget:tataBudget[]
equipment:TAPEquipment[]
sites: CSites[];
regions: CRegions[];
selectedSites: CSites[];
finalImplementationList:any[]=[];

action: ActionTrackerEndUser[]
budgetSource: TAPBudgetSource[]
part: tatapart[]
finalImplementation: tataFinalImplementation[]
evidence: tataEv[]
sapPlaning: tataSAP[]
tilSeveritys: TSeverity[];
tilFocuss: TFocus[];
unitTypeFilterList:any[]=[];
tbEquipemnt :tbEquipemnt[];
tbEquipmentFilterList: any[]=[];
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
sapFilterList:any[]=[];
statusFilterList:any[]=[];
equipmentFilterList:any[]=[];
daysToTargetFilterList:any[]=[];
unitTypes:unitTypes[]=[];

tilFocusFilterList: any[] = [];
soverityFilterList: any[] = [];
priorityFilterList:any[]=[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  errorMessage: string;
  constructor(private snackBar: MatSnackBar,private dataService2: TilsTrackerService, private dataService3: CommonService,private dataService: EndUserTilService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'regionTitle','siteTitle','tilNumber','tilDescription', 'tilAction',  'siteEquipmentTitle', 'statustitle','targetDate','daysToTarget', 'report'];
  dataSource: MatTableDataSource<ActionTrackerEndUser>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ActionTrackerEndUser>(this.action);
    this.getActions();
    this.getInterfaces();
    this.getRegions();
    this.getSites(-1);
    this.getClusters();
  }
  getClusters(){
    this.subs.sink = this.dataService3.getClusters(this.user.id,-1,-1 ).subscribe({
      next: data => {
        this.cluster = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getRegions(){
    this.subs.sink = this.dataService3.getUpdatedRegions(this.user.id,-1,-1).subscribe({
      next:data=>{this.regions = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  openFile(row:ActionTrackerEndUser){
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
        action:'til',
        mode:'view'
      },
    });
  }
  getSites(regionId:number){
    this.subs.sink = this.dataService3.getSites(this.user.id,regionId,-1).subscribe({
      next:data=>{
        if(regionId == -1){
          this.sites = [...data];
        }
      this.selectedSites = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  finalImplementationFn(days: tataFinalImplementation) {
    let index = this.finalImplementationList.indexOf(days.finalImpId);
    if (index == -1) {
      this.finalImplementationList.push(days.finalImpId);
    }
    else {
      this.finalImplementationList.splice(index, 1);
    }
  }
  unitTypesListFn(days: unitTypes) {
    let index = this.unitTypeFilterList.indexOf(days.outageTypeId);
    if (index == -1) {
      this.unitTypeFilterList.push(days.outageTypeId);
    }
    else {
      this.unitTypeFilterList.splice(index, 1);
    }
  }
  getInterfaces() {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.budgetSource= [...data.budgetSource]
        this.part= [...data.part]
        this.finalImplementation= [...data.finalImplementation]
        this.evidence= [...data.evidence]
        this.sapPlaning= [...data.sapPlaning]
        this.equipment= [...data.equipment]
        this.unitTypes = [...data.outageTypes];
        this.priority= [...data.priority]
        this.budget= [...data.budget]
        this.statusList = [...data.statusList]
        this.tilSeveritys = [...data.oemSeverity];
        this.tilFocuss = [...data.tilFocus];
        this.tbEquipemnt = [...data.tbEquipemnt]
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  toggleFilter(){
    this.displayFilter = !this.displayFilter;
  }
  // search(){
  //   this.subs.sink = this.dataService.filterReport(this.filterObj, this.user.id).subscribe({
  //     next: data => {
  //       this.action = [...data]
  //       this.dataSource.data = [...this.action];
  //     },
  //     error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
  //   })
  // }
  getActions() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionTrackerReport(this.user.id, this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.equipmentFilterList.toString(), this.sapFilterList.toString(), this.statusFilterList.toString(), this.daysToTargetFilterList.toString(), this.tilFocusFilterList.toString(), this.soverityFilterList.toString(), this.priorityFilterList.toString(),this.clusterFilterList.toString(), this.finalImplementationList.toString(), this.unitTypeFilterList.toString(),this.tbEquipmentFilterList.toString()).subscribe({
      next: data => {
        this.action= [...data.action]
        this.dataSource.data = [...this.action];
        this.isTableLoading = false;

      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  addColumns(){
    const dialogRef = this.dialog.open(TableColmTilComponent, {
      width: '750px',
      data: {
        column: this.displayedColumns,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.displayedColumns = [...result];
    });
  }
  downloadPDF(row:ActionTrackerEndUser){
    this.subs.sink = this.dataService2.downloadReport(row.tilActionTrackerId).subscribe({
      next: data => {
        debugger;
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download =  `${row.reportName}`;
          a.click();
          window.URL.revokeObjectURL(url);
        }

      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
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
    //filters
    priorityListFn(source: TAPPriority) {
      let index = this.priorityFilterList.indexOf(source.priorityId);
      if (index == -1) {
        this.priorityFilterList.push(source.priorityId);
      }
      else {
        this.priorityFilterList.splice(index, 1);
      }
    }
    focusListFn(source: TFocus) {
      let index = this.tilFocusFilterList.indexOf(source.focusId);
      if (index == -1) {
        this.tilFocusFilterList.push(source.focusId);
      }
      else {
        this.tilFocusFilterList.splice(index, 1);
      }
    }
    
    severityListFn(source: TSeverity) {
      let index = this.soverityFilterList.indexOf(source.oemSeverityId);
      if (index == -1) {
        this.soverityFilterList.push(source.oemSeverityId);
      }
      else {
        this.soverityFilterList.splice(index, 1);
      }
    }
    EquipmentListFn(eq: tbEquipemnt) {
      let index = this.tbEquipmentFilterList.indexOf(eq.tilEquipmentId);
      if (index == -1) {
        this.tbEquipmentFilterList.push(eq.tilEquipmentId);
      }
      else {
        this.tbEquipmentFilterList.splice(index, 1);
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
    sapListFn(sap: tataSAP) {
      let index = this.sapFilterList.indexOf(sap.sapPlanningId);
      if (index == -1) {
        this.sapFilterList.push(sap.sapPlanningId);
      }
      else {
        this.sapFilterList.splice(index, 1);
      }
    }
    statusListFn(status: tataStatus) {
      let index = this.statusFilterList.indexOf(status.statusId);
      if (index == -1) {
        this.statusFilterList.push(status.statusId);
      }
      else {
        this.statusFilterList.splice(index, 1);
      }
    }
    equipmentListFn(equipment: TAPEquipment) {
      let index = this.equipmentFilterList.indexOf(equipment.equipmentId);
      if (index == -1) {
        this.equipmentFilterList.push(equipment.equipmentId);
      }
      else {
        this.equipmentFilterList.splice(index, 1);
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
      this.getActions();
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
      this.sitesFilterList.length = 0;
      this.sapFilterList.length = 0;
      this.statusFilterList.length = 0;
      this.equipmentFilterList.length = 0;
      this.clusterFilterList.length = 0;
      this.daysToTargetFilterList.length = 0;
      this.tilFocusFilterList.length = 0;
      this.soverityFilterList.length = 0;
      this.priorityFilterList.length = 0;
      this.tbEquipmentFilterList.length = 0;

      this.regions.map(a=>a.isSelected = false)
      this.sites.map(a=>a.isSelected = false)
      this.equipment.map(a=>a.isSelected = false)
      this.sapPlaning.map(a=>a.isSelected = false)
      this.statusList.map(a=>a.isSelected = false)
      this.daysToTargetList.map(a=>a.isSelected = false)
      this.tilFocuss.map(a=>a.isSelected = false)
      this.tilSeveritys.map(a=>a.isSelected = false)
      this.priority.map(a=>a.isSelected = false)
      this.cluster.map(a => a.isSelected = false)
      this.tbEquipemnt.map(a => a.isSelected = false)

    }
}
