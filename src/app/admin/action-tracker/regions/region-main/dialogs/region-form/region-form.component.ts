import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Regions, SaveApiData } from '../../region.model';
import { CUsers } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.sass']
})
export class RegionFormComponent {
  apiData:SaveApiData={
    region: new Regions({}),
    userList: []
  }
  users:CUsers[];
  action: string;
  dialogTitle: string;
  region: Regions;
  view:boolean=false;
  regionForm: FormGroup;
  addOnBlur = true;
  userList:CUsers[];
  constructor
    (
      public dialogRef: MatDialogRef<RegionFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
    this.action = this.data.action;
    if (this.action == "add" ) {
      this.region = new Regions({});
      this.dialogTitle = "New Region";
      this.userList = []
    }
    else {
      this.region = {...this.data.region};
      this.dialogTitle = this.region.title;
      this.userList = [...this.data.selectedVps]
    }
    this.regionForm = this.createRegionForm();
    this.users = [...this.data.users];
    this.removeValidators();
  }
  removeValidators() {
    if(this.data.action == 'view'){
      for (const key in this.regionForm.controls) {
        this.regionForm.get(key).disable();
        this.regionForm.get(key).clearValidators();
        this.regionForm.get(key).updateValueAndValidity();
      }
    }
  }
  createRegionForm(): FormGroup {
    return this.fb.group({
      regionId: [this.region.regionId, [Validators.required]],
      title: [this.region.title, [Validators.required]],
      TILsSummary: [this.region.tiLsSummary],
      insuranceSummary: [this.region.insuranceSummary],
      executiveDirectorId:[this.region.executiveDirectorId, [Validators.required]],
      executiveVPId:[""],
    })
  }
  removeChip(value: any): void {
    const index = this.userList.indexOf(value);
    if (index >= 0) {
      this.userList.splice(index, 1);
    }
}
addChip(val: string) {
  if (val) {
      let u = this.users.find(a => a.userId == +val)
      this.userList.push(u);
      this.regionForm.patchValue({
        executiveVPId: ""
      })
  }
}
  submit() {
    if (this.regionForm.valid) {
      this.region.tiLsSummary = this.regionForm.value.TILsSummary;
      this.region.insuranceSummary = this.regionForm.value.insuranceSummary;
      this.region.title = this.regionForm.value.title;
      this.region.executiveDirectorId = this.regionForm.value.executiveDirectorId;
      this.region.executiveDirectorTitle = this.users.find(a=>a.userId ==  this.region.executiveDirectorId)?.userName
      this.apiData.region = {...this.region}
      this.apiData.userList = [...this.userList]
      this.dialogRef.close( this.apiData);
    }

  }
  onNoClick() {
    this.dialogRef.close();
  }


}
