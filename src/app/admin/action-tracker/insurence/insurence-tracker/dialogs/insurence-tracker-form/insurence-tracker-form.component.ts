import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsurenceRecommendation } from '../../../add-insurence/insurence.model';
import { InsurenceTracker, ITsites, ITSource, ITCompany, ITStatus, ITRecommendation } from '../../insurence-tracker.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsurenceTrackerService } from '../../insurence-tracker.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { User } from 'src/app/core/models/user';
import { CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';

@Component({
  selector: 'app-insurence-tracker-form',
  templateUrl: './insurence-tracker-form.component.html',
  styleUrls: ['./insurence-tracker-form.component.sass']
})
export class InsurenceTrackerFormComponent extends UnsubscribeOnDestroyAdapter{
    //Get data from browsers Local Storage
    user: User = JSON.parse(localStorage.getItem('currentUser'));
  dialogTitle: string;
  trackingForm: FormGroup;
  actionTracker: InsurenceTracker;
  sites: CSites[];
  selectedSites:ITsites[];
  regions: CRegions[];
  recommendations: ITRecommendation[];
  selectedRec:InsurenceRecommendation[];
  sources: ITSource[];
  companies: ITCompany[];
  statuss: ITStatus[];
  errorMessage: string;
  users: CUsers[];

  constructor
    (
      public dialogRef: MatDialogRef<InsurenceTrackerFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private snackBar: MatSnackBar, private dataService: InsurenceTrackerService, private dataService2:CommonService
    ) {
     super();
   
    if (this.data.action == "edit") {
      this.dialogTitle = this.data.tracker.action;
      this.actionTracker = { ...this.data.tracker };

    }
    if (this.data.action == "add") {
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
    // this.selectedRec = [...this.recommendations]
    this.trackingForm = this.buildForm();
  }
  getRec(event:number){
    if (event) {
      let regionId = +event
      this.subs.sink = this.dataService.getSRec(regionId, this.user.id).subscribe({
        next: data => { this.recommendations = [...data] },
        error: err => { this.showNotification('black', err, 'bottom', 'center'); }
      })
    }
  }
  getSites(regionId:number){
    this.subs.sink = this.dataService2.getUpdatedSites(this.user.id,regionId,-1,-1).subscribe({
      next:data=>{

          this.sites = [...data];

},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
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
  buildForm(): FormGroup {
    return this.fb.group({
      insurenceActionTrackerId: [this.actionTracker.insurenceActionTrackerId, [Validators.required]],
      recommendationId: [this.actionTracker.recommendationId, [Validators.required]],
      action: [this.actionTracker.action, [Validators.required]],
      // assignedTo: [""],
      targetDate: [this.actionTracker.targetDate, [Validators.required]],
      // statusId: [this.actionTracker.statusId, [Validators.required]],
      companyId: [this.actionTracker.companyId, [Validators.required]],
      // comments: [this.actionTracker.comments, [Validators.required]],
      // closureDate: [this.actionTracker.closureDate, [Validators.required]],
      // evidenceAvailable: [this.actionTracker.evidenceAvailable, [Validators.required]],
      // calcStatus: [this.actionTracker.calcStatus, [Validators.required]],
      // calcEvid: [this.actionTracker.calcEvid, [Validators.required]],
      // calcDate: [this.actionTracker.calcDate, [Validators.required]],
      // completionScore: [this.actionTracker.completionScore, [Validators.required]],
      // daysToTarget: [this.actionTracker.daysToTarget, [Validators.required]],
      // scoreDetails: [this.actionTracker.scoreDetails, [Validators.required]],
      siteId: [this.actionTracker.siteId, [Validators.required]],
      regionId: [this.actionTracker.regionId, [Validators.required]],
      sourceId: [this.actionTracker.sourceId, [Validators.required]],
      // fileAttachment:[],
    })
  }
  submit() {
    if (this.trackingForm.valid) {
      debugger;
      this.actionTracker.insurenceActionTrackerId = this.trackingForm.value.insurenceActionTrackerId;
      this.actionTracker.recommendationId = this.trackingForm.value.recommendationId;
      this.actionTracker.action = this.trackingForm.value.action;
      this.actionTracker.targetDate = this.trackingForm.value.targetDate;
      // this.actionTracker.statusId = this.trackingForm.value.statusId;
      // this.actionTracker.statusTitle = this.statuss.find(data => data.statusId == this.actionTracker.statusId).statusTitle

      this.actionTracker.companyId = this.trackingForm.value.companyId;
      this.actionTracker.companyTitle = this.companies.find(data => data.companyId == this.actionTracker.companyId).companyTitle;
      // this.actionTracker.reportFile = this.trackingForm.value.fileAttachment;

      // this.actionTracker.comments = this.trackingForm.value.comments;
      // this.actionTracker.closureDate = this.trackingForm.value.closureDate;
      // this.actionTracker.evidenceAvailable = this.trackingForm.value.evidenceAvailable;
      // this.actionTracker.calcStatus = this.trackingForm.value.calcStatus;
      // this.actionTracker.calcEvid = this.trackingForm.value.calcEvid;
      // this.actionTracker.calcDate = this.trackingForm.value.calcDate;
      // this.actionTracker.completionScore = this.trackingForm.value.completionScore;
      // this.actionTracker.daysToTarget = this.trackingForm.value.daysToTarget;
      // this.actionTracker.scoreDetails = this.trackingForm.value.scoreDetails;
      this.actionTracker.siteId = this.trackingForm.value.siteId;
      this.actionTracker.siteTitle = this.sites.find(data => data.siteId == this.actionTracker.siteId).siteTitle;


      this.actionTracker.regionId = this.trackingForm.value.regionId;
      this.actionTracker.regionTitle = this.regions.find(data => data.regionId == this.actionTracker.regionId).regionTitle


      this.actionTracker.sourceId = this.trackingForm.value.sourceId;
      this.actionTracker.sourceTitle = this.sources.find(data => data.sourceId == this.actionTracker.sourceId).sourceTitle


    }
  }
  onNoClick() {
    this.dialogRef.close();
  }

}
