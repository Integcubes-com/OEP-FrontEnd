import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-phase',
  templateUrl: './delete-phase.component.html',
  styleUrls: ['./delete-phase.component.sass']
})
export class DeletePhaseComponent  {

  constructor(public dialogRef: MatDialogRef<DeletePhaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }


}
