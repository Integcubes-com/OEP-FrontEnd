import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserRole } from '../../role.model';
import { RoleService } from '../../role.service';

@Component({
  selector: 'app-role-trash',
  templateUrl: './role-trash.component.html',
  styleUrls: ['./role-trash.component.sass']
})
export class RoleTrashComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  isTableLoading: boolean;
  userRoles: UserRole[];
  errorMessage: string;
  trash: UserRole[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  constructor
    (
      private snackBar: MatSnackBar,
      private dataService: RoleService,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<RoleTrashComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    super();
  }
  ngOnInit(): void {
    this.isTableLoading = true;
    this.dataSource = new MatTableDataSource<UserRole>(this.userRoles);
    this.userRoles = [...this.data.userRoles];
    this.dataSource.data = [...this.userRoles];
    this.isTableLoading = false;
  }

  displayedColumns: string[] = ["id", "roleName", "roleDescription", "actions"];
  dataSource: MatTableDataSource<UserRole>;


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
  restore(role:UserRole) {
    this.subs.sink = this.dataService.restore(role,this.user.id).subscribe({
      next:data=>{
        let index = this.userRoles.findIndex(a=>a.roleId == role.roleId);
        this.userRoles.splice(index,1);
        this.dataSource.data = this.userRoles;
        this.showNotification('snackbar-success','User-Role restored sucessfully...','bottom','center')
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
     
    })
  }
  onNoClick() {
    this.dialogRef.close();
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
