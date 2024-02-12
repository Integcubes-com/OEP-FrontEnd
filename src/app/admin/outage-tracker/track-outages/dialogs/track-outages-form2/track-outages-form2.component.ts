import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, DialogPosition } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { APISaveData, OTData, OTDate, OTUser, OT_outageTracker } from '../../track-outages.model';
import { TrackOutagesService } from '../../track-outages.service';
import { TrackOutagesFormComponent } from '../track-outages-form/track-outages-form.component';
import { User } from 'src/app/core/models/user';
import { FileUploadDialogComponent } from '../../../file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-track-outages-form2',
  templateUrl: './track-outages-form2.component.html',
  styleUrls: ['./track-outages-form2.component.sass']
})
export class TrackOutagesForm2Component extends UnsubscribeOnDestroyAdapter {
  action: OT_outageTracker
  actionForm: FormGroup
  dialogTitle: string
  monthList: OTDate[] = [];
  otData: OTData;
  conc: string;
  Apidata: APISaveData = {
    outageTracker: new OT_outageTracker,
    monthlyData: null
  }
  nameToRemove:any[]=['Mr. Test','Nikhil Maheta'];
  userData:OTUser[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    public dialogRef: MatDialogRef<TrackOutagesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar, private dataService: TrackOutagesService,
    public dialog: MatDialog
  ) {
    super()
    this.action = { ...this.data?.outageAction }
    this.monthList = [...this.data.dataOt.monthList];
    this.userData = [...this.data.dataOt.userData];
    if (this.data.dataOt.outageData == null) {
      this.otData = new OTData({})
      this.conc = this.monthList[0].monthId;
    }
    else {
      this.otData = { ...this.data.dataOt.outageData }
      this.conc = this.otData.monthId+"-"+this.otData.yearId;
    }

    this.dialogTitle = this.action.siteTitle + "-" + this.action.unit + " " + this.action.outageTitle + " " + this.action.phaseTitle
    this.actionForm = this.buildForm();
  }
  techSelect(event) {
    if (event.checked == true) {
      this.actionForm.get('progress').clearValidators();
      this.actionForm.get('progress').updateValueAndValidity();
      this.actionForm.get('remarks').clearValidators();
      this.actionForm.get('remarks').updateValueAndValidity();
    }
    else {
      this.actionForm.get('progress').setValidators(Validators.required);
      this.actionForm.get('progress').updateValueAndValidity();
      this.actionForm.get('remarks').clearValidators();
      this.actionForm.get('remarks').updateValueAndValidity();
    }
  }
  buildForm(): FormGroup {
    return this.fb.group({
      potId: [this.action.potId, [Validators.required]],
      progressId: [this.otData.progressId, [Validators.required]],
      remarks: [this.otData.remarks, [Validators.required]],
      date: [this.conc, [Validators.required]],
      progress: [this.otData.progress, [Validators.required,
      Validators.pattern(/^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/),
      Validators.min(0),
      Validators.max(100)]],
      notApplicable: [this.action.notApplicable, [Validators.required]],
    })
  }
  uploadEvidence() {
    const dialogPosition: DialogPosition = {
      right: 30 + 'px'
    };
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '340px',
      height: '700px',
      position: dialogPosition,
      data: {
        outageTracker: this.action,
        action: 'outageTracker',
        mode: 'edit'
      },
    });
  }
  getData(value: string) {
    this.subs.sink = this.dataService.getOTCData(this.user.id, value, this.action.potId).subscribe({
      next: data => {
        var p = data?data.progressId:-1
        this.actionForm.patchValue({
          progressId: p,
          remarks: data?.remarks,
          progress: data?.progress,
        })
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
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
  submit() {
    if (this.actionForm.valid) {
      this.action.notApplicable = this.actionForm.value.notApplicable;
      this.Apidata.outageTracker = { ...this.action };
      this.otData.progress = +this.actionForm.value.progress;
      this.otData.progressId = +this.actionForm.value.progressId;
      this.otData.remarks = this.actionForm.value.remarks;
      let conctVal = this.actionForm.value.date.split('-');
      this.otData.monthId = parseInt(conctVal[0], 10);
      this.otData.yearId = parseInt(conctVal[1], 10);
      this.Apidata.monthlyData = { ...this.otData }
      this.dialogRef.close(this.Apidata);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
