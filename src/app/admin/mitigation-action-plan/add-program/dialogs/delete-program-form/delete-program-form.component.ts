import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-program-form',
  templateUrl: './delete-program-form.component.html',
  styleUrls: ['./delete-program-form.component.sass']
})
export class DeleteProgramFormComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteProgramFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
