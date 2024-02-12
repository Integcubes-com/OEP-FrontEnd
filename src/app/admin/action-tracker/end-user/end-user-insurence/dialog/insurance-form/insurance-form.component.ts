import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, DialogPosition } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsurenceTracker, ITSource, ITCompany, ITStatus, ITUser, ITDayStatus, ITEvidence, ITRecommendation } from 'src/app/admin/action-tracker/insurence/insurence-tracker/insurence-tracker.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EndUserInsuranceService } from '../../end-user-insurance.service';
import { CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';
import { ReturnedDocumnet } from '../../../../file-upload-dialog/file-upload.model';
import { FileUploadDialogComponent } from 'src/app/admin/action-tracker/file-upload-dialog/file-upload-dialog.component';
import { User } from 'src/app/core/models/user';
import { FileUploadDialogService } from 'src/app/admin/action-tracker/file-upload-dialog/file-upload-dialog.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.sass']
})
export class InsuranceFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  dayStatuss: ITDayStatus[];
  evidenceStatuss: ITEvidence[];
  dialogTitle: string;
  trackingForm: FormGroup;
  actionTracker: InsurenceTracker;
  attachedFilesPath: ReturnedDocumnet[]
  sites: CSites[];
  regions: CRegions[];
  recommendations: ITRecommendation[];
  sources: ITSource[];
  evidenceStatus:boolean=false;
  companies: ITCompany[];
  statuss: ITStatus[];
  selectedUser: number;
  errorMessage: string;
  users: CUsers[];
  filteredArray: CUsers[];
  userZ: User = JSON.parse(localStorage.getItem('currentUser'));

  constructor
    (
      public dialogRef: MatDialogRef<InsuranceFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
      private dataService: EndUserInsuranceService,
      public dialog: MatDialog,
      public docService: FileUploadDialogService
    ) {
    super()
    if (this.data.action == "edit" || this.data.action == 'review') {
      this.dialogTitle = this.data.tracker.action;
      this.actionTracker = { ...this.data.tracker }
    }
    else if (this.data.action == "add") {
      this.dialogTitle = "New Recommendation";
      this.actionTracker = new InsurenceTracker({});
    }
    this.sites = [...data.sites]
    this.regions = [...data.regions];
    this.recommendations = [...data.recommendations];
    this.sources = [...data.sources];
    this.companies = [...data.companies];
    this.statuss = [...data.statuss];
    this.users = [...data.users];
    this.filteredArray = [...this.data.users]
    this.dayStatuss = [...data.dayStatuss];
    this.evidenceStatuss = [...data.evidenceStatuss];
    this.trackingForm = this.buildForm();
    this.trackingForm.get('evidenceAvailable').disable();

    if(this.data.action == 'review'){
      this.disableReviewFileds();
    }
  }
  disableReviewFileds(){
    this.trackingForm.get('statusId').disable();
    this.trackingForm.get('statusId').clearValidators();

    this.trackingForm.get('assignedTo').disable();
    this.trackingForm.get('assignedTo').clearValidators();

    this.trackingForm.get('comments').disable();
    this.trackingForm.get('comments').clearValidators();

    this.trackingForm.get('evidenceAvailable').disable();
    this.trackingForm.get('evidenceAvailable').clearValidators();

    this.trackingForm.get('reviewerComment').setValidators(Validators.required);

    this.trackingForm.updateValueAndValidity();

  }
  checkFiles(){
    this.docService.getAttachedFileList(this.actionTracker.insurenceActionTrackerId, this.userZ.id).subscribe({
      next:data=>{
        if(data.length==0){
          this.actionTracker.evidenceAvailableId = 2;
          this.trackingForm.get('evidenceAvailable').setValue(2)
        }
        else{
          this.actionTracker.evidenceAvailableId = 1;
          this.trackingForm.get('evidenceAvailable').setValue(1)
        }
      },
      error:err=>{        this.showNotification('black', err, 'bottom', 'center');
    }
    })
  }
  ngOnInit(): void {
   this.checkFiles();
    this.trackingForm.get('assignedTo')?.valueChanges.subscribe(
      value => {
        const filterValue = value.toLowerCase();
        this.filteredArray = this.users.filter(option => option.userName.toLowerCase().includes(filterValue));
      }
    );  }
  uploadEvidence() {
    let mode='edit';
    if(this.data.action == "review"){
      mode = 'view'
    }

    const dialogPosition: DialogPosition = {
      right: 30 + 'px'
    };
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '340px',
      height: '700px',
      position: dialogPosition,
      data: {
        actionTracker: this.actionTracker,
        action: 'insurance',
        mode: 'mode'
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.checkFiles();
    });
  }
  checker(val: number, type: string) {
    if (this.trackingForm.value.evidenceAvailable==2 && this.trackingForm.value.statusId ==1) {
      this.evidenceStatus = true;
      this.showNotification2('snackbar-info', "Please attach a file before completing an action", 'bottom', 'center');
    }
    else{
      this.evidenceStatus = false;
    }

  }
  setCompleted(event: any) {
    if (event.checked) {
      this.trackingForm.get('isCompleted')?.setValue(true);
      this.trackingForm.get('rework')?.setValue(false);
    } 
  }
  setRework(event: any){
    if (event.checked) {
      this.trackingForm.get('rework')?.setValue(true);
      this.trackingForm.get('isCompleted')?.setValue(false);
    } 
  }
  buildForm(): FormGroup {
    return this.fb.group({
      statusId: [this.actionTracker.statusId, [Validators.required]],
      assignedTo: [this.actionTracker.assignedToTitle],
      comments: [this.actionTracker.comments, [Validators.required]],
      // closureDate: [this.actionTracker.closureDate, [Validators.required]],
      evidenceAvailable: [this.actionTracker.evidenceAvailableId, [Validators.required]],
      fileAttachment: [],
      adminComment:[this.actionTracker.adminComment],
      isCompleted:[this.actionTracker.isCompleted],
      rework:[this.actionTracker.isCompleted],
      reviewerComment:[this.actionTracker.reviewerComment],
      // calcStatus: [this.actionTracker.calcStatus, [Validators.required]],
      // calcEvid: [this.actionTracker.calcEvid, [Validators.required]],
      // calcDate: [this.actionTracker.calcDate, [Validators.required]],
      // completionScore: [this.actionTracker.completionScore, [Validators.required]],
      // daysToTarget: [this.actionTracker.daysToTarget, [Validators.required]],
      // scoreDetails: [this.actionTracker.scoreDetails, [Validators.required]],   
    })
  }
  submit() {
    if (this.trackingForm.valid) {
      if(this.data.action == "review"){
        this.actionTracker.clusterReviewed = true;
        this.actionTracker.reviewerComment = this.trackingForm.value.reviewerComment;
        this.actionTracker.rework = this.trackingForm.value.rework;
        this.actionTracker.isCompleted = this.trackingForm.value.isCompleted;
      }
      else{
        this.actionTracker.clusterReviewed = false;
        this.actionTracker.statusId = this.trackingForm.value.statusId;
        this.actionTracker.statusTitle = this.statuss.find(a => a.statusId == this.actionTracker.statusId)?.statusTitle;
        this.actionTracker.statusScore = this.statuss.find(a => a.statusId == this.actionTracker.statusId)?.statusScore;
        this.actionTracker.evidenceAvailableId = this.trackingForm.value.evidenceAvailable;
        this.actionTracker.evidenceAvailable = this.evidenceStatuss.find(a => a.evidenceId == this.actionTracker.evidenceAvailableId)?.evidenceTitle;
        this.actionTracker.evidenceAvailableScore = this.evidenceStatuss.find(a => a.evidenceId == this.actionTracker.evidenceAvailableId)?.evidenceScore;
        
        this.actionTracker.assignedToId = this.trackingForm.value.assignedTo;
        this.actionTracker.assignedToTitle = this.users.find(a => a.userId == this.actionTracker.assignedToId)?.name;
  
        this.actionTracker.assignedToTitle = this.trackingForm.value.assignedTo;
        this.actionTracker.assignedToId = this.users.find(a => a.name=== this.actionTracker.assignedToTitle)?.userId;
  
        this.actionTracker.comments = this.trackingForm.value.comments;
        this.actionTracker.adminComment = this.trackingForm.value.adminComment;
  
  
        // this.actionTracker.closureDate = this.trackingForm.value.closureDate;
        this.actionTracker.reportFile = this.trackingForm.value.fileAttachment;
      }

    }
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
  showNotification2(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  downloadReport() {
    this.subs.sink = this.dataService.downloadReport(this.actionTracker.insurenceActionTrackerId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'insuranceReport.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        }
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
}
