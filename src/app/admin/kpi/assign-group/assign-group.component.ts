import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AssignGroupService } from './assign-group.service';
import { CUsers } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { AssignGroupFormComponent } from './dialogs/assign-group-form/assign-group-form.component';
import { AGGroups } from './assign-group.model';

@Component({
  selector: 'app-assign-group',
  templateUrl: './assign-group.component.html',
  styleUrls: ['./assign-group.component.sass']
})
export class AssignGroupComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  users:CUsers[]
  //Common var
  isTableLoading: boolean;
  errorMessage:string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: AssignGroupService, private dataService2: CommonService, public dialog: MatDialog) { super() }
  displayedColumns: string[] = ["id","name", "userName","email","actions"];
  dataSource: MatTableDataSource<CUsers>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CUsers>(this.users);
    this.getUsers();
  }
  getUsers(){
    this.isTableLoading = true;
    this.subs.sink = this.dataService2.getUsers(this.user.id, -1, -1).subscribe({
      next:data=>{
        this.users = [...data];
        this.dataSource.data = [...this.users];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getGroups(user:CUsers){
    this.subs.sink = this.dataService.getAssignedGroups(this.user.id, user.userId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AssignGroupFormComponent, {
          width: '600px',
          data: {
            users: user,
            groups: [...data],
          },
        });
        dialogRef.afterClosed().subscribe((result: AGGroups[]) => {
          if(result){
            debugger;
            this.subs.sink = this.dataService.saveAssignedGroups(this.user.id, user.userId, result).subscribe({
              next:data=>{
                this.showNotification('snackbar-success',user.userName+' has been given access sucessfully', 'bottom', 'center');                
              },
              error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
            })
          }
        })
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
//Common Funaction
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
}
