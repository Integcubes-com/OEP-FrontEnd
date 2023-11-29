import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TILs } from '../../../add-tils/add-tils.model';
import { TASubmitObj, TilActionPackage, TAPEquipment, TAPPriority, TAPUser, TAPBudgetSource, TAPReviewStatus, TAPActionClosure, TAPOutage } from '../../tils-tracker-assignment.model';

@Component({
  selector: 'app-view-action-package',
  templateUrl: './view-action-package.component.html',
  styleUrls: ['./view-action-package.component.sass']
})
export class ViewActionPackageComponent {

  dialogTitle: string = '';

  actionForm: FormGroup;

  tils: TILs[];
  submitObject: TASubmitObj = {
    action: new TilActionPackage({}),
    // user: [],
    equipment: []
  }
  userList: any[];
  actionPackage: TilActionPackage;
  equipments: TAPEquipment[]
  prioritys: TAPPriority[]
  apiUsers: TAPUser[]
  budgetSources: TAPBudgetSource[]
  reviewStatuss: TAPReviewStatus[]
  actionClosure: TAPActionClosure[]
  outages: TAPOutage[]
  constructor
    (
      public dialogRef: MatDialogRef<ViewActionPackageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {

    if (this.data.action == "edit") {
      this.dialogTitle = this.data.actionPacakage.actionTitle;
      this.actionPackage = { ...this.data.actionPacakage };
      // if (this.data.actionUsers) {
      //   this.userList = [...this.data.actionUsers];
      // }
    }
    if (this.data.action == "add") {
      this.dialogTitle = "New Recommendation";
      this.actionPackage = new TilActionPackage({});
      this.userList = [];
    }
    this.submitObject.action = { ...this.actionPackage }
    this.tils = [...data.tils]
    this.equipments = [...data.equipments]
    this.prioritys = [...data.prioritys];
    this.apiUsers = [...data.apiUsers];
    this.budgetSources = [...data.budgetSources];
    this.reviewStatuss = [...data.reviewStatuss];
    this.actionClosure = [...data.actionClosure];
    this.outages = [...data.outages]
    this.actionForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      packageId: [this.actionPackage.packageId, [Validators.required]],
      tilId: [this.actionPackage.tilId, [Validators.required]],
      userId: [""],
      actionTitle: [this.actionPackage.actionTitle, [Validators.required]],
      actionClosureGuidelinesId: [this.actionPackage.actionClosureGuidelinesId, [Validators.required]],
      unitStatusId: [this.actionPackage.unitStatus, [Validators.required]],
      actionDescription: [this.actionPackage.actionDescription, [Validators.required]],
      expectedBudget: [this.actionPackage.expectedBudget, [Validators.required]],
      budgetSourceId: [this.actionPackage.budgetSourceId, [Validators.required]],
      patComments: [this.actionPackage.patComments, [Validators.required]],
      // attachmentId: [this.actionPackage.attachmentId, [Validators.required]],
      // siteEquipmentIds: [this.actionPackage.siteEquipmentIds, [Validators.required]],
      priorityId: [this.actionPackage.priorityId, [Validators.required]],
      recurrence: [this.actionPackage.recurrence, [Validators.required]],
      reviewStatusId: [this.actionPackage.reviewStatus, [Validators.required]],
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
  submit() {
    // this.submitObject.user = [...this.userList];
    this.submitObject.action.packageId = this.actionForm.value.packageId;
    this.submitObject.action.tilId = this.actionForm.value.tilId;
    this.submitObject.action.actionTitle = this.actionForm.value.actionTitle;
    this.submitObject.action.actionClosureGuidelinesId = this.actionForm.value.actionClosureGuidelinesId;
    this.submitObject.action.unitStatus = this.actionForm.value.unitStatus;
    this.submitObject.action.actionDescription = this.actionForm.value.actionDescription;
    this.submitObject.action.expectedBudget = this.actionForm.value.expectedBudget;
    this.submitObject.action.budgetSourceId = this.actionForm.value.budgetSourceId;
    this.submitObject.action.patComments = this.actionForm.value.m;
    // this.submitObject.action.attachmentId = this.actionForm.value.attachmentId;
    // this.submitObject.action.siteEquipmentIds = this.actionForm.value.siteEquipmentIds;
    this.submitObject.action.priorityId = this.actionForm.value.priorityId;
    this.submitObject.action.recurrence = this.actionForm.value.recurrence;
    this.submitObject.action.reviewStatusId = this.actionForm.value.reviewStatusId;
  }
  removeChip(value: any, name: string): void {
    debugger;
    if (name == 'user') {
      const index = this.userList.indexOf(value);
      if (index >= 0) {
        this.userList.splice(index, 1);
      }
    }

  }
  addChip(val: string, name: string) {
    if (val) {
      if (name == 'user') {
        let u = this.apiUsers.find(a => a.userId == +val)
        this.userList.push(u);
        this.actionForm.patchValue({
          userId: ""
        })
      }
    }
  }

}
