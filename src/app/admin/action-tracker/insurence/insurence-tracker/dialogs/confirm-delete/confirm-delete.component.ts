import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.sass']
})
export class ConfirmDeleteComponentAT {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponentAT>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
