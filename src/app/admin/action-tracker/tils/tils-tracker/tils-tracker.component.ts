import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TILs } from '../add-tils/add-tils.model';
import { TilTrackerDeleteComponent } from './dialog/til-tracker-delete/til-tracker-delete.component';
import { TilTrackerFormComponent } from './dialog/til-tracker-form/til-tracker-form.component';
import { TAPActionClosure, TAPBudgetSource, TAPEquipment, TAPFilterObj, TAPOutage, TAPPriority, TAPReviewStatus, TASubmitObj, TilActionPackage } from './tils-tracker-assignment.model';
import { TilsTrackerService } from './tils-tracker.service';
import { ViewFormComponent } from '../../reviewer/til-evaluation/dialogs/view-form/view-form.component';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { CopyAlertComponent } from './dialog/copy-alert/copy-alert.component';

@Component({
  selector: 'app-tils-tracker',
  templateUrl: './tils-tracker.component.html',
  styleUrls: ['./tils-tracker.component.sass']
})
export class TilsTrackerComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  displayFilter: Boolean = false;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  filterObj: TAPFilterObj = {
    budgetSource: -1,
    tilNumber: -1,
    unitStatus: -1,
    reviewStatus: -1,
    priority: -1
  }
  errorMessage: string;
  isTableLoading: boolean;

  til: TILs;
  tils: TILs[];

  actions: TilActionPackage[];
  sites: CSites[];
  regions: CRegions[];
  equipments: TAPEquipment[]
  prioritys: TAPPriority[]
  budgetSources: TAPBudgetSource[]
  reviewStatuss: TAPReviewStatus[]
  actionClosure: TAPActionClosure[]
  outages: TAPOutage[]

  //Filter Lists
  budgetSourceFilterList: any[] = [];
  tilNumberFilterList: any[] = [];
  unitStatusFilterList: any[] = [];
  reviewStatusFilterList: any[] = [];
  priorityStatusFilterList: any[] = [];


  constructor(private dataService: TilsTrackerService, private dataService2: CommonService, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { super() }
  displayedColumns: string[] = ['id', 'tilNumber', 'actionTitle', 'actionCategory', 'priorityTitle', 'actions'];
  dataSource: MatTableDataSource<TilActionPackage>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // assignPackage(tap: TilActionPackage) {
  //   this.router.navigate([`/admin/action-tracker/tils/til-tracker/${tap.packageId}`])
  // }

  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TilActionPackage>(this.actions);
    this.getSites();
    this.getRegions();
    this.getTils();
    this.getInterfaces();
  }
  getSites() {
    this.subs.sink = this.dataService2.getSites(this.user.id, -1, -1).subscribe({
      next: data => { this.sites = [...data] },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getRegions() {
    this.subs.sink = this.dataService2.getRegions(this.user.id, -1, -1).subscribe({
      next: data => { this.regions = [...data] },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getInterfaces() {

    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.equipments = [...data.equipments];
        this.prioritys = [...data.priority];
        this.budgetSources = [...data.budgetSource];
        this.reviewStatuss = [...data.reviewStatus];
        this.outages = [...data.outages];
        this.actionClosure = [...data.actionClosureGuidelines]
        this.tils = [...data.tilsList]
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getTils() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getTilsActionsList(this.user.id,this.tilNumberFilterList.toString(), this.unitStatusFilterList.toString(), this.budgetSourceFilterList.toString(), this.reviewStatusFilterList.toString(), this.priorityStatusFilterList.toString()).subscribe({
      next: data => {
        this.actions = [...data.actions];
        this.dataSource.data = [...this.actions];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }



  //Cruds
  addActionPackage() {
    const dialogRef = this.dialog.open(TilTrackerFormComponent, {
      width: '750px',
      data: {
        actionPacakage: "",
        tils: this.tils,
        equipments: this.equipments,
        prioritys: this.prioritys,
        budgetSources: this.budgetSources,
        reviewStatuss: this.reviewStatuss,
        actionClosure: this.actionClosure,
        outages: this.outages,
        regions: this.regions,
        sites: this.sites,
        action: 'add'
      },
    });
    dialogRef.afterClosed().subscribe((result: TASubmitObj) => {
      if (result) {
        this.subs.sink = this.dataService.updateActioPackage(result, this.user.id).subscribe({
          next: data => {
            this.getTils();
            // this.actions.unshift({ ...data });
            // this.dataSource.data = [...this.actions];
            this.showNotification('snackbar-success', result.action.actionTitle + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    });
  }
  viewPackage(action: TilActionPackage) {
    let actionUsers = [];
    this.subs.sink = this.dataService.getUpdateUsers(action).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(TilTrackerFormComponent, {
          width: '750px',
          data: {
            actionPacakage: action,
            tils: this.tils,
            equipments: this.equipments,
            prioritys: this.prioritys,
            budgetSources: this.budgetSources,
            reviewStatuss: this.reviewStatuss,
            actionClosure: this.actionClosure,
            outages: this.outages,
            regions: this.regions,
            sites: this.sites,
            // actionUsers:[...data.users],
            actionEquipment: [...data.equipments],
            action: 'view'
          },
        });
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
    // const dialogRef = this.dialog.open(ViewActionPackageComponent, {
    //   width: '750px',
    //   data: {
    //     actionPacakage: action,
    //     tils: this.tils,
    //     apiUsers: this.apiUsers,
    //     equipments: this.equipments,
    //     prioritys: this.prioritys,
    //     budgetSources: this.budgetSources,
    //     reviewStatuss: this.reviewStatuss,
    //     actionClosure:this.actionClosure,
    //     outages:this.outages,
    //     actionUsers:actionUsers,
    //     action:'edit'
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result: TilActionPackage) => {
    //   if (result) {

    //   }
    // });
  }
  updateActionPackage(action: TilActionPackage) {

    let actionUsers = [];
    this.subs.sink = this.dataService.getUpdateUsers(action).subscribe({
      next: data => {
        // actionUsers = [...data.users];   
        const dialogRef = this.dialog.open(TilTrackerFormComponent, {
          width: '750px',
          data: {
            actionPacakage: action,
            tils: this.tils,
            equipments: this.equipments,
            prioritys: this.prioritys,
            budgetSources: this.budgetSources,
            reviewStatuss: this.reviewStatuss,
            actionClosure: this.actionClosure,
            outages: this.outages,
            regions: this.regions,
            sites: this.sites,
            actionEquipment: [...data.equipments],
            action: 'edit'
          },
        });
        dialogRef.afterClosed().subscribe((result: TASubmitObj) => {
          if (result) {
            this.subs.sink = this.dataService.updateActioPackage(result, this.user.id).subscribe({
              next: data => {
                this.getTils();
                this.showNotification('snackbar-success', result.action.actionTitle + ' has been added sucessfully', 'bottom', 'center');
              },
              error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
            })
          }
        });
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })

  }
  viewTil(action: TilActionPackage) {
    this.til = this.tils.find(data => data.tilId == action.tilId);
    const dialogRef = this.dialog.open(ViewFormComponent, {
      width: '750px',
      data: {
        til: this.til,
      },
    });

  }
  copyPackage(actionPackage: TilActionPackage){
    const dialogRef = this.dialog.open(CopyAlertComponent, {
      data: {
        actionPacakage: actionPackage,
      },
    });
    dialogRef.afterClosed().subscribe((result: TilActionPackage) => {
      if (result) {
        this.subs.sink = this.dataService.copyActioPackage(result, this.user.id).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.actionTitle + ' has been added sucessfully', 'bottom', 'center');
          this.getTils();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    });
  }
  deleteAction(actionPackage: TilActionPackage) {
    const dialogRef = this.dialog.open(TilTrackerDeleteComponent, {
      data: {
        actionPacakage: actionPackage,
      },
    });
    dialogRef.afterClosed().subscribe((result: TilActionPackage) => {
      if (result) {
        this.subs.sink = this.dataService.deleteActionPackage(result).subscribe({
          next: data => {
            let index = this.actions.findIndex(a => a.packageId === result.packageId);
            this.actions.splice(index, 1);
            this.dataSource.data = [...this.actions];
            this.showNotification('snackbar-success', result.actionTitle + ' has been added sucessfully', 'bottom', 'center');
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    });
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
  tilNumberListFn(region: TILs) {
    let index = this.tilNumberFilterList.indexOf(region.tilId);
    if (index == -1) {
      this.tilNumberFilterList.push(region.tilId);
    }
    else {
      this.tilNumberFilterList.splice(index, 1);
    }
  }
  unitStatusListFn(site: TAPOutage) {
    let index = this.unitStatusFilterList.indexOf(site.outageTypeId);
    if (index == -1) {
      this.unitStatusFilterList.push(site.outageTypeId);
    }
    else {
      this.unitStatusFilterList.splice(index, 1);
    }
  }
  budgetSourceListFn(source: TAPBudgetSource) {
    let index = this.budgetSourceFilterList.indexOf(source.budgetSourceId);
    if (index == -1) {
      this.budgetSourceFilterList.push(source.budgetSourceId);
    }
    else {
      this.budgetSourceFilterList.splice(index, 1);
    }
  }
  reviewStatusListFn(dept: TAPReviewStatus) {
    let index = this.reviewStatusFilterList.indexOf(dept.reviewStatusId);
    if (index == -1) {
      this.reviewStatusFilterList.push(dept.reviewStatusId);
    }
    else {
      this.reviewStatusFilterList.splice(index, 1);
    }
    
  }
  priorityStatusListFn(dept: TAPPriority) {
    let index = this.priorityStatusFilterList.indexOf(dept.priorityId);
    if (index == -1) {
      this.priorityStatusFilterList.push(dept.priorityId);
    }
    else {
      this.priorityStatusFilterList.splice(index, 1);
    }
  }

  filterFn() {
    this.getTils();
  }
  clearFn() {
    this.tilNumberFilterList.length = 0;
    this.unitStatusFilterList.length = 0;
    this.budgetSourceFilterList.length = 0;
    this.reviewStatusFilterList.length = 0;
    this.priorityStatusFilterList.length = 0;


    this.tils.map(a => a.isSelected = false)
    this.outages.map(a => a.isSelected = false)
    this.budgetSources.map(a => a.isSelected = false)
    this.reviewStatuss.map(a => a.isSelected = false)
    this.prioritys.map(a => a.isSelected = false)
  }
}
