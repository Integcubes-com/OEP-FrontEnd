import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { ConfigurationService } from './configuration.service';
import { KPIConfigurations, KPIIndicator } from './configuration.model';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { FormComponent } from './dialogs/form/form.component';
import { KpiFormComponent } from './dialogs/kpi-form/kpi-form.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.sass']
})
export class ConfigurationComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  filterObj={
    siteId:-1,
  }
  sites:CSites[];
  //Common Variables
  errorMessage:string;
  isTableLoading: boolean = true;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  //Varaibles
  monthlyKPI: KPIConfigurations[];
  constructor(private dataService2:CommonService,private snackBar: MatSnackBar, private dataService: ConfigurationService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['groupCode', 'groupTitle','indicatorCode', 'indicatorTitle',  'unit', 'measurementTitle','annualTargetTitle', 'classificationTitle','factor','actions'];
  dataSource: MatTableDataSource<KPIConfigurations>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<KPIConfigurations>(this.monthlyKPI);
    this.getSites();

  }
  addKpi(){
    const dialogRef = this.dialog.open(KpiFormComponent, {
      width: '750px',
      data: {
        kpi: new KPIIndicator({}),
        action: "add",
      },
      
    });
    dialogRef.afterClosed().subscribe((result: KPIIndicator) => {
      if (result) {
        this.subs.sink = this.dataService.saveKpiIndicator(result).subscribe({
          next: data => {
           this.showNotification('snackbar-success', result.indicatorTitle + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  add(){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '750px',
      data: {
        kpi: new KPIConfigurations({}),
        siteId: this.filterObj.siteId,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result: KPIConfigurations) => {
      if (result) {
        this.subs.sink = this.dataService.saveKpi(result).subscribe({
          next: data => {
           this.showNotification('snackbar-success', result.measurementTitle + ' has been deleted sucessfully', 'bottom', 'center');
           this.getKPI()
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  delete(kpi:KPIConfigurations){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width:'400px',
          data: {
            kpi: kpi
          }
        });
        dialogRef.afterClosed().subscribe((result: KPIConfigurations) => {
          if (result) {
            this.subs.sink = this.dataService.deleteKpi(result).subscribe({
              next: data => {
               this.showNotification('snackbar-success', result.measurementTitle + ' has been deleted sucessfully', 'bottom', 'center');
               this.getKPI()
              },
              error: err => {
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        })
  }
  view(kpi: KPIConfigurations) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '750px',
      data: {
        kpi: kpi,
        siteId: this.filterObj.siteId,
        action: "view",
      },
    });
  }
  update(kpi:KPIConfigurations){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '750px',
      data: {
        kpi: kpi,
        siteId: this.filterObj.siteId,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result: KPIConfigurations) => {
      if (result) {
        this.subs.sink = this.dataService.saveKpi(result).subscribe({
          next: data => {
           this.showNotification('snackbar-success', result.measurementTitle + ' has been deleted sucessfully', 'bottom', 'center');
           this.getKPI()
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  getSites(){
    this.subs.sink = this.dataService2.getKPISites(this.user.id, -1, -1).subscribe({
      next:data=>{
        this.sites = [...data];
        this.filterObj.siteId = this.sites[0].siteId;
        this.getKPI();
      },
      error:err=>{this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  getKPI(){
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getKPIs(this.user.id, this.filterObj.siteId).subscribe({
      next:data=>{
        
        this.monthlyKPI = [...data];
       this.dataSource.data = [...data];
       this.isTableLoading = false;

      },
      error:err=>{this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')}
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

}
