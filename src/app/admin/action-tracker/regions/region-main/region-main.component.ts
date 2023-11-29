import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { RegionFormComponent } from './dialogs/region-form/region-form.component';
import { Regions, SaveApiData } from './region.model';
import { RegionsService } from './regions.service';
import { CUsers } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-region-main',
  templateUrl: './region-main.component.html',
  styleUrls: ['./region-main.component.css']
})
export class RegionMainComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  //Common Variables
  errorMessage:string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Varaibles
  regions: Regions[];
  users:CUsers[];
  constructor(private snackBar: MatSnackBar, private dataService: RegionsService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'title', 'executiveDirectorTitle', 'executiveVPTitle', 'TILsSummary', 'insuranceSummary', 'actions'];
  dataSource: MatTableDataSource<Regions>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Regions>(this.regions);
    this.getInterfaces();
    this.getRegions();
  }
  getInterfaces():void{
    this.subs.sink = this.dataService.getInterface(this.user.id).subscribe({
      next: data => {
       this.users = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getRegions(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getRegions().subscribe({
      next: data => {
        this.regions = [...data];
        this.dataSource.data = [...this.regions];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  deleteRegion(reg: Regions) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        region: reg
      }
    });
    dialogRef.afterClosed().subscribe((result: Regions) => {
      if (result) {
        this.subs.sink = this.dataService.deleteRegion(result).subscribe({
          next: data => {
           let index = this.regions.findIndex(a=>a.regionId === reg.regionId);
           this.regions.splice(index,1);
           this.dataSource.data = [...this.regions];
           this.showNotification('snackbar-success', result.title + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  addRegion() {
    const dialogRef = this.dialog.open(RegionFormComponent, {
      width: '750px',
      data: {
        region: "",
        users:this.users,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:SaveApiData) => {
      if (result) {
        this.subs.sink = this.dataService.saveRegion(this.user.id,result).subscribe({
          next:data=>{       
            this.showNotification('snackbar-success', result.region.title+' has been added sucessfully', 'bottom', 'center');
            this.getRegions();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  viewRegion(reg:Regions){
    this.subs.sink = this.dataService.getSelectedRegionData(this.user.id, reg.regionId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(RegionFormComponent, {
          width: '750px',
          data: {
            region: reg,
            users:this.users,
            action: "view",
            selectedVps:[...data]
          },
        });
      },
      error:err=>{
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })

  }
  updateRegion(reg:Regions) {
    this.subs.sink = this.dataService.getSelectedRegionData(this.user.id, reg.regionId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(RegionFormComponent, {
          width: '750px',
          data: {
            region: reg,
            users:this.users,
            action: "edit",
            selectedVps:[...data]
          },
        });
        dialogRef.afterClosed().subscribe((result:SaveApiData) => {
          if (result) {
            this.subs.sink = this.dataService.saveRegion(this.user.id,result).subscribe({
              next:data=>{
               this.showNotification('snackbar-success', result.region.title+' has been added sucessfully', 'bottom', 'center');
               this.getRegions();
              },
              error:err=>{
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        });
      },
      error:err=>{
        this.errorMessage = err;
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
}
