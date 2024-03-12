import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TComponent, TDocType, TFocus, TILs, TReviewForum, TReviewStatus, TSeverity, TSeverityTiming, TSource, tbEquipemnt } from '../../add-tils.model';
import { AddTilsService } from '../../add-tils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tils-form',
  templateUrl: './tils-form.component.html',
  styleUrls: ['./tils-form.component.sass']
})
export class TilsFormComponent extends UnsubscribeOnDestroyAdapter {

  file: File;
  dialogTitle: string;
  tilForm: FormGroup;
  til: TILs;
  tilComponents: TComponent[];
  tilDocTypes: TDocType[];
  tilSeveritys: TSeverity[];
  tilTimings: TSeverityTiming[];
  tilFocuss: TFocus[];
  tilReviewForums: TReviewForum[];
  tilReviewStatuss: TReviewStatus[];
  tilSources: TSource[];
  tbEquipemnt:tbEquipemnt[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor
    (
      public dialogRef: MatDialogRef<TilsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private dataService: AddTilsService,
      private snackBar: MatSnackBar,
    ) {
    super();
    if (this.data.action == "edit") {
      this.dialogTitle = this.data.til.tilTitle;
      this.til = { ...this.data.til }
    }
    if (this.data.action == "add") {
      this.dialogTitle = "New Recommendation";
      this.til = new TILs({});
    }
    this.tilComponents = [...data.tilComponents]
    this.tilDocTypes = [...data.tilDocTypes];
    this.tilSeveritys = [...data.tilSeveritys];
    this.tilTimings = [...data.tilTimings];
    this.tilFocuss = [...data.tilFocuss];
    this.tilReviewForums = [...data.tilReviewForums];
    this.tilReviewStatuss = [...data.tilReviewStatuss];
    this.tilSources = [...data.tilSources]
    this.tbEquipemnt = [...data.tbEquipemnt]
    this.tilForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      tilId: [this.til.tilId, [Validators.required]],
      tilNumber: [this.til.tilNumber, [Validators.required]],
      alternateNumber: [this.til.alternateNumber],
      applicabilityNotes: [this.til.applicabilityNotes],
      tilTitle: [this.til.tilTitle],
      currentRevision: [this.til.currentRevision],
      tilFocusId: [this.til.tilFocusId],
      documentTypeId: [this.til.documentTypeId],
      oem: [this.til.oem],
      oemSeverityId: [this.til.oemSeverityId],
      oemTimingId: [this.til.oemTimingId],
      reviewForumId: [this.til.reviewForumId],
      recommendations: [this.til.recommendations],
      dateReceivedNomac: [this.til.dateReceivedNomac],
      dateIssuedDocument: [this.til.dateIssuedDocument],
      sourceId: [this.til.sourceId],
      reviewStatusId: [this.til.reviewStatusId],
      notes: [this.til.notes],
      componentId: [this.til.componentId],
      report: [this.til.report],
      yearOfIssue: [this.til.yearOfIssue],
      implementationNotes: [this.til.implementationNotes],
      attachments: [''],
      tbEquipemnt: [this.til.tbEquipmentId],
      tilReport: ['']
    })
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

  handleUpload(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.tilForm.patchValue({
        tilReport: this.file
      });
    }
  }
  submit() {
    if (this.tilForm.valid) {
      this.til.tilId = this.tilForm.value.tilId
      this.til.tilNumber = this.tilForm.value.tilNumber
      this.til.alternateNumber = this.tilForm.value.alternateNumber
      this.til.applicabilityNotes = this.tilForm.value.applicabilityNotes
      this.til.tilTitle = this.tilForm.value.tilTitle
      this.til.currentRevision = this.tilForm.value.currentRevision
      this.til.tilFocusId = this.tilForm.value.tilFocusId;
      this.til.tilFocusTitle = this.tilFocuss.find(data => data.focusId === this.tilForm.value.tilFocusId)?.focusTitle;
      this.til.documentTypeId = this.tilForm.value.documentTypeId
      this.til.documentTypeTitle = this.tilDocTypes.find(data => data.typeId === this.tilForm.value.documentTypeId)?.typeTitle;
      this.til.oem = this.tilForm.value.oem
      this.til.oemSeverityId = this.tilForm.value.oemSeverityId
      this.til.oemSeverityTitle = this.tilSeveritys.find(data => data.oemSeverityId === this.tilForm.value.oemSeverityId)?.oemSeverityTitle;
      this.til.oemTimingId = this.tilForm.value.oemTimingId
      this.til.oemTimingTitle = this.tilTimings.find(data => data.timingId === this.tilForm.value.oemTimingId)?.timingCode;
      this.til.reviewForumId = this.tilForm.value.reviewForumId
      this.til.reviewForumtitle = this.tilReviewForums.find(data => data.reviewFormId === this.tilForm.value.reviewForumId)?.reviewFormTitle;
      this.til.recommendations = this.tilForm.value.recommendations
      this.til.dateReceivedNomac = this.tilForm.value.dateReceivedNomac
      this.til.dateIssuedDocument = this.tilForm.value.dateIssuedDocument
      this.til.sourceId = this.tilForm.value.sourceId
      this.til.sourceTitle = this.tilSources.find(data => data.sourceId === this.tilForm.value.sourceId)?.sourceTitle;
      this.til.reviewStatusId = this.tilForm.value.reviewStatusId
      this.til.reviewStatusTitle = this.tilReviewStatuss.find(data => data.reviewStatusId === this.tilForm.value.reviewStatusId)?.reviewStatusTitle;
      this.til.notes = this.tilForm.value.notes
      this.til.componentId = this.tilForm.value.componentId
      this.til.componentTitle = this.tilComponents.find(data => data.componentId === this.tilForm.value.componentId)?.componentTitle;
      this.til.report = this.tilForm.value.report;
      this.til.implementationNotes = this.tilForm.value.implementationNotes;
      this.til.yearOfIssue = this.tilForm.value.yearOfIssue;
      this.til.tilReport = this.tilForm.value.tilReport;

      this.til.tbEquipmentId = this.tilForm.value.tbEquipemnt
      this.til.tbTitle = this.tbEquipemnt.find(data => data.tilEquipmentId === this.tilForm.value.tbEquipemnt)?.title;
    }
  }
}
