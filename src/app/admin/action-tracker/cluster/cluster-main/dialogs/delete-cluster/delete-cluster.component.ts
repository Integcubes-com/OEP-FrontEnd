import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cluster',
  templateUrl: './delete-cluster.component.html',
  styleUrls: ['./delete-cluster.component.sass']
})
export class DeleteClusterComponent {


  constructor(public dialogRef: MatDialogRef<DeleteClusterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
