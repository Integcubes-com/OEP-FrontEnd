import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRegions, CUsers } from 'src/app/shared/common-interface/common-interface';
import { clusterAPIModel, clusterModel } from '../../cluster.model';

@Component({
  selector: 'app-add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrls: ['./add-cluster.component.sass']
})
export class AddClusterComponent  {

  region: CRegions[]
  cluster: clusterModel
  users: CUsers[]
  dialogTitle: string
  userList: CUsers[]
  clusterForm: FormGroup
  apiData: clusterAPIModel = {
    clusterId: null,
    clusterTitle: '',
    clusterCode: '',
    executiveDirectorId: null,
    executiveDirectorTitle: '',
    executiveVpName: '',
    executiveVps: [],
    regionId: null,
    regionTitle: ''
  }
  constructor(
    public dialogRef: MatDialogRef<AddClusterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.region = [...this.data?.region]
    this.users = [...this.data?.users]

    if (this.data.action == "add") {
      this.cluster = new clusterModel({})
      this.dialogTitle = "New cluster"
      this.userList = []
    }
    else {
      this.cluster = { ...this.data.cluster }
      this.dialogTitle = this.cluster.clusterTitle
      this.userList = [...this.data.selectedData]
    }
    this.clusterForm = this.buildForm()
    this.removeValidators()
  }
  buildForm(): FormGroup {
    return this.fb.group({
      clusterId: [this.cluster.clusterId, [Validators.required]],
      regionId: [this.cluster.regionId, [Validators.required]],
      clusterTitle: [this.cluster.clusterTitle, [Validators.required]],
      clusterCode: [this.cluster.clusterCode],
      executiveDirectorId: [this.cluster.executiveDirectorId, [Validators.required]],
      executiveDirectorTitle: [this.cluster.executiveDirectorTitle],
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
        this.clusterForm.patchValue({
          executiveVPId: ""
        })
    }
  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.clusterForm.controls) {
        this.clusterForm.get(key).clearValidators();
        this.clusterForm.get(key).disable();
        this.clusterForm.get(key).updateValueAndValidity();
      }
    }
  }
  submit() {
    if (this.clusterForm.valid) {
      this.apiData.clusterId = this.clusterForm.value.clusterId
      this.apiData.clusterCode = this.clusterForm.value.clusterCode
      this.apiData.clusterTitle = this.clusterForm.value.clusterTitle
      this.apiData.executiveDirectorId = this.clusterForm.value.executiveDirectorId
      this.apiData.executiveDirectorTitle = this.users.find(a=>a.userId ==  this.apiData.executiveDirectorId)?.userName
      this.apiData.regionId = this.clusterForm.value.regionId
      this.apiData.regionTitle = this.region.find(a=>a.regionId == this.apiData.regionId)?.regionTitle
      this.apiData.executiveVps = [...this.userList]
      debugger;
      this.dialogRef.close(this.apiData)
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }

}
