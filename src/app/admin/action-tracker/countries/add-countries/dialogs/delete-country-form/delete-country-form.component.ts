import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-country-form',
  templateUrl: './delete-country-form.component.html',
  styleUrls: ['./delete-country-form.component.sass']
})
export class DeleteCountryFormComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteCountryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
