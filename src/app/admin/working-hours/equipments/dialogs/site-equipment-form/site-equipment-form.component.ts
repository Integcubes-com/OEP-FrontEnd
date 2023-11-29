import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { User } from 'src/app/core/models/user';
import { CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { SEUser, SiteEquipment, SEFleet } from 'src/app/admin/action-tracker/site-equipment/site-equipment-main/site-equipment.model';

@Component({
  selector: 'app-site-equipment-form',
  templateUrl: './site-equipment-form.component.html',
  styleUrls: ['./site-equipment-form.component.sass']
})
export class SiteEquipmentFormComponent  extends UnsubscribeOnDestroyAdapter{

  regions: CRegions[];
  sites: CSites[];
  apiUser: CUsers[];
  siteEquipmentForm:FormGroup;
    //Get data from browsers Local Storage
    user: User = JSON.parse(localStorage.getItem('currentUser'));
  dialogTitle:string;
  selectedUsers:SEUser[];
  equipment:SiteEquipment;
  view:Boolean=false;
  selectedSites:CSites[];
  fleet:SEFleet[];
  constructor
  (
    public dialogRef: MatDialogRef<SiteEquipmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: CommonService, 
    private snackBar: MatSnackBar,
  ) 
  {
    super();
    if (this.data.action == "edit") {
      this.equipment = {...this.data.siteEquipment};
      this.dialogTitle = this.equipment.model;
    }
    else if(this.data.action == "view"){
   
      this.equipment = {...this.data.siteEquipment};
      this.dialogTitle = this.equipment.model;
      this.view = true;

    }
    else {
      this.equipment = new SiteEquipment({});
      this.dialogTitle = "New Equipment"
    }
    this.regions=[...this.data.regions];
    this.sites=[...this.data.sites];
    this.fleet=[...this.data.fleet];
    this.apiUser=[...this.data.apiUser];
    this.selectedSites = [...this.sites];
    this.selectedUsers=[...this.apiUser];
    this.siteEquipmentForm = this.createEquipmentForm();
    this.removeValidators();
   }
  removeValidators() {
    if(this.view){
      for (const key in this.siteEquipmentForm.controls) {
        this.siteEquipmentForm.get(key).clearValidators();
        this.siteEquipmentForm.get(key).updateValueAndValidity();
      }
    }
  }
  getSites(event:number){
  if(event){
    let regionId = +event
    this.subs.sink = this.dataService.getSites(this.user.id,regionId, -1).subscribe({
      next:data=>{this.selectedSites=[...data]},
      error:err=>{this.showNotification('black', err, 'bottom', 'center');}
    })
  }
    
    else{
this.selectedSites = [...this.sites]
    }
  }
  getUsers(event:number){
  if(event){
    let siteId = +event
    this.subs.sink = this.dataService.getUsers(this.user.id, -1, siteId).subscribe({
      next:data=>{this.selectedUsers=[...data]},
      error:err=>{this.showNotification('black', err, 'bottom', 'center');}
    })
  }
  else{
    this.selectedUsers = [...this.apiUser]
  }

  }
  createEquipmentForm(): FormGroup {
    return this.fb.group({
      equipmentId: [this.equipment.equipmentId, [Validators.required]],
      regionId: [this.equipment.regionId, [Validators.required]],
      region: [this.equipment.regionTitle],
      siteId: [this.equipment.siteId, [Validators.required]],
      site: [this.equipment.siteTitle],
      model: [this.equipment.modelId, [Validators.required]],
      modelTitle: [this.equipment.model],
      unitSN: [this.equipment.unitSN, [Validators.required]],
      // nextOutage: [this.equipment.nextOutage, [Validators.required]],
      // outageType: [this.equipment.outageTypeId, [Validators.required]],
      // outageTypeTitle: [this.equipment.outageType],
      details: [this.equipment.details, [Validators.required]],
      responsible: [this.equipment.responsible, [Validators.required]],
      responsibleTitle: [this.equipment.responsibleName],
      unitCOD: [this.equipment.unitCOD, [Validators.required]],
      unit: [this.equipment.unit, [Validators.required]],
      
    })
  }
  submit() {
    if(this.siteEquipmentForm.valid){
      this.equipment.equipmentId = this.siteEquipmentForm.value.equipmentId;
      this.equipment.regionId= this.siteEquipmentForm.value.regionId;
      this.equipment.regionTitle = this.regions.find(a=>a.regionId == this.equipment.regionId).regionTitle;
      this.equipment.siteId= this.siteEquipmentForm.value.siteId;
      this.equipment.siteTitle = this.sites.find(a=>a.siteId == this.equipment.siteId).siteTitle;
      this.equipment.modelId= this.siteEquipmentForm.value.model;
      this.equipment.model= this.fleet.find(a=>a.fleetEquipId == this.equipment.modelId).title;
      this.equipment.unitSN= this.siteEquipmentForm.value.unitSN;
      // this.equipment.nextOutage= this.siteEquipmentForm.value.nextOutage;
      // this.equipment.outageTypeId= this.siteEquipmentForm.value.outageType;
      // this.equipment.outageType  = this.outageType.find(a=>a.outageTypeId == this.equipment.outageTypeId).title;
      this.equipment.details= this.siteEquipmentForm.value.details;
      this.equipment.responsible= this.siteEquipmentForm.value.responsible;
      this.equipment.unitCOD= this.siteEquipmentForm.value.unitCOD;
      this.equipment.unit= this.siteEquipmentForm.value.unit;
    
    }
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
