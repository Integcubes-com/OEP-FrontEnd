import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CCluster, CRegions, CUsers } from 'src/app/shared/common-interface/common-interface';
import { CountriesModel, CountryApiData } from '../../add-country.model';

@Component({
  selector: 'app-add-country-form',
  templateUrl: './add-country-form.component.html',
  styleUrls: ['./add-country-form.component.sass']
})
export class AddCountryFormComponent {

  //Varaible
  region: CRegions[]
  clusters:CCluster[];
  country: CountriesModel
  users: CUsers[]
  dialogTitle: string
  userList: CUsers[]
  countryForm: FormGroup
  apiData: CountryApiData = {
    country: new CountriesModel({}),
    executiveVp: []
  }
  constructor(
    public dialogRef: MatDialogRef<AddCountryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.region = [...this.data?.region]
    this.users = [...this.data?.users]
    this.clusters = [...this.data.cluster]

    if (this.data.action == "add") {
      this.country = new CountriesModel({})
      this.dialogTitle = "New Country"
      this.userList = []
    }
    else {
      this.country = { ...this.data.country }
      this.dialogTitle = this.country.countryTitle
      this.userList = [...this.data.selectedData]
    }
    this.countryForm = this.buildForm()
    this.removeValidators()
  }
  buildForm(): FormGroup {
    return this.fb.group({
      countryId: [this.country.countryId, [Validators.required]],
      // clusterId: [this.country.clustedId, [Validators.required]],
      regionId: [this.country.regionId, [Validators.required]],
      countryTitle: [this.country.countryTitle, [Validators.required]],
      countryCode: [this.country.countryCode],
      executiveDirectorId: [this.country.executiveDirectorId, [Validators.required]],
      executiveDirectorTitle: [this.country.executiveDirectorTitle],
      executiveVPId: [""],
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
        this.countryForm.patchValue({
          executiveVPId: ""
        })
    }
  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.countryForm.controls) {
        this.countryForm.get(key).clearValidators();
        this.countryForm.get(key).disable();
        this.countryForm.get(key).updateValueAndValidity();
      }
    }
  }
  submit() {
    if (this.countryForm.valid) {
      this.country.countryCode = this.countryForm.value.countryCode
      this.country.countryTitle = this.countryForm.value.countryTitle
      this.country.executiveDirectorId = this.countryForm.value.executiveDirectorId
      this.country.executiveDirectorTitle = this.users.find(a=>a.userId == this.country.executiveDirectorId ).userName
      this.country.regionId = this.countryForm.value.regionId
      this.country.regionTitle = this.region.find(a=>a.regionId == this.country.regionId).regionTitle
      // this.country.clustedId = this.countryForm.value.clusterId
      // this.country.clusterTitle = this.clusters.find(a=>a.clusterId ==  this.country.clustedId).clusterTitle
      this.apiData.country = {...this.country}
      this.apiData.executiveVp = [...this.userList]
      this.dialogRef.close(this.apiData)
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
