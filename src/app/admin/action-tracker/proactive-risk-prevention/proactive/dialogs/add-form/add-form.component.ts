import { Component, Inject, OnInit } from '@angular/core';
import { ProactiveApproachStatus, ProactiveCategory, ProactiveCriticality, ProactiveExposure, ProactiveProactiveSource, ProactiveProactiveTheme, ProactiveProjectPhase, ProactiveRiskPrevention, ProactiveSaveObj } from '../../proactive.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Regions } from 'src/app/admin/action-tracker/regions/region-main/region.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.sass']
})
export class AddFormComponent  {
  proactiveForm:FormGroup
  dialogTitle:string;
  apiData:ProactiveSaveObj={
    proactive: new ProactiveRiskPrevention({}),
    projectPhase: []
  }
  projectPhaseList:any[]=[];
  proactive:ProactiveRiskPrevention;
  proactiveCriticality: ProactiveCriticality[];
  proactiveCategory: ProactiveCategory[];
  proactiveExposure: ProactiveExposure[];
  proactiveApproachStatus: ProactiveApproachStatus[];
  proactiveProjectPhase: ProactiveProjectPhase[];
  proactiveProactiveSource: ProactiveProactiveSource[];
  proactiveProactiveTheme: ProactiveProactiveTheme[]
  constructor
    (
      public dialogRef: MatDialogRef<AddFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
      this.proactiveCriticality=[...this.data.proactiveCriticality]
      this.proactiveCategory=[...this.data.proactiveCategory]
      this.proactiveExposure=[...this.data.proactiveExposure]
      this.proactiveApproachStatus=[...this.data.proactiveApproachStatus]
      this.proactiveProjectPhase=[...this.data.proactiveProjectPhase]
      this.proactiveProactiveSource=[...this.data.proactiveProactiveSource]
      this.proactiveProactiveTheme=[...this.data.proactiveProactiveTheme]
    if (this.data.action == "add" ) {
      this.proactive = new ProactiveRiskPrevention({});
      this.dialogTitle = "New proactive Risk Prevention";
      this.projectPhaseList = []
    }
    else {
      this.proactive = {...this.data.proactive};
      debugger;
      this.dialogTitle = this.proactive.proactiveReference;
      this.projectPhaseList = [...this.data?.selectedList]
    }
    this.proactiveForm = this.createproactiveForm();
    this.removeValidators();
  }
  removeValidators() {
    if(this.data.action == 'view'){
      for (const key in this.proactiveForm.controls) {
        this.proactiveForm.get(key).disable();
        this.proactiveForm.get(key).clearValidators();
        this.proactiveForm.get(key).updateValueAndValidity();
      }
    }
  }
  createproactiveForm(): FormGroup {
    return this.fb.group({
      proactiveId: [this.proactive.proactiveId, [Validators.required]],
      proactivetitle: [this.proactive.proactivetitle, [Validators.required]],
      proactiveReference: [this.proactive.proactiveReference ],
      criticalityId:[this.proactive.criticalityId],
      categoryId:[this.proactive.categoryId],
      exposureId:[this.proactive.exposureId],
      recommendations:[this.proactive.recommendations],
      guidelines:[this.proactive.guidelines],
      details:[this.proactive.details],
      approachStatusId:[this.proactive.approachStatusId],
      // expertId:[this.proactive.proactiveId, [Validators.required]],
      sourceId:[this.proactive.sourceId],
      themeId:[this.proactive.themeId],
      auditPreperatoryChecklist:[this.proactive.auditPreperatoryChecklist],
      phaseprojectId:[""],
    })
  }
  removeChip(value: any): void {
    const index = this.projectPhaseList.indexOf(value);
    if (index >= 0) {
      this.projectPhaseList.splice(index, 1);
    }
}
addChip(val: string) {
  if (val) {
      let u = this.proactiveProjectPhase.find(a => a.projectPhaseId == +val)
      this.projectPhaseList.push(u);
      this.proactiveForm.patchValue({
        phaseprojectId: ""
      })
  }
}
  submit() {
    if (this.proactiveForm.valid) {
      this.proactive.proactivetitle = this.proactiveForm.value.proactivetitle;
      this.proactive.proactiveReference = this.proactiveForm.value.proactiveReference;

      this.proactive.criticalityId = this.proactiveForm.value.criticalityId;
      this.proactive.criticalityTitle = this.proactiveCriticality.find(a=>a.criticalityId == this.proactive?.criticalityId)?.criticalityTitle;


      this.proactive.categoryId = this.proactiveForm.value.categoryId;
      this.proactive.categoryTitle = this.proactiveCategory.find(a=>a.categoryId == this.proactive?.categoryId)?.categoryTitle;


      this.proactive.exposureId = this.proactiveForm.value.exposureId;
      this.proactive.exposureTitle = this.proactiveExposure.find(a=>a.exposureId ==  this.proactive?.exposureId)?.exposureTitle;

      this.proactive.recommendations = this.proactiveForm.value.recommendations;
      this.proactive.guidelines = this.proactiveForm.value.guidelines;

      this.proactive.approachStatusId = this.proactiveForm.value.approachStatusId;
      this.proactive.approachStatusTitle = this.proactiveApproachStatus.find(a=>a.approachStatusId == this.proactive.approachStatusId)?.approachStatusTitle;


      this.proactive.details = this.proactiveForm.value.details;

      this.proactive.sourceId = this.proactiveForm.value.sourceId;
      this.proactive.sourceId = this.proactiveForm.value.sourceId;

      this.proactive.themeId = this.proactiveForm.value.themeId;
      this.proactive.themeTitle = this.proactiveProactiveTheme.find(a=>a.themeId ==  this.proactive.themeId)?.themeTitle;


      this.proactive.auditPreperatoryChecklist = this.proactiveForm.value.auditPreperatoryChecklist;

      this.apiData.proactive = {...this.proactive}
      this.apiData.projectPhase = [...this.projectPhaseList]
      this.dialogRef.close( this.apiData);
    }

  }
  onNoClick() {
    this.dialogRef.close();
  }


}
