import { Component, Inject, OnInit } from '@angular/core';
import { TilActionPackage, TAPEquipment, TAPPriority, TAPBudgetSource, TAPUser } from '../../../tils-tracker-assignment.model';
import { TilsTrackerService } from '../../../tils-tracker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, DialogPosition } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionFormComponent } from 'src/app/admin/chemistry-action-plan/observation/observation-action/dialogs/action-form/action-form.component';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { tataStatus, ActionTrackerEndUser, tataBudget, tatapart, tataFinalImplementation, tataEv, tataSAP } from 'src/app/admin/action-tracker/end-user/end-user-til/til-tracker.model';
import { CUsers } from 'src/app/shared/common-interface/common-interface';
import { FileUploadDialogComponent } from 'src/app/admin/action-tracker/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-assign-til-action',
  templateUrl: './assign-til-action.component.html',
  styleUrls: ['./assign-til-action.component.sass']
})
export class AssignTilActionComponent extends UnsubscribeOnDestroyAdapter {
  statusList:tataStatus[];
  actionForm: FormGroup;
  action: ActionTrackerEndUser
  package: TilActionPackage
  equipment: TAPEquipment[]
  priority: TAPPriority[]
  budgetSource: TAPBudgetSource[]
  userId:number;
  budget: tataBudget[]
  users:CUsers[]
  part: tatapart[]
  finalImplementation: tataFinalImplementation[]
  evidence: tataEv[]
  sapPlaning: tataSAP[]
  dialogTitle: string;
  file:File;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dataService: TilsTrackerService,
    private snackBar: MatSnackBar,
  ) {
    super();
    this.userId = this.data.userId
      this.users = [...this.data.users];
      this.action = {...this.data.action};
      this.dialogTitle = this.action.tilAction;
      this.package = new TilActionPackage({});
      this.package.packageId = this.action.tapId;
      this.statusList = [...this.data.status]
      this.equipment=[...this.data.equipment]
      this.priority=[...this.data.priority]
      this.budget=[...this.data.budget]
      this.budgetSource=[...this.data.budgetSource]
      this.part=[...this.data.part]
      this.finalImplementation=[...this.data.finalImplementation]
      this.evidence=[...this.data.evidence]
      this.sapPlaning=[...this.data.sapPlaning]
      this.actionForm = this.buildFrom()

      this.removeValidators();
    }
    removeValidators() {
      if(this.userId === 22){
        for (const key in this.actionForm.controls) {
          this.actionForm.get(key).clearValidators();
          this.actionForm.get(key).updateValueAndValidity();
        }
      }
      if (this.data.mode == "view") {
        for (const key in this.actionForm.controls) {
          this.actionForm.get(key).disable();
          this.actionForm.get(key).clearValidators();
          this.actionForm.get(key).updateValueAndValidity();
        }
      }
    }
    uploadEvidence(){
      const dialogPosition: DialogPosition = {
        right: 30 + 'px'
      };
      const dialogRef = this.dialog.open(FileUploadDialogComponent, {
        panelClass: 'custom-dialog-container',
        width:'340px',
        height:'700px',
        position: dialogPosition,
        data: {
          actionTracker:this.action,
          action:'til',
          mode:'edit'
        },
      });
    }
    viewEvidence(){
      const dialogPosition: DialogPosition = {
        right: 30 + 'px'
      };
      const dialogRef = this.dialog.open(FileUploadDialogComponent, {
        panelClass: 'custom-dialog-container',
        width:'340px',
        position: dialogPosition,
        data: {
          actionTracker:this.action,
          action:'til',
          mode:'view'
        },
      });
    }
    downloadReport() {
      this.subs.sink = this.dataService.downloadReport(this.action.tilActionTrackerId).subscribe({
        next: data => {
          if (data.body.size < 100) {
            this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
          }
          else {
            const url = window.URL.createObjectURL(data.body);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.action.reportName;
            a.click();
            window.URL.revokeObjectURL(url);
          }
  
        },
        error: err => {
          this.showNotification('black', err, 'bottom', 'center');
        }
      })
    }
    handleUpload(event) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
        this.actionForm.patchValue({
          tilreport: this.file
        });
      }
    }
    submit(): void {
      this.action.siteStatusDetail = this.actionForm.value.siteStatusDetail;
      this.action.partServiceId = this.actionForm.value.partServiceId;
      this.action.partServiceTitle = this.part.find(a=>a.partId == this.action.partServiceId)?.partTitle
      this.action.planningId = this.actionForm.value.planningId;
      this.action.planningTitle = this.sapPlaning.find(a=>a.sapPlanningId ==  this.action.planningId)?.sapPlanningTitle
      this.action.finalImplementationId = this.actionForm.value.finalImplementationId;
      this.action.finalImplementationTitle = this.finalImplementation.find(a=>a.finalImpId == this.action.finalImplementationId)?.finalImpTitle
      this.action.evidenceId = this.actionForm.value.evidenceId;
      this.action.evidenceTitle = this.evidence.find(a=>a.evidenceId == this.action.evidenceId)?.evidenceTitle
      this.action.statusId = this.actionForm.value.statusid
      this.action.statustitle = this.statusList.find(a=>a.statusId == this.action.statusId)?.statustitle
      this.action.tilReport = this.actionForm.value.tilreport
      this.action.targetDate = this.actionForm.value?.targetDate;
      this.action.budgetId = this.actionForm.value.budget;
      this.action.budgetTitle = this.budget.find(a=>a.budgetId == this.action.budgetId)?.budgetName;
      this.action.assignedToId = this.actionForm.value.assignedToId
      this.action.assignedToTitle = this.users.find(a=>a.userId == this.action?.assignedToId)?.userName

     

  }
  buildFrom(): FormGroup {
    return this.fb.group({
      tapId: [this.package.packageId, [Validators.required]],
      actionDescription: [{ value: this.action.actionDescription, disabled: true }],
      siteEquipmentId: [{ value: this.action.siteEquipmentId, disabled: true }],
      priorityId: [{ value: this.action.priorityId, disabled: true }],
      targetDate: [this.action.targetDate,[Validators.required]],
      budget: [this.action.budgetId, [Validators.required]],
      tilAction: [{ value: this.action.tilAction, disabled: true }],
      siteStatusDetail: [this.action.siteStatusDetail],
      partServiceId: [this.action.partServiceId, [Validators.required]],
      planningId: [this.action.planningId, [Validators.required]],
      budgetSourceId: [{ value: this.action.budgetSourceId, disabled: true }],
      actionCategory: [{ value: this.action.actionCategory, disabled: true }],
      unitStatus: [{ value: this.action.unitStatus, disabled: true }],
      finalImplementationId: [this.action.finalImplementationId, [Validators.required]],
      evidenceId: [this.action.evidenceId, [Validators.required]],
      statusid: [{ value: this.action.statusId, disabled: true }],
      assignedToId: [this.action.assignedToId ],
      reportPath: [],
      tilreport: [],
    })
  }
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
