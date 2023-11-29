import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TilsFormDeleteComponent } from '../../../add-tils/dialog/tils-form-delete/tils-form-delete.component';

@Component({
  selector: 'app-til-tracker-delete',
  templateUrl: './til-tracker-delete.component.html',
  styleUrls: ['./til-tracker-delete.component.sass']
})
export class TilTrackerDeleteComponent  {

  constructor(
    public dialogRef: MatDialogRef<TilsFormDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
