import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tils-form-delete',
  templateUrl: './tils-form-delete.component.html',
  styleUrls: ['./tils-form-delete.component.sass']
})
export class TilsFormDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<TilsFormDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
