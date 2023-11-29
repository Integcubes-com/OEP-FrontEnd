import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActionRolesService } from './action-roles.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OT_IActionOwner, OT_SaveActionRole } from '../outage-readiness/outage-readiness.model';
import { User } from 'src/app/core/models/user';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { CUsers } from 'src/app/shared/common-interface/common-interface';
import { DeleteActionRoleComponent } from './dialogs/delete-action-role/delete-action-role.component';
import { AddActionRoleFormComponent } from './dialogs/add-action-role-form/add-action-role-form.component';

@Component({
  selector: 'app-action-roles',
  templateUrl: './action-roles.component.html',
  styleUrls: ['./action-roles.component.sass']
})
export class ActionRolesComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  //Common Variables
  errorMessage:string;
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  //Varaibles
  actionOwner:OT_IActionOwner[]
  users:CUsers[]
  constructor(private snackBar: MatSnackBar, private dataService: ActionRolesService,private dataService2: CommonService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'actionOwnerTitle','userName', 'actions'];
  dataSource: MatTableDataSource<OT_IActionOwner>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<OT_IActionOwner>(this.actionOwner);
    this.getInterfaces();
    this.getActionOwners();
  }
  getInterfaces():void{
    this.subs.sink = this.dataService2.getUsers(this.user.id,-1,-1).subscribe({
      next: data => {
       this.users = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getActionOwners():void{
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionOwner(this.user.id).subscribe({
      next: data => {
       this.actionOwner = [...data];
       this.dataSource.data = [...this.actionOwner]
       this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  addRole(){
    const dialogRef = this.dialog.open(AddActionRoleFormComponent, {
      width: '600px',
      data: {
        action:"add",
        users:[...this.users]
      }
    });
    dialogRef.afterClosed().subscribe((result: OT_SaveActionRole) => {
      if (result) {
        this.subs.sink = this.dataService.saveRole(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.roles.actionOwnerTitle + ' has been saved sucessfully', 'bottom', 'center');
            this.getActionOwners();
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  updateRole(role:OT_IActionOwner){
    this.subs.sink = this.dataService.getSelectedUsers(this.user.id, role.actionOwnerId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddActionRoleFormComponent, {
          width: '600px',
          data: {
            action: "edit",
            users: [...this.users],
            selectedUsers: [...data],
            role:role
          }
        });
        dialogRef.afterClosed().subscribe((result:OT_SaveActionRole) => {
          if (result) {
            this.subs.sink = this.dataService.saveRole(this.user.id, result).subscribe({
              next: data => {
                this.showNotification('snackbar-success', result.roles.actionOwnerTitle + ' has been updated sucessfully', 'bottom', 'center');
                this.getActionOwners();
              },
              error: err => {
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        })
      },
      error:err=>{
        this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  viewRole(role:OT_IActionOwner){
    this.subs.sink = this.dataService.getSelectedUsers(this.user.id, role.actionOwnerId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddActionRoleFormComponent, {
          width: '600px',
          data: {
            action: "view",
            users: [...this.users],
            selectedUsers: [...data],
            role:role
          }
        });
      },
      error:err=>{
        this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
      }
    })  
  }
  deleteRole(role: OT_IActionOwner) {
    const dialogRef = this.dialog.open(DeleteActionRoleComponent, {
      data: {
        role: role
      }
    });
    dialogRef.afterClosed().subscribe((result: OT_IActionOwner) => {
      if (result) {
        this.subs.sink = this.dataService.deleteActionOwner(this.user.id, result).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.actionOwnerTitle + ' has been deleted sucessfully', 'bottom', 'center');
            this.getActionOwners();
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
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
