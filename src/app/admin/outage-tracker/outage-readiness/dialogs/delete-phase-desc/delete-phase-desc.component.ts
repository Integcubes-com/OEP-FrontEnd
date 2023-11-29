import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-phase-desc',
  templateUrl: './delete-phase-desc.component.html',
  styleUrls: ['./delete-phase-desc.component.sass']
})
export class DeletePhaseDescComponent  {

  constructor(public dialogRef: MatDialogRef<DeletePhaseDescComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 

    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
