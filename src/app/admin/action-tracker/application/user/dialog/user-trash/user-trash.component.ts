import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UUser } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-trash',
  templateUrl: './user-trash.component.html',
  styleUrls: ['./user-trash.component.sass']
})
export class UserTrashComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  isTableLoading: boolean;
  deletedUsers: UUser[];
  errorMessage: string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  displayedColumns: string[] = ["id", "userName","email","phone","actions"];
  dataSource: MatTableDataSource<UUser>;
  constructor
    (
      private snackBar: MatSnackBar,
      private dataService: UserService,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<UserTrashComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    super();
  }
  ngOnInit(): void {
    this.isTableLoading = true;
    this.dataSource = new MatTableDataSource<UUser>(this.deletedUsers);
    this.deletedUsers = [...this.data.deletedUsers];
    this.dataSource.data = [...this.deletedUsers];
    this.isTableLoading = false;
  }

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
  restore(role:UUser) {
    this.subs.sink = this.dataService.restore(role,this.user.id).subscribe({
      next:data=>{
        let index = this.deletedUsers.findIndex(a=>a.userId == role.userId);
        this.deletedUsers.splice(index,1);
        this.dataSource.data = this.deletedUsers;
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
