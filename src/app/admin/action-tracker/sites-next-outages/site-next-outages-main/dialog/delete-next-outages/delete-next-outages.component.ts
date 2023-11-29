import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-next-outages',
  templateUrl: './delete-next-outages.component.html',
  styleUrls: ['./delete-next-outages.component.sass']
})
export class DeleteNextOutagesComponent {

  constructor(public dialogRef: MatDialogRef<DeleteNextOutagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
