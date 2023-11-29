import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-latest-status',
  templateUrl: './delete-latest-status.component.html',
  styleUrls: ['./delete-latest-status.component.sass']
})
export class DeleteLatestStatusComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteLatestStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
