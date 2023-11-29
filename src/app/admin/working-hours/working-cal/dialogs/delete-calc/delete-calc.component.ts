import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-calc',
  templateUrl: './delete-calc.component.html',
  styleUrls: ['./delete-calc.component.sass']
})
export class DeleteCalcComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCalcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
