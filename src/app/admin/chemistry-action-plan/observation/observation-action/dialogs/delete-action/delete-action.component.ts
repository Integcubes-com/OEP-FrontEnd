import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.sass']
})
export class DeleteActionComponent{

  constructor(public dialogRef: MatDialogRef<DeleteActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
