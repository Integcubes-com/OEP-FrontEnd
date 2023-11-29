import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-til-action',
  templateUrl: './delete-til-action.component.html',
  styleUrls: ['./delete-til-action.component.sass']
})
export class DeleteTilActionComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTilActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }


}
