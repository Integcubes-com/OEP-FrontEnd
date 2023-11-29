import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AddUserFormComponent } from './dialog/add-user-form/add-user-form.component';
import { DeleteUserComponent } from './dialog/delete-user/delete-user.component';
import { UserTrashComponent } from './dialog/user-trash/user-trash.component';
import { UFormSubmit, URole, USite, UTechnology, UUser } from './user.model';
import { UserService } from './user.service';
import { CRegions } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  regions:CRegions[];
  users: UUser[];
  roles: URole[];
  sites: USite[];
  technologys: UTechnology[];
  deletedUsers: UUser[];
  errorMessage:string;
  userData:UUser[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: UserService, public dialog: MatDialog) { super() }
  displayedColumns: string[] = ["id", "userName","email","phone","actions"];
  dataSource: MatTableDataSource<UUser>;
  isTableLoading: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<UUser>(this.users);
    this.getData();
  }
  getData(){
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getUser(this.user.id).subscribe({
      next: data => {
        this.users = [...data.users];
        this.userData = [...data.users];
        this.dataSource.data = [...this.users];
        this.roles = [...data.roles];
        this.sites = [...data.sites];
        this.technologys = [...data.technologys];
        this.regions = [...data.regions];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  deleteUser(user:UUser) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: {
        users:user
      },
    });
    dialogRef.afterClosed().subscribe((result: UUser) => {
      if(result){
        this.subs.sink = this.dataService.delete(result, this.user.id).subscribe({
          next:data=>{
            let index = this.users.findIndex(a=>a.userId == data.userId);
            this.users.splice(index, 1);
            this.dataSource.data = [...this.users];
            this.showNotification('snackbar-success','User-Role deleted sucessfully...','bottom','center')
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    })
  }
  updateUser(userInfo:UUser) {
    this.userData = this.users.filter(a=>a.userId != userInfo.userId)
    this.subs.sink = this.dataService.getInfo(this.user.id, userInfo).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddUserFormComponent, {
          width: '750px',
          data: {
            users: userInfo,
            regions: [...this.regions],
            roles: [...this.roles],
            selectedRoles:[...data.roles],
            sites: [...data.sites],
            technologys: [...data.technologys],
            userList: this.userData,
            action:"edit",
          },
        });
        dialogRef.afterClosed().subscribe((result: UFormSubmit) => {
          if(result){
            this.subs.sink = this.dataService.saveUser(this.user.id, result).subscribe({
              next:data=>{
                let index = this.users.findIndex(a=>a.userId === result.users.userId);
                this.users[index] = {...result.users};
                this.dataSource.data = [...this.users];
                this.showNotification('snackbar-success', result.users.userName+' has been updated sucessfully', 'bottom', 'center');
                
              },
              error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
            })
          }
        })
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  viewUser(userInfo:UUser) {
    this.userData = this.users.filter(a=>a.userId != userInfo.userId)
    this.subs.sink = this.dataService.getInfo(this.user.id, userInfo).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddUserFormComponent, {
          width: '750px',
          data: {
            users: userInfo,
            regions: [...this.regions],
            roles: [...this.roles],
            selectedRoles:[...data.roles],
            sites: [...data.sites],
            technologys: [...data.technologys],
            userList: this.userData,
            action:"edit",
            mode:"view"
          },
        });
        dialogRef.afterClosed().subscribe((result: UFormSubmit) => {

        })
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
  addUser() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '750px',
      data: {
        users: "",
        roles: this.roles,
        regions: [...this.regions],
        sites: [...this.sites],
        technologys: this.technologys,
        userList: this.users,
        action:"add",
      },
    });
    dialogRef.afterClosed().subscribe((result: UFormSubmit) => {
      if(result){
        this.subs.sink = this.dataService.saveUser(this.user.id, result).subscribe({
          next:data=>{
            this.users.unshift({...data});
            this.dataSource.data = [...this.users];
            this.showNotification('snackbar-success', result.users.userName+' has been added sucessfully', 'bottom', 'center');
          },
          error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
        })
      }
    })
  }
  openTrash() {
    this.subs.sink = this.dataService.getTrash(this.user.id).subscribe({
      next:data=>{
        this.deletedUsers = [...data];
        const dialogRef = this.dialog.open(UserTrashComponent, {
          width: '750px',
          data: {
            deletedUsers:this.deletedUsers
          },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          this.getData();
        })
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
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
