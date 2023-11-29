import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OT_SiteNextOutage } from 'src/app/admin/outage-tracker/next-outages/site-next-outages.model';
import { NextOutagesService } from '../../../next-outages/next-outages.service';

@Component({
  selector: 'app-actual-outage-form',
  templateUrl: './actual-outage-form.component.html',
  styleUrls: ['./actual-outage-form.component.sass']
})
export class ActualOutageFormComponent  {


  siteNextOutages: OT_SiteNextOutage;
  dialogTitle: string;
  outageForm; FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActualOutageFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data.action == 'add') {
      this.siteNextOutages = new OT_SiteNextOutage({});
      this.dialogTitle = "New Site Next Outage";
    }
    else if (this.data.action == 'edit' || this.data.action == 'view') {
      this.siteNextOutages = { ...this.data.siteNextOutage };
      debugger;
      this.dialogTitle = this.siteNextOutages.outageTitle;
    }

    this.outageForm = this.buildform();
    this.removeValidators();
  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.outageForm.controls) {
        this.outageForm.get(key).disable();
        this.outageForm.get(key).clearValidators();
        this.outageForm.get(key).updateValueAndValidity();
      }
    }
  }
  buildform(): FormGroup {
    return this.fb.group({
      snoId: [this.siteNextOutages.snoId],
      siteId: [{ value: this.siteNextOutages.siteTitle, disabled: true }],
      equipmentId: [{ value: this.siteNextOutages.unit, disabled: true }],
      outageTypeId: [{ value: this.siteNextOutages.outageTitle, disabled: true }],
      nextOutageDate: [{ value: this.siteNextOutages.nextOutageDate, disabled: true }],
      runningHours:[{ value: this.siteNextOutages.runningHours, disabled: true }],
      outageDurationInDays:[{ value: this.siteNextOutages.outageDurationInDays, disabled: true }],
      actualStartDate:[this.siteNextOutages.actualStartDate],
      actualEndDate:[this.siteNextOutages.actualEndDate],
    })
  }
  submit() {
  this.siteNextOutages.actualStartDate = this.outageForm.value?.actualStartDate;
  this.siteNextOutages.actualEndDate = this.outageForm.value?.actualEndDate;
  }
  onNoClick() {
    this.dialogRef.close();
  }


}
