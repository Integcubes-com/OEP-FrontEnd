import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ObervationService } from '../../../obervation.service';
import { CAPAction, CAPDept, CAPPriority, CAPStatus, CAPUsers, CAPObs, CAPObservation } from '../../../observation.model';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.sass']
})
export class ActionFormComponent extends UnsubscribeOnDestroyAdapter {

  dialogTitle: string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  actionData: CAPAction;
  depts: CAPDept[];
  prioritys: CAPPriority[];
  statuss: CAPStatus[];
  users: CAPUsers[];
  observation: CAPObs;
  actionForm: FormGroup;
  actionEndForm: FormGroup;
  constructor
    (
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ActionFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
      private dataService: ObervationService,
      private snackBar: MatSnackBar,
    ) {
    super();

    if (this.data.action === "edit" ) {
      this.actionData = this.data.actionData;
      this.dialogTitle = this.actionData.referenceNumber;
    }
    else if (this.data.action === "add") {
      this.actionData = new CAPAction({})
      this.dialogTitle = "New Action"
    }
    else if (this.data.action === "action" || this.data.action === "view") {
      this.actionData = this.data.actionData;
      this.dialogTitle = this.actionData.referenceNumber;
    }
    this.depts = this.data.depts;
    this.prioritys = this.data.prioritys;
    this.statuss = this.data.statuss;
    this.users = this.data.users;
    this.observation = this.data.observation;
    this.actionForm = this.buildFrom()
    if (this.data.action === 'action') {
      this.actionForm.get('observationId').clearValidators();
      this.actionForm.get('actionId').clearValidators();
      this.actionForm.get('actionTitle').disable();
      this.actionForm.get('actionTitle').clearValidators();
      this.actionForm.get('priorityId').disable();
      this.actionForm.get('priorityId').clearValidators();
      this.actionForm.get('targetDate').disable();
      this.actionForm.get('targetDate').clearValidators();
      this.actionForm.get('deptId').disable();
      this.actionForm.get('deptId').clearValidators();
      this.actionForm.get('userId').disable();
      this.actionForm.get('userId').clearValidators();
      this.actionForm.get('referenceNumber').disable();
      this.actionForm.get('referenceNumber').clearValidators();;
      this.actionForm.get('statusId').setValidators(Validators.required);
      this.actionForm.updateValueAndValidity();
    }

    this.removeValidators();
  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.actionForm.controls) {
        this.actionForm.get(key).disable();
        this.actionForm.get(key).clearValidators();
        this.actionForm.get(key).updateValueAndValidity();
      }
    }
  }
  buildFrom(): FormGroup {
    return this.fb.group({
      
      observationId: [this.observation.observationId, [Validators.required]],
      actionId: [this.actionData.actionId, [Validators.required]],
      actionTitle: [this.actionData.actionTitle, [Validators.required]],
      priorityId: [this.actionData.priorityId, [Validators.required]],
      targetDate: [this.actionData.targetDate, [Validators.required]],
      deptId: [this.actionData.deptId, [Validators.required]],
      userId: [this.actionData.userId, [Validators.required]],
      referenceNumber: [this.actionData.referenceNumber, [Validators.required, Validators.maxLength(20)]],
      remarks: [this.actionData.remarks],
      statusId: [this.actionData.statusId],
      suggestion: [this.actionData.suggestion],
      startDate: [this.actionData.startDate],

    })
  }
  submit(): void {
    if (this.data.action === "action") {
      this.actionData.remarks = this.actionForm.value.remarks;
      this.actionData.statusId = this.actionForm.value.statusId;
      this.actionData.statusTitle = this.statuss.find(a => a.statusId == this.actionData.statusId).statusTitle;
      this.actionData.suggestion = this.actionForm.value.suggestion;
      this.actionData.startDate = this.actionForm.value.startDate;
    }
    else {
      this.actionData.referenceNumber = this.actionForm.value.referenceNumber;
      this.actionData.actionTitle = this.actionForm.value.actionTitle;
      this.actionData.priorityId = this.actionForm.value.priorityId;
      this.actionData.priorityTitle = this.prioritys.find(a => a.priorityId == this.actionData.priorityId).priorityTitle
      this.actionData.targetDate = this.actionForm.value.targetDate;
      this.actionData.observationId = this.observation.observationId;
      this.actionData.observationTitle = this.observation.observationTitle;
      this.actionData.deptId = this.actionForm.value.deptId;
      this.actionData.deptTitle = this.depts.find(a => a.deptId == this.actionData.deptId).deptTitle;
      this.actionData.actionTitle = this.actionForm.value.actionTitle;
      this.actionData.userId = this.actionForm.value.userId;
      this.actionData.userName = this.users.find(a => a.userId == this.actionData.userId).userName;
    }
  }

  // getSites(event:number){
  //   debugger;
  //   let regionId = +event
  //   this.subs.sink = this.dataService.getSites(event, this.user.id).subscribe({
  //     next:data=>{this.sites=[...data]},
  //     error:err=>{this.showNotification('black', err, 'bottom', 'center');}
  //   })
  // }
  //Common Method
  onNoClick(): void {
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
