import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-copy-alert',
  templateUrl: './copy-alert.component.html',
  styleUrls: ['./copy-alert.component.sass']
})
export class CopyAlertComponent  {

  constructor(
    public dialogRef: MatDialogRef<CopyAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
