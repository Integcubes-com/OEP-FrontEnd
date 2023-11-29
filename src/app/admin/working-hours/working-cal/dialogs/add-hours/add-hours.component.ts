import { Component, Inject } from '@angular/core';
import { CEquipment, CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { WorkingHourModel } from '../../working-cal.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { WorkingCalService } from '../../working-cal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/shared/common-service/common.service';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.sass']
})
export class AddHoursComponent extends UnsubscribeOnDestroyAdapter{

  //Variables
  workingHoursUnit: WorkingHourModel;
  regions: CRegions[];
  sites: CSites[];
  units: CEquipment[];
  workingHourForm :FormGroup;
  //Common
  dialogTitle: string;

  constructor
    (
      public dialogRef: MatDialogRef<AddHoursComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private dataService: WorkingCalService,
      private snackBar: MatSnackBar,
      private dataService2: CommonService
    ) {
      super()
      this.regions=[...this.data.regions];
      this.sites=[...this.data.sites];
      this.units=[...this.data.units];
    if (this.data.action == "add") {
      this.dialogTitle = "New Starting Hours"
      this.workingHoursUnit = new WorkingHourModel({});
    }
   else{
   
    this.workingHoursUnit = {...this.data.workingHours};
    this.dialogTitle = this.workingHoursUnit.siteTitle;
   }
   this.workingHourForm = this.createForm();
    if (this.data.action == "view") {
      this.removeValidators();
    }
  }
  removeValidators() {
    if (this.data.action == 'view') {
      for (const key in this.workingHourForm.controls) {
        this.workingHourForm.get(key).disable();
        this.workingHourForm.get(key).clearValidators();
        this.workingHourForm.get(key).updateValueAndValidity();
      }
    }
  }
  
  createForm(): FormGroup {
    return this.fb.group({
      regionId: [this.workingHoursUnit.regionId, [Validators.required]],
      siteId: [this.workingHoursUnit.siteId, [Validators.required]],
      equipmentId: [this.workingHoursUnit.equipmentId, [Validators.required]],
      startingDate: [this.workingHoursUnit.startDate, [Validators.required]],
      startingHours: [this.workingHoursUnit.startHours, [Validators.required]],
    })
  }

  submit() {
    if (this.workingHourForm.valid) {
      this.workingHoursUnit.regionId = this.workingHourForm.value.regionId;
      this.workingHoursUnit.regionTitle = this.regions.find(a=>a.regionId == this.workingHoursUnit.regionId).regionTitle
      this.workingHoursUnit.siteId = this.workingHourForm.value.siteId;
      this.workingHoursUnit.siteTitle = this.sites.find(a=>a.siteId == this.workingHoursUnit.siteId).siteTitle
      this.workingHoursUnit.equipmentId = this.workingHourForm.value.equipmentId;
      this.workingHoursUnit.unit = this.units.find(a=>a.equipmentId == this.workingHoursUnit.equipmentId).unit
      this.workingHoursUnit.startDate = this.workingHourForm.value.startingDate;
      this.workingHoursUnit.startHours = +this.workingHourForm.value.startingHours;
      this.dialogRef.close(this.workingHoursUnit);
    }

  }
  onNoClick() {
    this.dialogRef.close();
  }
  //Fns
  getEquipments(siteId: number) {
    this.subs.sink = this.dataService.getEquipments(+siteId).subscribe({
      next: data => {
        this.units = [...data];
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getSites(regionId: number) {
    this.subs.sink = this.dataService2.getSites(-1, +regionId,-1).subscribe({
      next: data => {
        this.sites = [...data];
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
