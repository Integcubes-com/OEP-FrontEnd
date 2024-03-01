import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TilEvaluationForm } from 'src/app/admin/action-tracker/tils/add-tils/add-tils.model';
import { TILEvaluation, tilReviewStatus } from '../../til-evaluation.model';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.sass']
})

export class EvaluationFormComponent {

  dialogTitle: string;
  tilEvaluation: TilEvaluationForm = {
    teId: -1,
    teSummary: '',
    reviewStatus: 3,
    evaluated: false,
    mandatory: false,
    critical: false,
    safetyCritical: false,
  };
  tilEvaluationForm: FormGroup;

  til: TILEvaluation;
  status: tilReviewStatus[]=[];


  constructor
    (
      public dialogRef: MatDialogRef<EvaluationFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
    this.dialogTitle = this.data.til.tilTitle;
    this.til = { ...this.data.til }
    this.status = [...data.status]
    if (data.til.technicalReviewId) {
      this.tilEvaluation.teId = this.data.til.technicalReviewId;
      this.tilEvaluation.teSummary = this.data.til.teSummary;
      this.tilEvaluation.reviewStatus= this.data.til.reviewStatus;
      this.tilEvaluation.evaluated= this.data.til.evaluated;
      this.tilEvaluation.mandatory= this.data.til.mandatory;
      this.tilEvaluation.critical= this.data.til.critical;
      this.tilEvaluation.safetyCritical= this.data.til.safetyCritical;
    }
    else {
      this.tilEvaluation = new TilEvaluationForm({});

    }
    this.tilEvaluationForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      technicalEvaluation: [this.tilEvaluation.teSummary, [Validators.required]],
      teId: [this.tilEvaluation.teId, [Validators.required]],
      reviewStatus: [this.tilEvaluation.reviewStatus, [Validators.required]],
      evaluated: [this.tilEvaluation.evaluated, [Validators.required]],
      mandatory: [this.tilEvaluation.mandatory, [Validators.required]],
      safetyCritical: [this.tilEvaluation.safetyCritical, [Validators.required]],
      critical: [this.tilEvaluation.critical, [Validators.required]],
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
  submit() {
    if (this.tilEvaluationForm.valid) {
      this.til.technicalReviewId = this.tilEvaluationForm.value.teId;
      this.til.technicalReviewSummary = this.tilEvaluationForm.value.technicalEvaluation;
      this.til.reviewStatus = this.tilEvaluationForm.value.reviewStatus;
      this.til.evaluated = this.tilEvaluationForm.value.evaluated; 
      this.til.mandatory = this.tilEvaluationForm.value.mandatory;
      this.til.critical = this.tilEvaluationForm.value.critical;
      this.til.safetyCritical = this.tilEvaluationForm.value.safetyCritical; 
    }
  }

}
