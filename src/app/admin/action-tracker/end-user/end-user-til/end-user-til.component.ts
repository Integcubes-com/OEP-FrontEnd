import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EndUserTilService } from './end-user-til.service';
import { TilActionPackage, TAPEquipment, TAPPriority, TAPBudgetSource, TAPUser } from '../../tils/tils-tracker/tils-tracker-assignment.model';
import { AssignTilActionComponent } from '../../tils/tils-tracker/assign-til/dialog/assign-til-action/assign-til-action.component';
import { tataStatus, ActionTrackerEndUser, tatapart, tataFinalImplementation, tataEv, tataSAP, tataBudget } from './til-tracker.model';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CSites, CRegions, CUsers, CCountry } from 'src/app/shared/common-interface/common-interface';
import { TableColmTilComponent } from './table-colm/table-colm.component';
import { TSeverity, TFocus } from '../../tils/add-tils/add-tils.model';
export interface TAFilterObj {
  startDate: Date,
  endDate: Date,
  sap: number,
  status: number,
  equipment:number,
  daysToTarget:string,
  regionId:number,
  siteId:number,
}
@Component({
  selector: 'app-end-user-til',
  templateUrl: './end-user-til.component.html',
  styleUrls: ['./end-user-til.component.sass']
})
export class EndUserTilComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  isTableLoading: boolean;
  filterObj: TAFilterObj = {
    startDate: null,
    endDate: null,
    sap: -1,
    status: -1,
    equipment: -1,
    daysToTarget: "",
    regionId: -1,
    siteId: -1
  }
  statusList: tataStatus[];
  displayFilter: Boolean = false;
  sites: CSites[];
  regions: CRegions[];
  selectedSites: CSites[];
  action: ActionTrackerEndUser[]
  budgetSource: TAPBudgetSource[]
  part: tatapart[]
  finalImplementation: tataFinalImplementation[]
  evidence: tataEv[]
  sapPlaning: tataSAP[]
  package: TilActionPackage
  equipment: TAPEquipment[]
  priority: TAPPriority[]
  budget: tataBudget[]
  users:CUsers[];
  tilSeveritys: TSeverity[];
  tilFocuss: TFocus[];
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
  tilFocusFilterList: any[] = [];
  soverityFilterList: any[] = [];
  priorityFilterList: any[] = [];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  errorMessage: string;
  constructor(private snackBar: MatSnackBar, private dataService: EndUserTilService,private dataService2: CommonService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'regionTitle','siteTitle','tilNumber','tilDescription', 'tilAction',  'siteEquipmentTitle', 'statustitle','targetDate','daysToTarget', 'actions'];
  dataSource: MatTableDataSource<ActionTrackerEndUser>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ActionTrackerEndUser>(this.action);
    this.getInterfaces();
    this.getRegions();
    this.getSites(-1);
    this.getUsers();
  }
  getUsers(){
    this.subs.sink = this.dataService2.getUsers(this.user.id,-1,-1).subscribe({
      next:data=>{
        this.users = [...data];
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  getRegions(){
    this.subs.sink = this.dataService2.getRegions(this.user.id,-1,-1).subscribe({
      next:data=>{this.regions = [...data]; this.regions[0].isSelected = true; this.regionsFilterList.push(this.regions[0].regionId);     this.getActions();
      },
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
  getActions() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionTracker(this.user.id,this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.equipmentFilterList.toString(), this.sapFilterList.toString(), this.statusFilterList.toString(), this.daysToTargetFilterList.toString(),this.tilFocusFilterList.toString(), this.soverityFilterList.toString(), this.priorityFilterList.toString()).subscribe({
      next: data => {
        this.action= [...data.action]
        this.dataSource.data = [...this.action]
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
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
        this.priority= [...data.priority]
        this.budget= [...data.budget]
        this.statusList = [...data.statusList]
        this.tilSeveritys = [...data.oemSeverity];
        this.tilFocuss = [...data.tilFocus];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  downloadReport(row: ActionTrackerEndUser) {
    this.subs.sink = this.dataService.downloadReport(row.tilActionTrackerId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${row.reportName}`;
          a.click();
          window.URL.revokeObjectURL(url);
        }

      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  //Cruds
  saveAction(row: ActionTrackerEndUser) {
    const dialogRef = this.dialog.open(AssignTilActionComponent, {
      width: '650px',
      data: {
        userId:this.user.id,
        action: row,
        equipment:this.equipment,
        priority:this.priority,
        budgetSource:this.budgetSource,
        budget:this.budget,
        status:this.statusList,
        part:this.part,
        users:this.users,
        finalImplementation:this.finalImplementation,
        evidence:this.evidence,
        sapPlaning:this.sapPlaning,
        mode:"action"
      },
    });
    dialogRef.afterClosed().subscribe((result: ActionTrackerEndUser) => {
      if (result) {
        this.subs.sink = this.dataService.saveActionTracker(result, this.user.id).subscribe({
          next: data => {
            if(result.tilReport instanceof File){
              this.subs.sink = this.dataService.uploadPDF(result,data,this.user.id).subscribe({
                next:data=>{     
                  this.getActions()      
                },
                  error:err=>{
                    this.errorMessage = err;
                    this.showNotification("err", err, "bottom", "center")
                  }
              })
            }
            else{
              this.getActions();
            }
            // let index = this.action.findIndex(a => a.tilActionTrackerId === data.tilActionTrackerId);
            // this.action[index] = { ...result };
            // this.dataSource.data = [...this.action];
            this.showNotification('snackbar-success', "Action has been Saved" + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  viewAction(row: ActionTrackerEndUser) {
    const dialogRef = this.dialog.open(AssignTilActionComponent, {
      width: '650px',
      data: {
        action: row,
        users:this.users,
        equipment:this.equipment,
        priority:this.priority,
        budgetSource:this.budgetSource,
        budget:this.budget,
        part:this.part,
        status:this.statusList,
        finalImplementation:this.finalImplementation,
        evidence:this.evidence,
        sapPlaning:this.sapPlaning,
        mode:"view"
      },
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
  clearFn(){
    this.regionsFilterList.length = 0;
    this.sitesFilterList.length = 0;
    this.sapFilterList.length = 0;
    this.statusFilterList.length = 0;
    this.equipmentFilterList.length = 0;
    this.daysToTargetFilterList.length = 0;
    this.tilFocusFilterList.length = 0;
    this.soverityFilterList.length = 0;
    this.priorityFilterList.length = 0;
    this.regions.map(a=>a.isSelected = false)
    this.sites.map(a=>a.isSelected = false)
    this.equipment.map(a=>a.isSelected = false)
    this.sapPlaning.map(a=>a.isSelected = false)
    this.statusList.map(a=>a.isSelected = false)
    this.daysToTargetList.map(a=>a.isSelected = false)
    this.tilFocuss.map(a=>a.isSelected = false)
    this.tilSeveritys.map(a=>a.isSelected = false)
    this.priority.map(a=>a.isSelected = false)
  }
}
