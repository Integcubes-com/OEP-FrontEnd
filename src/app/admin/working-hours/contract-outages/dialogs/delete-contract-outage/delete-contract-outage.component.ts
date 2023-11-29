import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-contract-outage',
  templateUrl: './delete-contract-outage.component.html',
  styleUrls: ['./delete-contract-outage.component.sass']
})
export class DeleteContractOutageComponent {

  constructor(public dialogRef: MatDialogRef<DeleteContractOutageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
