import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { WorkingCalService } from './working-cal.service';
import { ApiSave, WH_WorkingCalcFilter, WorkingHourModel } from './working-cal.model';
import { DeleteCalcComponent } from './dialogs/delete-calc/delete-calc.component';
import { CEquipment, CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { AddHoursComponent } from './dialogs/add-hours/add-hours.component';
import { AddCalcComponent } from './dialogs/add-calc/add-calc.component';

@Component({
  selector: 'app-working-cal',
  templateUrl: './working-cal.component.html',
  styleUrls: ['./working-cal.component.sass']
})
export class WorkingCalComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  //Variables
  workingHoursUnit:WorkingHourModel[];
  regions:CRegions[];
  sites:CSites[];
  units:CEquipment[];
  displayFilter: Boolean = false;
  filterObj: WH_WorkingCalcFilter = {
    regionId: -1,
    siteId: -1,
    equipmentId: -1,
  }
  //Common
  errorMessage:string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  displayedColumns: string[] = ['id', 'regionTitle', 'siteTitle', 'unit', 'startDate', 'startHours', 'eoc', 'actions'];
  dataSource: MatTableDataSource<WorkingHourModel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private dataService: WorkingCalService,private dataService2: CommonService, private snackBar: MatSnackBar, public dialog: MatDialog) { super() }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<WorkingHourModel>(this.workingHoursUnit);
    this.getData();
    this.getSites(-1);
    this.getRegions();
    this.getEquipments(-1);
  }


  //Cruds
  getSites(regionId:number){
    this.subs.sink = this.dataService2.getSites(this.user.id, regionId, -1).subscribe({
      next:data=>{
        this.filterObj.siteId = -1
        this.sites = [...data]},
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getRegions(){
    this.subs.sink = this.dataService2.getRegions(this.user.id, -1, -1).subscribe({
      next:data=>{this.regions = [...data]},
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getEquipments(siteId:number){
    this.subs.sink = this.dataService.getEquipments(siteId).subscribe({
      next:data=>{this.units = [...data]},
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getData(){
    this.isTableLoading = true;
   this.subs.sink =  this.dataService.getWorking(this.user.id, this.filterObj).subscribe({
      next:data=>{
        this.workingHoursUnit = [...data]
        this.dataSource.data = [...this.workingHoursUnit]
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  add(){
    const dialogRef = this.dialog.open(AddHoursComponent, {
      width: '600px',
      data: {
        action:'add',
        regions: [...this.regions],
        sites: [...this.sites],
        units: [...this.units],
      }
    });
    dialogRef.afterClosed().subscribe((result: WorkingHourModel) => {
      if (result) {
        this.subs.sink = this.dataService.saveWorking(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.unit + ' has been added sucessfully', 'bottom', 'center');
            this.getData();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    })
  }
  update(row:WorkingHourModel){
    const dialogRef = this.dialog.open(AddHoursComponent, {
      width: '600px',
      data: {
        action:'edit',
        workingHours : {...row},
        regions: [...this.regions],
        sites: [...this.sites],
        units: [...this.units],
      }
    });
    dialogRef.afterClosed().subscribe((result: WorkingHourModel) => {
      if (result) {
        this.subs.sink = this.dataService.saveWorking(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.unit + ' has been updated sucessfully', 'bottom', 'center');
            this.getData();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    })
  }
  view(row:WorkingHourModel){
    const dialogRef = this.dialog.open(AddHoursComponent, {
      width: '600px',
      data: {
        action:'view',
        workingHours : {...row},
        regions: [...this.regions],
        sites: [...this.sites],
        units: [...this.units],
      }
    });
  }
  delete(row:WorkingHourModel) {
    const dialogRef = this.dialog.open(DeleteCalcComponent, {
      data: {
        workingHoursUnit: {...row}
      }
    });
    dialogRef.afterClosed().subscribe((result: WorkingHourModel) => {
      if (result) {
        this.subs.sink = this.dataService.delete(result, this.user.id).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.unit + ' has been deleted sucessfully', 'bottom', 'center');
            this.getData();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    })
  }
  //Add Calcs
  addCalc(row){
    const dialogRef = this.dialog.open(AddCalcComponent, {
      width: '900px',
      data: {
        workingHours : {...row},
      }
    });
    dialogRef.afterClosed().subscribe((result: ApiSave) => {
      if (result) {
        this.subs.sink = this.dataService.saveWorkingHours(result.yearlyResult,result.result,result.userId, result.typeId).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.result.unit + ' has been deleted sucessfully', 'bottom', 'center');
            this.getData();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    })
  }
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  //Common Fns
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
