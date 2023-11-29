import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, DialogPosition } from '@angular/material/dialog';
import { OMA_program, OMA_Technology } from '../../../add-program/program.model';
import { OMA_TechAccount, OMA_Status, OMA_MitigationAction, OMA_Priority, OMA_KeyPhase, OMA_MitigationActionSendApi, OMA_MitigationResult,  } from '../../mitigation.model';
import { FileUploadDialogComponent } from '../../../file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-add-mitigation-from',
  templateUrl: './add-mitigation-from.component.html',
  styleUrls: ['./add-mitigation-from.component.sass']
})
export class AddMitigationFromComponent{

  apiObj:OMA_MitigationActionSendApi={
    keyPhase: [],
    mitigationAction: new OMA_MitigationAction({})
  }
  mitigationResult:OMA_MitigationResult;
  keyPhases:OMA_KeyPhase[];
  techAccountabilities: OMA_TechAccount[]
  programs:OMA_program[];
  statuss:OMA_Status[];
  mitigationAction:OMA_MitigationAction;
  prioritys:OMA_Priority[];
  mitigationForm:FormGroup;
  dialogTitle:string;
  keyPhaseList:OMA_KeyPhase[];
  constructor(
    private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddMitigationFromComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog

  ) { 
    if (this.data.action == 'add') {
      this.mitigationAction = new OMA_MitigationAction({});
      this.dialogTitle = "New Mitigation Action";
      this.keyPhaseList = [];
      this.mitigationResult = new OMA_MitigationResult({});
    }
    else if (this.data.action == 'edit' || this.data.action == 'view') {
      this.mitigationAction = {...this.data.mitigationAction};
      this.dialogTitle = this.mitigationAction.programTitle;
      this.keyPhaseList = [...this.data.selectedKeyPhases];
      this.mitigationResult = new OMA_MitigationResult({});
    }
    else if(this.data.action == 'action' || this.data.action == 'review'){
      this.mitigationAction = new OMA_MitigationAction({});
      this.mitigationResult = {...this.data.mitigationResult};
      this.dialogTitle = this.mitigationResult.programTitle;
      this.keyPhaseList = [...this.data.selectedKeyPhases];
      this.mitigationAction.actionId = this.mitigationResult.actionId;
      this.mitigationAction.actionTitle = this.mitigationResult.actionTitle;
      this.mitigationAction.comments = this.mitigationResult.comments;
      this.mitigationAction.priorityId = this.mitigationResult.priorityId;
      this.mitigationAction.priorityTitle = this.mitigationResult.priorityTitle;
      this.mitigationAction.programId = this.mitigationResult.programId;
      this.mitigationAction.programTitle = this.mitigationResult.programTitle;
      this.mitigationAction.objectiveOutcome = this.mitigationResult.objectiveOutcome;
      // this.mitigationAction.targetDate = this.mitigationResult.targetDate;
      this.mitigationAction.techAccountabilityId=this.mitigationResult.techAccountabilityId;
      this.mitigationAction.taTitle=this.mitigationResult.taTitle;


    }
    this.programs=[...this.data.programs];
    this.statuss=[...this.data.statuss]; 
    this.prioritys=[...this.data.prioritys];
    this.keyPhases = [...this.data.keyPhases]
    this.techAccountabilities=[...this.data.techAccountabilities];
    this.mitigationForm = this.buildform();
    if (this.data.action === 'action' || this.data.action === 'review') {
      this.mitigationForm.get('actionTitle').disable();
      this.mitigationForm.get('actionTitle').clearValidators();

      this.mitigationForm.get('priorityId').disable();
      this.mitigationForm.get('priorityId').clearValidators();

      this.mitigationForm.get('programId').disable();
      this.mitigationForm.get('programId').clearValidators();

      this.mitigationForm.get('comments').disable();
      this.mitigationForm.get('comments').clearValidators();
      
      this.mitigationForm.get('objectiveOutcome').disable();
      this.mitigationForm.get('objectiveOutcome').clearValidators();

      // this.mitigationForm.get('targetDate').disable();
      // this.mitigationForm.get('targetDate').clearValidators();

      this.mitigationForm.get('keyPhases').disable();
      this.mitigationForm.get('keyPhases').clearValidators();

      this.mitigationForm.get('techAccountabilityId').disable();

      this.mitigationForm.get('techAccountabilityId').clearValidators();
      if(this.data.action === 'action' && this.mitigationResult.rework == true){
        this.mitigationForm.get('reviewerComment').disable();
      }
     if(this.data.action === 'action' && this.mitigationResult.isReviewed == false){
        this.mitigationForm.get('statusId').setValidators(Validators.required);
    this.mitigationForm.get('targetDate').disable();
      this.mitigationForm.get('targetDate').clearValidators();
        this.mitigationForm.get('tataInvolvement').setValidators(Validators.required);
      }
      else if (this.data.action === 'action' && this.mitigationResult.isReviewed == true){
        this.mitigationForm.get('statusId').disable();

        this.mitigationForm.get('actionComment').disable();
        this.mitigationForm.get('actionComment').clearValidators();
        this.mitigationForm.get('statusId').clearValidators();
        this.mitigationForm.get('tataInvolvement').disable();
        this.mitigationForm.get('tataInvolvement').clearValidators();
        this.mitigationForm.get('thirdPartyInterface').disable();
        this.mitigationForm.get('thirdPartyInterface').clearValidators();
            this.mitigationForm.get('targetDate').disable();
      this.mitigationForm.get('targetDate').clearValidators();
      }
      else if (this.data.action === 'review') {
        this.mitigationForm.get('statusId').disable();
        this.mitigationForm.get('actionComment').disable();
        this.mitigationForm.get('actionComment').clearValidators();
        this.mitigationForm.get('statusId').clearValidators();
        this.mitigationForm.get('tataInvolvement').disable();
        this.mitigationForm.get('tataInvolvement').clearValidators();
        this.mitigationForm.get('thirdPartyInterface').disable();
        this.mitigationForm.get('thirdPartyInterface').clearValidators();
        this.mitigationForm.get('reviewerComment').setValidators(Validators.required);
        if(this.mitigationResult.isReviewed == true){
          this.mitigationForm.get('isRework').disable();

        }
      }
      this.mitigationForm.updateValueAndValidity();
    }
    this.removeValidators();
  }
  userAction(event) {
    if (event.checked == true) {
      this.mitigationForm.get('isRework').disable();
      this.mitigationForm.patchValue({
        isRework:false
      })
    }
    else{
      this.mitigationForm.get('isRework').enable();

    }
    this.mitigationForm.updateValueAndValidity();

  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.mitigationForm.controls) {
        this.mitigationForm.get(key).disable();
        this.mitigationForm.get(key).clearValidators();
        this.mitigationForm.get(key).updateValueAndValidity();
      }
    }
  }
  buildform(): FormGroup {
    return this.fb.group({
      actionId: [this.mitigationAction.actionId, [Validators.required]],
      actionTitle: [this.mitigationAction.actionTitle, [Validators.required]],
      priorityId: [this.mitigationAction.priorityId, [Validators.required]],
      programId: [this.mitigationAction.programId, [Validators.required]],
      comments: [this.mitigationAction.comments, [Validators.required]],
      objectiveOutcome: [this.mitigationAction.objectiveOutcome, [Validators.required]],
      targetDate: [this.mitigationResult.targetDate],
      techAccountabilityId: [this.mitigationAction.techAccountabilityId, [Validators.required]],
      keyPhases:[],
      tataInvolvement: [this.mitigationResult.tataInvolvement],
      actionComment:[this.mitigationResult.actionComment],
      thirdPartyInterface: [this.mitigationResult.thirdPartyInterface],
      statusId: [this.mitigationResult.statusId],
      statusTitle: [this.mitigationResult.statusTitle],
      
      reviewerComment: [this.mitigationResult.reviewerComment],
      isReviewed: [this.mitigationResult.isReviewed],
      isRework:[this.mitigationResult.rework],
    })
  }
  submit() {
    if (this.data.action == 'edit' || this.data.action == 'add') {
      this.mitigationAction.actionId = this.mitigationForm.value.actionId;
      this.mitigationAction.actionTitle = this.mitigationForm.value.actionTitle;
      this.mitigationAction.priorityId = this.mitigationForm.value.priorityId;
      this.mitigationAction.priorityTitle = this.prioritys.find(a => a.priorityId == this.mitigationAction.priorityId).priorityTitle;
      this.mitigationAction.programId = this.mitigationForm.value.programId;
      this.mitigationAction.programTitle = this.programs.find(a => a.programId == this.mitigationAction.programId).programTitle;
      this.mitigationAction.comments = this.mitigationForm.value.comments;
      this.mitigationAction.objectiveOutcome = this.mitigationForm.value.objectiveOutcome;
      // this.mitigationAction.targetDate = this.mitigationForm.value.targetDate;
      this.mitigationAction.techAccountabilityId = this.mitigationForm.value.techAccountabilityId,
      this.mitigationAction.taTitle = this.techAccountabilities.find(a => a.taId == this.mitigationAction.techAccountabilityId).taTitle;
      this.apiObj.mitigationAction = {...this.mitigationAction};
      this.apiObj.keyPhase = [...this.keyPhaseList];
    }
    else if (this.data.action == 'action' ) {
      this.mitigationResult.tataInvolvement = this.mitigationForm.value.tataInvolvement;
      this.mitigationResult.thirdPartyInterface = this.mitigationForm.value.thirdPartyInterface;
      this.mitigationResult.statusId = this.mitigationForm.value.statusId;
      this.mitigationResult.statusTitle = this.statuss.find(a => a.statusId == this.mitigationResult.statusId)?.statusTitle;
      this.mitigationResult.actionComment = this.mitigationForm.value.actionComment;

    }
    else if (this.data.action == 'review') {
      this.mitigationResult.reviewerComment = this.mitigationForm.value.reviewerComment;
      this.mitigationResult.isReviewed = this.mitigationForm.value.isReviewed;
      this.mitigationResult.targetDate = this.mitigationForm.value.targetDate;
      this.mitigationResult.rework = this.mitigationForm.value.isRework?this.mitigationForm.value.isRework:false;
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  removeChip(value: any): void {
    const index = this.keyPhaseList.indexOf(value);
    if (index >= 0) {
      this.keyPhaseList.splice(index, 1);
    }
}

openAttachments() {
  const dialogPosition: DialogPosition = {
    right: 30 + 'px'
  };
  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    panelClass: 'custom-dialog-container',
    width: '340px',
    height: '80vh',
    position: dialogPosition,
    data: {
      actionId:this.mitigationAction.actionId,
      siteId:this.mitigationResult.siteId,
      technologyId:this.mitigationResult.technologyId,
      action: 'mitigation',
      mode: this.data.action,
    },
  });

}
addChip(val: string) {
  if (val) {
      let u = this.keyPhases.find(a => a.keyPhaseId == +val)
      this.keyPhaseList.push(u);
      this.mitigationForm.patchValue({
        keyPhases: ""
      })
  }
}
}
