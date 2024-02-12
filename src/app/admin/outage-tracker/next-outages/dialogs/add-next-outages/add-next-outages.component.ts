import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { OT_IEquipments, OT_NextOutages, OT_SiteNextOutage } from '../../site-next-outages.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NextOutagesService } from '../../next-outages.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import * as moment from 'moment';

@Component({
  selector: 'app-add-next-outages',
  templateUrl: './add-next-outages.component.html',
  styleUrls: ['./add-next-outages.component.sass']
})
export class AddNextOutagesComponent extends UnsubscribeOnDestroyAdapter {

  sites: CSites[];
  nextOutages: OT_NextOutages[];
  siteNextOutages: OT_SiteNextOutage;
  dialogTitle: string;
  outageForm; FormGroup;
  equipments: OT_IEquipments[]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNextOutagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar, private dataService: NextOutagesService
  ) {
    super();
    if (this.data.action == 'add') {
      this.siteNextOutages = new OT_SiteNextOutage({});
      this.dialogTitle = "New Site Next Outage";
    }
    else if (this.data.action == 'edit' || this.data.action == 'view') {
      this.siteNextOutages = { ...this.data.siteNextOutage };
      this.dialogTitle = this.siteNextOutages.outageTitle;
    }
    this.sites = [...this.data.sites]
    this.equipments = [...this.data.equipments]
    this.nextOutages = [...this.data.nextOutages]
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
      snoId: [this.siteNextOutages.snoId, [Validators.required]],
      siteId: [this.siteNextOutages.siteId, [Validators.required]],
      equipmentId: [this.siteNextOutages.equipmentId, [Validators.required]],
      outageTypeId: [this.siteNextOutages.outageId, [Validators.required]],
      nextOutageDate: [this.siteNextOutages.nextOutageDate, [Validators.required]],
      outageDurationInDays:[this.siteNextOutages.outageDurationInDays, [Validators.required]]
    })
  }
  submit() {
    this.siteNextOutages.snoId = this.outageForm.value.snoId;
    this.siteNextOutages.siteId = this.outageForm.value.siteId;
    this.siteNextOutages.siteTitle = this.sites.find(a => a.siteId == this.siteNextOutages.siteId)?.siteTitle;
    this.siteNextOutages.outageId = this.outageForm.value.outageTypeId;
    this.siteNextOutages.outageTitle = this.nextOutages.find(a => a.outageId == this.siteNextOutages.outageId)?.outageTitle;
    this.siteNextOutages.nextOutageDate = moment.utc(this.outageForm.value.nextOutageDate).local().format('YYYY-MM-DDTHH:mm:SS.sss');
    this.siteNextOutages.equipmentId = this.outageForm.value.equipmentId;
    this.siteNextOutages.outageDurationInDays = this.outageForm.value.outageDurationInDays;
    this.siteNextOutages.unit = this.equipments.find(a => a.equipmentId == this.siteNextOutages?.equipmentId)?.unit;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  getEquipments(siteId: number) {

    this.subs.sink = this.dataService.getEquipments(+siteId).subscribe({
      next: data => {
        this.equipments = [...data];
   
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
