import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TILs } from 'src/app/admin/action-tracker/tils/add-tils/add-tils.model';
import { AddTilsService } from 'src/app/admin/action-tracker/tils/add-tils/add-tils.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.sass']
})
export class ViewFormComponent extends UnsubscribeOnDestroyAdapter{

  dialogTitle: string;

  tilForm: FormGroup;

  til: TILs;


  constructor
    (
      public dialogRef: MatDialogRef<ViewFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private snackBar: MatSnackBar, 
      private dataService: AddTilsService,
    ) {
super();
    this.dialogTitle = this.data.til.tilTitle;
    this.til = { ...this.data.til }
    this.tilForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      tilId: [this.til.tilId],
      tilNumber: [this.til.tilNumber],
      alternateNumber: [this.til.alternateNumber],
      applicabilityNotes: [this.til.applicabilityNotes],
      tilTitle: [this.til.tilTitle],
      currentRevision: [this.til.currentRevision],
      tilFocusId: [this.til.tilFocusTitle],
      documentTypeId: [this.til.documentTypeTitle],
      oem: [this.til.oem],
      oemSeverityId: [this.til.oemSeverityTitle],
      oemTimingId: [this.til.oemTimingTitle],
      reviewForumId: [this.til.reviewForumtitle],
      recommendations: [this.til.recommendations],
      dateReceivedNomac: [this.til.dateReceivedNomac],
      dateIssuedDocument: [this.til.dateIssuedDocument],
      sourceId: [this.til.sourceTitle],
      reviewStatusId: [this.til.reviewForumtitle],
      notes: [this.til.notes],
      componentId: [this.til.componentTitle],
      report: [this.til.report],
      yearOfIssue: [this.til.yearOfIssue],
      implementationNotes: [this.til.implementationNotes],
      attachments: [''],
    })
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  downloadReport() {
    this.subs.sink = this.dataService.downloadReport(this.til.tilId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.til.reportName}`;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }


}
