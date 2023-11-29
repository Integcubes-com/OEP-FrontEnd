import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, DialogPosition } from '@angular/material/dialog';
import { InsurenceTracker, ITUser } from '../../insurence-tracker.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EndUserInsuranceService } from 'src/app/admin/action-tracker/end-user/end-user-insurence/end-user-insurance.service';
import { FileUploadDialogComponent } from 'src/app/admin/action-tracker/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-view-action',
  templateUrl: './view-action.component.html',
  styleUrls: ['./view-action.component.sass']
})
export class ViewActionComponent  extends UnsubscribeOnDestroyAdapter{

  dialogTitle:string;
  trackingForm: FormGroup;
  actionTracker: InsurenceTracker;
  constructor
  (
    public dialogRef: MatDialogRef<ViewActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar, 
    private dataService: EndUserInsuranceService,
    public dialog: MatDialog
  ) 
  { 
super();
      this.dialogTitle = this.data.tracker.action;
      this.actionTracker = { ...this.data.tracker };
    this.trackingForm = this.buildForm();
  }

  buildForm():FormGroup{
    return this.fb.group({
      insurenceActionTrackerId: [this.actionTracker.insurenceActionTrackerId, [Validators.required]],
      recommendationId: [this.actionTracker.recommendationId, [Validators.required]],
      recommendationReference: [this.actionTracker.recommendationReference, [Validators.required]],

      action: [this.actionTracker.action, [Validators.required]],
      assignedTo: "",
      targetDate: [this.actionTracker.targetDate, [Validators.required]],
      statusId: [this.actionTracker.statusTitle, [Validators.required]],
      companyId: [this.actionTracker.companyTitle, [Validators.required]],
      comments: [this.actionTracker.comments, [Validators.required]],
      closureDate: [this.actionTracker.closureDate, [Validators.required]],
      evidenceAvailable: [this.actionTracker.evidenceAvailable, [Validators.required]],
      calcStatus: [this.actionTracker.calcStatus, [Validators.required]],
      calcEvid: [this.actionTracker.calcEvid, [Validators.required]],
      calcDate: [this.actionTracker.calcDate, [Validators.required]],
      completionScore: [this.actionTracker.completionScore, [Validators.required]],
      daysToTarget: [this.actionTracker.daysToTarget, [Validators.required]],
      scoreDetails: [this.actionTracker.scoreDetails, [Validators.required]],
      siteId: [this.actionTracker.siteTitle, [Validators.required]],
      regionId: [this.actionTracker.regionTitle, [Validators.required]],
      sourceId: [this.actionTracker.sourceTitle, [Validators.required]],
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }
  uploadEvidence(){
    const dialogPosition: DialogPosition = {
      right: 30 + 'px'
    };
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      panelClass: 'custom-dialog-container',
      width:'340px',
      position: dialogPosition,
      data: {
        actionTracker:this.actionTracker,
        action:'insurance',
        mode:'view'
      },
    });

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  downloadReport(){
    this.subs.sink = this.dataService.downloadReport(this.actionTracker.insurenceActionTrackerId).subscribe({
      next: data => { 
        if(data.body.size < 100){
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else{
          const fileExtension = this.actionTracker.reportName.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.actionTracker.reportName}.${fileExtension}`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.showNotification('snackbar-success', "File Downloaded Sucessfully", 'bottom', 'center');
        }
        
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
}
