import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-observation',
  templateUrl: './delete-observation.component.html',
  styleUrls: ['./delete-observation.component.sass']
})
export class DeleteObservationComponent {

  constructor(public dialogRef: MatDialogRef<DeleteObservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
}
