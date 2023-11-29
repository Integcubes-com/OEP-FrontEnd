import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { RoleDeleteComponent } from './dialog/role-delete/role-delete.component';
import { RoleFormComponent } from './dialog/role-form/role-form.component';
import { RoleTrashComponent } from './dialog/role-trash/role-trash.component';
import { URMenu, USubmitData, UserRole } from './role.model';
import { RoleService } from './role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  userRoles:UserRole[];
  errorMessage:string;
  trash:UserRole[];

  menus:URMenu[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private snackBar: MatSnackBar, private dataService: RoleService, public dialog: MatDialog) { super() }
  
  displayedColumns: string[] = ["id", "roleName","roleDescription","actions"];
  dataSource: MatTableDataSource<UserRole>;
  isTableLoading: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<UserRole>(this.userRoles);
    this.getData();
  }
  getData(){
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getUserRole(this.user.id).subscribe({
      next: data => {
        this.userRoles = [...data.userRole];
        this.menus = [...data.menus];
        this.dataSource.data = [...this.userRoles];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openTrash(){
    this.subs.sink = this.dataService.getTrash(this.user.id).subscribe({
      next:data=>{
        this.trash=[...data]
        const dialogRef = this.dialog.open(RoleTrashComponent, {
          width: '750px',
          data: {
            userRoles:this.trash
          },
        });
        dialogRef.afterClosed().subscribe((result: UserRole) => {
          this.getData();
        })
      }
    })
  }
  viewRole(role: UserRole){
    this.subs.sink = this.dataService.getEditData(role, this.user.id).subscribe({
      next: data => {
        debugger;
        const dialogRef = this.dialog.open(RoleFormComponent, {
          width: '750px',
          data: {
            userRoles: role,
            menus: [...data],
            action: "view"
          },
        });
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })  
  }
  updateRole(role: UserRole) {
    this.subs.sink = this.dataService.getEditData(role, this.user.id).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(RoleFormComponent, {
          width: '750px',
          data: {
            userRoles: role,
            menus: [...data],
            action: "edit"
          },
        });
        dialogRef.afterClosed().subscribe((result: USubmitData) => {
          if (result) {
            this.subs.sink = this.dataService.save(result, this.user.id).subscribe({
              next: data => {
                // let index = this.userRoles.findIndex(a=>a.roleId === result.userRole.roleId);
                // this.userRoles[index] = {...result.userRole};
                // this.dataSource.data = [...this.userRoles];
                this.getData();
                this.showNotification('snackbar-success', result.userRole.roleName+' has been updated sucessfully', 'bottom', 'center');
              },
              error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
            })
          }
        })
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  addRole(){
    const dialogRef = this.dialog.open(RoleFormComponent, {
      width: '750px',
      data: {
        userRoles:"",
        menus:this.menus,
        action:"add"
      },
    });
    dialogRef.afterClosed().subscribe((result: USubmitData) => {
      if(result){
        this.subs.sink = this.dataService.save(result, this.user.id).subscribe({
          next:data=>{
            // this.userRoles.unshift({...result.userRole});
            // this.dataSource.data = [...this.userRoles];
            this.getData();
            this.showNotification('snackbar-success', result.userRole.roleName+' has been added sucessfully', 'bottom', 'center');
          },
          error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
        })
      }
    })
  }
  deleteRole(role:UserRole){
    const dialogRef = this.dialog.open(RoleDeleteComponent, {
      data: {
        userRoles:role
      },
    });
    dialogRef.afterClosed().subscribe((result: UserRole) => {
      if(result){
        this.subs.sink = this.dataService.delete(result, this.user.id).subscribe({
          next:data=>{
            // let index = this.userRoles.findIndex(a=>a.roleId == data.roleId);
            // this.userRoles.splice(index, 1);
            // this.dataSource.data = [...this.userRoles];
            this.getData();
            this.showNotification('snackbar-success','User-Role deleted sucessfully...','bottom','center')
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
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
}
