import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pdf',
  templateUrl: './delete-pdf.component.html',
  styleUrls: ['./delete-pdf.component.sass']
})
export class DeletePdfComponent  {

  constructor(public dialogRef: MatDialogRef<DeletePdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
