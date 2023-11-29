import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { SiteControlService } from './site-control.service';
import { User } from 'src/app/core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OMA_program } from '../add-program/program.model';
import { OMA_selectedSite, OM_SiteControl } from './site-control.model';
import { SiteControlFormComponent } from './dialog/site-control-form/site-control-form.component';

@Component({
  selector: 'app-site-control',
  templateUrl: './site-control.component.html',
  styleUrls: ['./site-control.component.sass']
})
export class SiteControlComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Varaibles 
  siteControl: OM_SiteControl[];
  //common variables
  isTableLoading: boolean;
  errorMessage:string;

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: SiteControlService, public dialog: MatDialog,) { super() }

  displayedColumns: string[] = ['id','regionTitle','siteTitle', 'programTitle','actions'];
  dataSource: MatTableDataSource<OM_SiteControl>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<OM_SiteControl>(this.siteControl);
    // this.getInterface();
    this.getSiteControl();
  }
  getInterface():void{
    // this.subs.sink = this.dataService.getTechnologies(this.user.id).subscribe({
    //   next: data => {
    //     this.allTechnologies = [...data];
    //   },
    //   error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    // })
  }
  getSiteControl(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getSiteControl(this.user.id).subscribe({
      next: data => {
        this.siteControl = [...data];
        this.dataSource.data = [...this.siteControl];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  viewSiteControl( siteControl: OM_SiteControl){
    this.subs.sink = this.dataService.getSelectedSiteControl(siteControl.siteId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(SiteControlFormComponent, {
          width: '750px',
          data: {
            siteControl:[...data],
            siteData:{...siteControl},
            action: "view",
          },
        });
      },
      error:err=>{
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }

  updateSiteControl( siteControl: OM_SiteControl){
    this.subs.sink = this.dataService.getSelectedSiteControl(siteControl.siteId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(SiteControlFormComponent, {
          width: '750px',
          data: {
            siteControl:[...data],
            siteData:{...siteControl},
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result:OMA_selectedSite[]) => {
          if (result) {
            this.subs.sink = this.dataService.saveSiteControl(this.user.id,siteControl.siteId,result).subscribe({
              next:data=>{
                this.showNotification('snackbar-success', siteControl.siteId +' has been updated sucessfully', 'bottom', 'center');
                this.getSiteControl();
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
