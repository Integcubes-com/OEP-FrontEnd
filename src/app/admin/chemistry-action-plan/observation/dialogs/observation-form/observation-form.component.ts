import { Component, Inject, OnInit } from '@angular/core';
import { CAPDept, CAPObservation, CAPPriority, CAPRegion, CAPSites, CAPStatus, CAPUsers } from '../../observation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ObervationService } from '../../obervation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-observation-form',
  templateUrl: './observation-form.component.html',
  styleUrls: ['./observation-form.component.sass']
})
export class ObservationFormComponent  extends UnsubscribeOnDestroyAdapter{

  dialogTitle:string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  sites:CAPSites[];
  regions:CAPRegion[];
  observation:CAPObservation;
  depts: CAPDept[];
  prioritys: CAPPriority[];
  statuss: CAPStatus[];
  users: CAPUsers[];
  observationForm:FormGroup;
  constructor
    (
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ObservationFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
      private dataService: ObervationService, 
      private snackBar: MatSnackBar,
    ) {
      super();
      debugger;
    if (this.data.action === "edit" ) {
      this.observation = this.data.observation;
      this.dialogTitle = "Edit Observation";
    }
    else if (this.data.action === "add") {
      this.observation = new CAPObservation({})
      this.dialogTitle = "New Observation"
    }

    this.depts= [...this.data.depts];
    this.prioritys= [...this.data.prioritys];
    this.statuss= [...this.data.statuss];
    this.users= [...this.data.users];
    this.sites = [...this.data.sites];
    this.regions = [...this.data.regions];
    this.observationForm = this.buildFrom()
  }
  buildFrom():FormGroup{
    return this.fb.group({
      observationId: [this.observation.observationId, [Validators.required]],
      observationTitle : [this.observation.observationTitle, [Validators.required]],
      siteId :[this.observation.plantId, [Validators.required]],
      regionId: [this.observation.regionId, [Validators.required]],
      actionId: [this.observation.actionId, [Validators.required]],
      actionTitle: [this.observation.actionTitle, [Validators.required]],
      priorityId: [this.observation.priorityId, [Validators.required]],
      targetDate: [this.observation.targetDate, [Validators.required]],
      deptId: [this.observation.deptId, [Validators.required]],
      userId: [this.observation.userId, [Validators.required]],
      referenceNumber: [this.observation.referenceNumber],
      remarks: [this.observation.remarks],
      statusId: [this.observation.statusId],
      suggestion: [this.observation.suggestion],
      startDate: [this.observation.startDate],
    })
  }
  submit():void{
    this.observation.observationId = this.observationForm.value.observationId;
    this.observation.plantId = this.observationForm.value.siteId;
    this.observation.plantTitle = this.sites.find(a => a.siteId == this.observation.plantId).siteTitle;
    this.observation.observationTitle = this.observationForm.value.observationTitle;
    this.observation.regionId = this.observationForm.value.regionId;
    this.observation.regionTitle = this.regions.find(a => a.regionId == this.observation.regionId).regionTitle;
    this.observation.referenceNumber = this.observationForm.value.referenceNumber;
    this.observation.actionTitle = this.observationForm.value.actionTitle;
    this.observation.priorityId = this.observationForm.value.priorityId;
    this.observation.priorityTitle = this.prioritys.find(a => a.priorityId == this.observation.priorityId).priorityTitle
    this.observation.targetDate = this.observationForm.value.targetDate;
    this.observation.observationId = this.observation.observationId;
    this.observation.observationTitle = this.observation.observationTitle;
    this.observation.deptId = this.observationForm.value.deptId;
    this.observation.deptTitle = this.depts.find(a => a.deptId == this.observation.deptId).deptTitle;
    this.observation.actionTitle = this.observationForm.value.actionTitle;
    this.observation.userId = this.observationForm.value.userId;
    this.observation.userName = this.users.find(a => a.userId == this.observation.userId).userName;
    this.observation.remarks = this.observationForm.value.remarks;
    this.observation.statusId = this.observationForm.value.statusId;
    if(this.observation.statusId){
      this.observation.statusTitle = this.statuss.find(a=>a.statusId == this.observation.statusId).statusTitle;
    }
    this.observation.suggestion = this.observationForm.value.suggestion;
    this.observation.startDate = this.observationForm.value.startDate;
  }

  getSites(event:number){
    debugger;
    let regionId = +event
    this.subs.sink = this.dataService.getSites(event, this.user.id).subscribe({
      next:data=>{this.sites=[...data]},
      error:err=>{this.showNotification('black', err, 'bottom', 'center');}
    })
  }
  //Common Method
  onNoClick():void{
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
