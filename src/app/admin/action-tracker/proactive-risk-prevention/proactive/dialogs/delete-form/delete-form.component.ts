import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.sass']
})
export class DeleteFormComponent {

  constructor(public dialogRef: MatDialogRef<DeleteFormComponent>,

  @Inject(MAT_DIALOG_DATA) public data: any,) { 
    this.data;
    debugger;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
