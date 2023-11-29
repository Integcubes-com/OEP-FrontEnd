import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CAPSites, CAPRegion, CAPObservation } from '../../../observation/observation.model';
import { User } from 'src/app/core/models/user';
import { CAPLatestStatus, CAPModel, CAPStatusll } from '../../latest-status.model';

@Component({
  selector: 'app-add-latest-status',
  templateUrl: './add-latest-status.component.html',
  styleUrls: ['./add-latest-status.component.sass']
})
export class AddLatestStatusComponent {

  dialogTitle:string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  //Variables
  latestStatus:CAPLatestStatus;
  models:CAPModel[];
  status:CAPStatusll[];
sites:CAPSites[];
  observationForm:FormGroup;
  constructor
    (
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddLatestStatusComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
    ) {
    if (this.data.action === "edit" ) {
      this.latestStatus = this.data.latestStatus;
      this.dialogTitle = "Edit Status";
    }
    else if (this.data.action === "add") {
      this.latestStatus = new CAPLatestStatus({})
      this.dialogTitle = "New Status"
    }
    this.models = [...this.data.models];
    this.status = [...this.data.status];
    this.sites = [...this.data.sites];
    this.observationForm = this.buildFrom()
  }
  buildFrom():FormGroup{
    return this.fb.group({
      updateId: [this.latestStatus.updateId, [Validators.required]],
      siteId : [this.latestStatus.siteId, [Validators.required]],
      modelId :[this.latestStatus.modelId, [Validators.required]],
      target: [this.latestStatus.target, [Validators.required]],
      liveApplication: [this.latestStatus.liveApplication, [Validators.required]],
      remarks: [this.latestStatus.remarks, [Validators.required]],
    })
  }
  submit():void{
    this.latestStatus.updateId = this.observationForm.value.updateId;
    this.latestStatus.siteId = this.observationForm.value.siteId;
    this.latestStatus.siteTitle = this.sites.find(a=>a.siteId == this.latestStatus.siteId).siteTitle
    this.latestStatus.modelId = this.observationForm.value.modelId;
    this.latestStatus.modelStatus = this.models.find(a=>a.modelId == this.latestStatus.modelId).status
    this.latestStatus.liveApplication = this.observationForm.value.liveApplication;
    this.latestStatus.remarks = this.observationForm.value.remarks;
    this.latestStatus.target = this.observationForm.value.target;
    // this.latestStatus.statusId = this.observationForm.value.statusId;
    // this.latestStatus.status = this.status.find(a=>a.lusId == this.latestStatus.statusId).status;
    // this.latestStatus.score = this.status.find(a=>a.lusId == this.latestStatus.statusId).score;
  

  }


  //Common Method
  onNoClick():void{
    this.dialogRef.close();
  }


}
