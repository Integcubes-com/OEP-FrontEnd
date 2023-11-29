import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AGGroups } from '../../assign-group.model';

@Component({
  selector: 'app-assign-group-form',
  templateUrl: './assign-group-form.component.html',
  styleUrls: ['./assign-group-form.component.sass']
})
export class AssignGroupFormComponent  {
  dialogTitle:string = "Assign Groups"
  groups:AGGroups[];
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AssignGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.groups = [...this.data.groups]
   }
   onNoClick() {
    this.dialogRef.close();
  }


}
