import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProgramFormComponent } from 'src/app/admin/mitigation-action-plan/add-program/dialogs/add-program-form/add-program-form.component';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { NextOutages, SiteNextOutage } from '../../site-next-outages.model';
import { OT_IEquipments } from 'src/app/admin/outage-tracker/next-outages/site-next-outages.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SitesNextOutagesService } from '../../sites-next-outages.service';

@Component({
  selector: 'app-add-next-ouatge',
  templateUrl: './add-next-ouatge.component.html',
  styleUrls: ['./add-next-ouatge.component.sass']
})
export class AddNextOuatgeComponent extends UnsubscribeOnDestroyAdapter{
  equipments:OT_IEquipments[]
  sites: CSites[];
  nextOutages: NextOutages[];
  siteNextOutages: SiteNextOutage;
  dialogTitle:string;
  outageForm;FormGroup;
  constructor(
    private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddProgramFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private snackBar: MatSnackBar,
      private dataService: SitesNextOutagesService,
  ) { 
super();
    if (this.data.action == 'add') {
      this.siteNextOutages = new SiteNextOutage({});
      this.dialogTitle = "New Site Next Outage";
    }
    else if (this.data.action == 'edit' || this.data.action == 'view') {
      this.siteNextOutages = {...this.data.siteNextOutage};
      this.dialogTitle = this.siteNextOutages.outageTitle;
      if(this.siteNextOutages.siteId){
        this.getEquipments(this.siteNextOutages.siteId)
      }
    }
    this.sites=[...this.data?.sites]
    this.nextOutages=[...this.data?.nextOutages]
    this.equipments = [...this.data?.equipments]
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
  getEquipments(siteId:number){
    this.subs.sink = this.dataService.getEquipments(siteId).subscribe({
      next: data => {
        this.equipments = [...data];
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  buildform():FormGroup{
    return this.fb.group({
      snoId: [this.siteNextOutages.snoId, [Validators.required]],
      siteId: [this.siteNextOutages.siteId, [Validators.required]],
      outageTypeId: [this.siteNextOutages.outageTypeId, [Validators.required]],
      nextOutageDate: [this.siteNextOutages.nextOutageDate, [Validators.required]],
      equipmentId:[this.siteNextOutages.equipmentId, [Validators.required]]
    })
  }
  submit() {
    this.siteNextOutages.snoId = this.outageForm.value.snoId;
    this.siteNextOutages.siteId = this.outageForm.value.siteId;
    this.siteNextOutages.siteTitle = this.sites.find(a=>a.siteId == this.siteNextOutages.siteId)?.siteTitle;
    this.siteNextOutages.outageTypeId = this.outageForm.value.outageTypeId;
    this.siteNextOutages.outageTitle = this.nextOutages.find(a=>a.outageTypeId == this.siteNextOutages.outageTypeId)?.outageTitle;
    this.siteNextOutages.outageLevel = this.nextOutages.find(a=>a.outageTypeId == this.siteNextOutages.outageTypeId)?.outageLevel;
    this.siteNextOutages.nextOutageDate = this.outageForm.value.nextOutageDate;
    this.siteNextOutages.equipmentId =  this.outageForm.value.equipmentId;
    this.siteNextOutages.unit = this.equipments.find(a=>a.equipmentId == this.siteNextOutages.equipmentId).unit;
  }
  onNoClick() {
    this.dialogRef.close();
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
