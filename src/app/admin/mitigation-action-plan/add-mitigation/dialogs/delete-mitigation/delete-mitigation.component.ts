import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-mitigation',
  templateUrl: './delete-mitigation.component.html',
  styleUrls: ['./delete-mitigation.component.sass']
})
export class DeleteMitigationComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteMitigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
