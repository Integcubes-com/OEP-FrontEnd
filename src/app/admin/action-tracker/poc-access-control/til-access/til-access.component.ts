import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { InsuranceAccessFormComponent, InsuranceAccessObj } from '../insurance-access/dialogs/insurance-access-form/insurance-access-form.component';
import { PocAccessService } from '../poc-access.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-til-access',
  templateUrl: './til-access.component.html',
  styleUrls: ['./til-access.component.sass']
})
export class TilAccessComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Common Variables
  errorMessage: string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  sites: CSites[];
  constructor(private snackBar: MatSnackBar, private dataService2: CommonService, private dataService:PocAccessService,public dialog: MatDialog) { super() }
  displayedColumns: string[] = ['id', 'regionTitle', 'siteTitle', 'actions'];
  dataSource: MatTableDataSource<CSites>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CSites>(this.sites);
    this.getSites();
  }
  getSites() {
    this.subs.sink = this.dataService.getTilSites(this.user.id).subscribe({
      next: data => {
        this.sites = [...data];
        this.dataSource.data = [...this.sites]
      },
      error: err => {
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      },
    })
  }
  getUsers(site:CSites) {
    this.subs.sink = this.dataService.getTILUsersData(this.user.id, site.siteId).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(InsuranceAccessFormComponent, {
          width: '750px',
          data: {
            users:[...data.allUser],
            selectedUsers:[...data.selectedUser],
            site: {...site}
          },
        });
        dialogRef.afterClosed().subscribe((result:InsuranceAccessObj) => {
          if (result) {
            this.subs.sink = this.dataService.saveTILUsersData(this.user.id, result).subscribe({
              next:data=>{
               this.showNotification('snackbar-success', result.siteTitle+' has been saved sucessfully', 'bottom', 'center');
               this.getSites();
              },
              error:err=>{
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        });
      },
      error: err => {
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      },
    })
  }

  //Common Functions
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
