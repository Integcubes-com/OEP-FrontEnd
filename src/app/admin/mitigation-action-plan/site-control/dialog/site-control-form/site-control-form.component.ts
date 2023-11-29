import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OMA_selectedSite, OM_SiteControl } from '../../site-control.model';

@Component({
  selector: 'app-site-control-form',
  templateUrl: './site-control-form.component.html',
  styleUrls: ['./site-control-form.component.sass']
})
export class SiteControlFormComponent {
  siteData: OM_SiteControl;
  siteControl:OMA_selectedSite[];
  dialogTitle:string;
  constructor(
    public dialogRef: MatDialogRef<SiteControlFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.siteControl = [...this.data.siteControl];
    this.siteData = {...this.data.siteData};
    this.dialogTitle = this.siteData.siteTitle;

  }

  submit() {
    this.dialogRef.close( this.siteControl);
  }
  onNoClick() {
    this.dialogRef.close();
  }

}
