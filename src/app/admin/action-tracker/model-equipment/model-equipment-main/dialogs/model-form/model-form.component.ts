import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteEquipment } from 'src/app/admin/action-tracker/site-equipment/site-equipment-main/site-equipment.model';
import { ModelEquipment, SESiteEquipmentOME, SESiteEquipmentType } from '../../model.type';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.sass']
})
export class ModelFormComponent  {
  form:FormGroup;
  dialogTitle:string='';
  model:ModelEquipment;
  oem:SESiteEquipmentOME[]=[];
type:SESiteEquipmentType[]=[]
  constructor
  (
    public dialogRef: MatDialogRef<ModelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) 
  {
    this.model = this.data.model;
    this.dialogTitle = this.model.title?this.model.title:'New Model Equipment';
    this.oem = this.data.oem;
    this.type = this.data.type;
    this.form = this.createEquipmentForm();
    this.removeValidators();
  }
  removeValidators() {
    if(this.data.action == 'view'){
      for (const key in this.form.controls) {
        this.form.get(key).clearValidators();
        this.form.get(key).updateValueAndValidity();
      }
    }
  }


  createEquipmentForm(): FormGroup {
    return this.fb.group({
      fleetEquipId: [this.model.fleetEquipId, [Validators.required]],
      title: [this.model.title, [Validators.required]],
      oemId: [this.model.oemId, [Validators.required]],
      equipmentTypeId: [this.model.equipmentTypeId, [Validators.required]],
      
    })
  }
  submit() {
    if(this.form.valid){
      this.model = {...this.form.value};
      this.dialogRef.close(this.model)
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }


}
